import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import SoloLoading from './Loading';

export default function AuthLayout({ children, Authentication = true }) {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const location = useLocation(); // Get the current location
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (Authentication && !authStatus) {
            // Store the intended destination and redirect to login
            navigate(`/login?redirect=${location.pathname}`, { replace: true });
        } else if (!Authentication && authStatus) {
            // If authenticated and on a public route, redirect to intended or home
            const redirectPath = new URLSearchParams(location.search).get('redirect') || '/';
            navigate(redirectPath, { replace: true });
        } else {
            setLoading(false);
        }
    }, [authStatus, navigate, location.pathname, Authentication]);

    if (loading) return <SoloLoading />;

    return <>{children}</>;
}

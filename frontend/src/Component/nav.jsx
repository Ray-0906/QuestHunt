import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.status);
  const user="Jinwoo";
  
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const navItems = [
    { name: "Quests", link: "/quests", authRequired: true },
    { name: "Gates", link: "/add-mission", authRequired: true },
    { name: "Ranking", link: "/rankings", authRequired: false },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setIsMenuOpen(false);
    
    // Refresh and redirect to home
    window.location.href = "/";
  };
  

  return (
    <nav className=" bg-gradient-to-b from-black via-gray-900 to-black border-y-2 border-blue-900/50 shadow-[0_0_50px_theme(colors.blue.900/0.3) shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-purple-400 hover:text-purple-300 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            <div className="flex-shrink-0 flex items-center ml-4">
              <Link to={'/'}>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                HUNTER
              </span>
              </Link>
              
              <div className="ml-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(
              (item) =>
                (item.authRequired ? isLoggedIn : true) && (
                  <Link
                    key={item.name}
                    to={item.link}
                    className="text-purple-300 hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-gray-800/50"
                  >
                    {item.name}
                  </Link>
                )
            )}

            {isLoggedIn ? (
              <div className="ml-4 flex items-center space-x-4">
                <Link to={"/profile"} className="flex items-center space-x-2"> 
                <img
                                            src={"./mc.png"}
                                            className="w-7 h-7 rounded-full border-2 border-blue-900/50"
                                            alt={user.username}
                                        />
                <span className="text-purple-300 text-sm">{user}</span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(
                (item) =>
                  (item.authRequired ? isLoggedIn : true) && (
                    <Link
                      key={item.name}
                      to={item.link}
                      className="text-purple-300 hover:bg-gray-700/50 block px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )
              )}

              {isLoggedIn ? (
                <>
                  <div className="flex items-center px-3 py-4">
                  <Link to={"/profile"} className="flex items-center space-x-2"> 
                <img
                                            src={"./mc.png"}
                                            className="w-7 h-7 rounded-full border-2 border-blue-900/50"
                                            alt={user.username}
                                        />
                <span className="text-purple-300 text-sm">{user}</span>
                </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
    </nav>
  );
};

export default Navbar;

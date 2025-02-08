import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { loginUser } from "../service/auth";
import { Link } from "react-router";
import SoloLoading from "./Loading";
import { toast } from "react-toastify";

// Utility function for conditional class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

export function LogInDemo() {
  const [isLoading, setIsLoading] = useState(false);
     const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const dispatch = useDispatch();

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
      
        try {
          await dispatch(loginUser(email, password));
           // Show success message
        } catch (error) {
          toast.error(error?.message || "Login failed. Please try again! ❌"); // Show error message
        } finally {
          setIsLoading(false);
        }
      };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-opacity-35  dark:bg-black">
     {isLoading && <SoloLoading />}
     <div className="bg-gradient-to-r bg-opacity-35 from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
     <h2 className="text-3xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-400 tracking-widest uppercase mb-4">
          SYSTEM ACCESS
        </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
      The system has detected your presence. Will you rise as a hunter or remain in the shadows? Log in and begin your ascent!
      </p>
      <form className="my-8" onSubmit={handleSubmit}>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Hunter Mail :</Label>
          <Input id="email" placeholder="hunter@system.gov" type="email"  value={email}
        onChange={(e) => setEmail(e.target.value)}
        required />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Mana Signature:</Label>
          <Input id="password" placeholder="••••••••" type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required />
        </LabelInputContainer>
        

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Log in &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        
      </form>
      <p className="text-neutral-600 text-center text-sm max-w-sm  dark:text-neutral-300">
       
      Not in the system yet? <br/>Awaken your journey now—<Link to={'/signup'} className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-400 tracking-widest">Sign Up</Link> <br />
        and step into the hunt!
      </p>
    </div>
  );
}

const OAuthButton = ({ Icon, label }) => (
  <button
    className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
    type="button"
  >
    <Icon className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
    <span className="text-neutral-700 dark:text-neutral-300 text-sm">{label}</span>
    <BottomGradient />
  </button>
);

const BottomGradient = () => (
  <>
    <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
    <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
  </>
);

const LabelInputContainer = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-2 w-full", className)}>
    {children}
  </div>
);

"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../components/input/AuthForm";
import { useState } from "react";
import { auth } from "../lib/firebase/firebase";
import toast from "react-hot-toast";
import { useLoading } from "../contexts/LoadingContext";

interface SignupCredentials {
  email: string;
  password: string;
}

export default function SignupPage() {
  const [error, setError] = useState("");

  const { setIsLoading } = useLoading();

  const handleSignup = async (credentials: SignupCredentials) => {
    const { email, password } = credentials;

    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully!");
      toast.success("User registered successfully!");
    } catch (error) {
      console.error("Signup failed:", (error as Error).message);
      setError((error as Error).message);
      toast.error("Could not create an account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AuthForm
        title="Sign Up"
        buttonText="Sign Up"
        onSubmit={handleSignup}
        footerText="Already have an account?"
        footerLink="/login"
        footerLinkText="Login"
      />
      {error && (
        <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>
      )}
    </div>
  );
}

"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthForm from "../components/input/AuthForm";
import { useState } from "react";
import { auth } from "../lib/firebase/firebase";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [error, setError] = useState("");

  const handleSignup = async (credentials) => {
    const { email, password } = credentials;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully!");
      toast.success("User registered successfully!");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Signup failed:", err.message);
        toast.error("Could not create an account. Please try again.");
      }
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

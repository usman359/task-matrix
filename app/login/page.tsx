"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthForm from "../components/input/AuthForm";
import { auth } from "../lib/firebase/firebase";
import { useLoading } from "../contexts/LoadingContext";

interface LoginCredentials {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const { setIsLoading } = useLoading();

  const handleLogin = async (credentials: LoginCredentials) => {
    const { email, password } = credentials;

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");
      toast.success("User logged in successfully");
      router.push("/tasks");
    } catch (error) {
      console.log("Error logging in:", (error as Error).message);
      setError((error as Error).message);
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <AuthForm
        title="Login"
        buttonText="Login"
        onSubmit={handleLogin}
        footerText="Don't have an account?"
        footerLink="/signup"
        footerLinkText="Sign up"
      />
      {error && (
        <p className="text-red-500 text-center mt-4 font-semibold">{error}</p>
      )}
    </div>
  );
}

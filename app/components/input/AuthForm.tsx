"use client";

import Link from "next/link";
import { useState } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import ButtonSpinner from "../spinner/ButtonSpinner";
import InputField from "./InputField";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (credentials: LoginCredentials) => void;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
}

export default function AuthForm({
  title,
  buttonText,
  onSubmit,
  footerText,
  footerLink,
  footerLinkText,
}: AuthFormProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isLoading } = useLoading();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {title}
        </h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <ButtonSpinner /> : buttonText}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          {footerText}{" "}
          <Link href={footerLink} className="text-blue-500 hover:underline">
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}

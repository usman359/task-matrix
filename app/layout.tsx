import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "./contexts/LoadingContext";

export const metadata: Metadata = {
  title: "Task Matrix",
  description: "This is a task matrix that helps in your daily task management",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <LoadingProvider>
          <Toaster />
          <main>{children}</main>
          <footer className="text-center py-4 text-gray-500 bg-gray-50">
            © 2024 Task Matrix. All rights reserved.
          </footer>
        </LoadingProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";

export const metadata = {
  title: "Wastey",
  description: "Wastey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-space">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="min-h-screen flex items-center justify-center p-4
                bg-gradient-to-br from-indigo-500 to-purple-600">
      {children}
      <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
}
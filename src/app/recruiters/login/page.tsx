import React from "react";
import StandaloneAuth from "@/components/Auth/StandaloneAuth";

export default function RecruiterLoginPage() {
  return (
    <div className="min-h-screen py-10 mt-20">
      <StandaloneAuth initialMode="login" initialUserType="recruiter" />
    </div>
  );
}

import React from "react";
import StandaloneAuth from "@/components/Auth/StandaloneAuth";

export default function CandidateSignupPage() {
  return (
    <div className="min-h-screen py-10 mt-20">
      <StandaloneAuth initialMode="signup" initialUserType="candidates" />
    </div>
  );
}

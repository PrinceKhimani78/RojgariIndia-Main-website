import React from "react";
import StandaloneAuth from "@/components/Auth/StandaloneAuth";

export default function CandidateLoginPage() {
  return (
    <div className="min-h-screen py-10 mt-20">
      <StandaloneAuth initialMode="login" initialUserType="candidates" />
    </div>
  );
}

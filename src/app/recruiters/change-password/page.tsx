import Navbar from "@/components/Common/Navbar";
import React from "react";
import Footer from "@/components/Common/Footer";
import RecruiterChangePassword from "@/components/Recruiters/Change-password/Change-password";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password | Rojgari India",
};

const ChangePasswordPage = () => {
  return (
    <>
      <Navbar />
      <RecruiterChangePassword />
      <Footer />
    </>
  );
};

export default ChangePasswordPage;

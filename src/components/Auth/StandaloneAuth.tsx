"use client";

import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { sendOtp } from "@/services/otpService";
import { MAIN_INDUSTRY_OPTIONS } from "@/constants/industryData";

interface FormState {
  username: string;
  password: string;
  fullName: string;
  email: string;
  confirmPassword: string;
  otp: string;
  companyName?: string;
  mobileNumber?: string;
  industry?: string;
}

interface StandaloneAuthProps {
  initialMode: "login" | "signup";
  initialUserType: "candidates" | "recruiter";
}

export default function StandaloneAuth({ initialMode, initialUserType }: StandaloneAuthProps) {
  const router = useRouter();
  const { login, register } = useAuth();
  
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [userType, setUserType] = useState<"candidates" | "recruiter">(initialUserType);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [formData, setFormData] = useState<FormState>({
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    email: "",
    otp: "",
    companyName: "",
    mobileNumber: "",
    industry: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      alert("Please enter your email address first.");
      return;
    }
    setOtpLoading(true);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "/api";
    const res = await sendOtp(backendUrl, formData.email);
    setOtpLoading(false);

    if (res.success) {
      alert("OTP sent to " + formData.email);
    } else {
      alert(res.message || "Failed to send OTP. Please try again.");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (mode === "signup") {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      let res;
      if (userType === "recruiter") {
        if (!formData.companyName || !formData.fullName || !formData.email || !formData.mobileNumber || !formData.industry) {
          alert("Please fill in all required fields for recruiter signup.");
          return;
        }
        res = await register({
          companyName: formData.companyName,
          fullName: formData.fullName,
          email: formData.email,
          mobileNumber: formData.mobileNumber,
          industry: formData.industry,
          password: formData.password,
        }, "recruiter");
      } else {
        res = await register({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          otp: formData.otp,
        }, "candidate");
      }

      if (res.success) {
        const searchParams = new URLSearchParams(window.location.search);
        const redirect = searchParams.get('redirect');
        if (redirect) {
          router.push(redirect);
        } else {
          if (userType === "candidates") {
            router.push("/candidates/dashboard");
          } else {
            router.push("/recruiters/dashboard");
          }
        }
      } else {
        alert(res.message || "Registration failed");
      }
    } else {
      const res = await login(formData.username, formData.password, userType === "candidates" ? "candidate" : "recruiter");
      if (res.success) {
        const searchParams = new URLSearchParams(window.location.search);
        const redirect = searchParams.get('redirect');
        if (redirect) {
          router.push(redirect);
        } else {
          if (userType === "candidates") {
            router.push("/candidates/dashboard");
          } else {
            router.push("/recruiters/dashboard");
          }
        }
      } else {
        alert(res.message || "Login failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center py-20 px-4 min-h-[80vh]">
      <div className="max-w-4xl w-full bg-[#FFFFF0] rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center min-h-full">
          {/* Left Panel */}
          <div className="hidden md:block relative w-full h-full sm:rounded-l-lg border-r border-gray-300">
            <div className="flex flex-col items-center justify-center text-gray-900 p-5 h-full pt-10">
              <Image
                src="/images/logo.png"
                alt="Rojgari Logo"
                width={330}
                height={80}
                unoptimized
                className="mb-8 sm:w-48 md:w-[260px] h-auto"
              />
              <div className="w-[90%] mx-auto mt-4">
                <Image
                  src="/images/auth_girl_laptop.png"
                  alt="Real humans connecting at work"
                  width={600}
                  height={500}
                  unoptimized
                  className="w-full h-auto object-contain mix-blend-multiply"
                />
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <form
            className="col-span-1 flex flex-col justify-center px-6 sm:px-10 py-10 order-1 md:order-2"
            onSubmit={handleSubmit}
          >
            {/* Mobile Top Row (Logo only, centered) */}
            <div className="flex justify-center mb-6 md:hidden">
              <Image
                src="/images/logo.png"
                alt="Rojgari Logo"
                width={330}
                height={80}
                unoptimized
                className="h-14 sm:h-16 w-auto"
              />
            </div>

            {/* Title */}
            <h2 className="font-semibold capitalize text-2xl lg:text-3xl my-5 text-center md:text-left text-slate-800">
              {mode === "login" ? "Login" : "Sign Up"}
            </h2>
            
            {/* Candidate / Recruiter toggle */}
            <div className="relative flex p-1 mb-6 bg-gray-100 rounded-xl w-[272px] mx-auto md:mx-0 shadow-inner">
              {/* Sliding pill */}
              <div
                className={`absolute top-1 bottom-1 w-[128px] bg-[#72B76A] rounded-lg transition-transform duration-300 ease-in-out ${
                  userType === "recruiter" ? "translate-x-[132px]" : "translate-x-0"
                }`}
              />
              {/* Candidates Button */}
              <button
                type="button"
                onClick={() => setUserType("candidates")}
                className={`relative z-10 w-32 h-9 flex items-center justify-center text-sm font-semibold rounded-lg transition-colors duration-300 ${
                  userType === "candidates" ? "text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Candidates
              </button>
              {/* Recruiters Button */}
              <button
                type="button"
                onClick={() => setUserType("recruiter")}
                className={`relative z-10 w-32 h-9 flex items-center justify-center text-sm font-semibold rounded-lg transition-colors duration-300 ${
                  userType === "recruiter" ? "text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Recruiters
              </button>
            </div>

            {/* Inputs */}
            <motion.div
              key={`${mode}-${userType}`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={mode === "signup" && userType === "recruiter" ? "grid grid-cols-2 gap-4" : "space-y-4"}
            >
              {mode === "signup" ? (
                <>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="w-full p-2.5 rounded-lg bg-white text-sm placeholder-slate-400 ring-1 focus:bg-white focus:outline-none ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className={`w-full p-2.5 rounded-lg bg-white text-sm placeholder-slate-400 ring-1 focus:bg-white focus:outline-none ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A] ${userType === "candidates" ? "pr-24" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {userType === "candidates" && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={otpLoading}
                        className={`absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-bold text-white rounded-md transition ${otpLoading ? "bg-gray-400" : "bg-[#72B76A] hover:bg-[#5da356]"}`}
                      >
                        {otpLoading ? "Sending..." : "Send OTP"}
                      </button>
                    )}
                  </div>

                  {userType === "recruiter" && (
                    <>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        className="w-full p-2.5 rounded-lg bg-white text-sm placeholder-slate-400 ring-1 focus:bg-white focus:outline-none ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                        value={formData.companyName}
                        onChange={handleChange}
                      />
                      <input
                        type="tel"
                        name="mobileNumber"
                        placeholder="Mobile Number"
                        className="w-full p-2.5 rounded-lg bg-white text-sm placeholder-slate-400 ring-1 focus:bg-white focus:outline-none ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                      />
                      <select
                        name="industry"
                        className="col-span-2 w-full p-2.5 rounded-lg bg-white text-sm text-slate-500 ring-1 focus:bg-white focus:outline-none ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                        value={formData.industry}
                        onChange={handleChange}
                      >
                        <option value="">Select Industry</option>
                        {MAIN_INDUSTRY_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </>
                  )}
                  {/* Password */}
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="w-full p-2.5 rounded-lg bg-white text-sm placeholder-slate-400 ring-1 focus:bg-white focus:outline-none ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Confirm Password */}
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="w-full p-2.5 rounded-lg bg-white text-sm placeholder-slate-400 focus:bg-white focus:outline-none ring-1 ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {userType === "candidates" && (
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      className="w-full p-2.5 rounded-lg bg-white text-sm placeholder-slate-400 ring-1 focus:bg-white focus:outline-none ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                      value={formData.otp}
                      onChange={handleChange}
                    />
                  )}
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="username"
                    placeholder="Email Address"
                    className="w-full p-2.5 rounded-lg bg-white text-sm placeholder-slate-400 ring-1 focus:bg-white focus:outline-none ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="w-full p-2.5 rounded-lg bg-white text-sm placeholder-slate-400 ring-1 focus:bg-white focus:outline-none ring-gray-300 transition focus:ring-2 focus:ring-[#72B76A]"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full mt-6 py-2.5 bg-[#72B76A] hover:bg-[#61a35a] text-white font-semibold rounded-lg transition-transform hover:scale-[1.02] shadow-md ${mode === "signup" && userType === "recruiter" ? "col-span-2" : ""}`}
              >
                {mode === "login" ? "Login" : "Sign Up"}
              </button>
            </motion.div>

            {/* Switch Mode */}
            <p className="text-center text-sm text-gray-600 mt-6 font-medium">
              {mode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                className="text-[#72B76A] font-bold hover:underline"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
              >
                {mode === "login" ? "Sign Up" : "Login"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

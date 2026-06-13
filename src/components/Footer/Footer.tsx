"use client";

import React from "react";
import Link from "next/link";
import "../Header/Header.css";
import Image from "next/image";
import "../Home/Home.css";
import { IoIosCall } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";
import { FaInstagram, FaLinkedin, FaFacebook, FaWhatsapp } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div suppressHydrationWarning className="bg-[#0F172A]">
      <div className="relative overflow-hidden bg-[#72B76A] text-white font-medium text-xs py-3 z-0">
        <div className="animate-marquee whitespace-nowrap flex w-max">
          <span className="pr-10">
            Get hired by top companies in India. Explore daily job opportunities. Log in to start applying! Connect with leading recruiters across multiple industries.
          </span>
          <span className="pr-10">
            Get hired by top companies in India. Explore daily job opportunities. Log in to start applying! Connect with leading recruiters across multiple industries.
          </span>
        </div>
      </div>

      <div className="text-slate-400 pt-10 pb-16 px-5 lg:px-[5%] 2xl:px-[10%]" suppressHydrationWarning>
        <div className="flex flex-col justify-center w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_60%] justify-between items-center gap-5 my-10">
            <p className="fontAL text-lg text-slate-300">
              Subscribe to our newsletter to receive the latest job listings, career tips, and placement opportunities directly in your inbox.
            </p>

            <div className="flex justify-end w-full">
              <input
                type="text"
                className="px-5 w-[90%] lg:w-[70%] text-white bg-slate-800 border border-transparent rounded-l-lg focus:border-[#72B76A] focus-within:border-2 focus:outline-none focus:ring-0 focus-visible:outline-none placeholder:text-slate-500"
                placeholder="Your email"
                suppressHydrationWarning
              />
              <button className="px-6 py-2 bg-[#72B76A] text-white rounded-r-lg hover:bg-[#61a35a] transition-colors font-semibold tracking-wide" suppressHydrationWarning>
                <span className="text-sm" suppressHydrationWarning>Subscribe</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 items-start gap-10 mt-10">
            <div>
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={330}
                  height={80}
                  unoptimized
                  className="h-16 md:h-20 w-auto brightness-0 invert"
                />
              </Link>

              <div className="space-y-5 mt-5">
                <p>
                  Rojgari India is a premier job board platform connecting skilled candidates with top employers across industries in India.
                </p>

                <p className="group flex items-center gap-2">
                  <HiOutlineMail className="text-[#72B76A] text-xl shrink-0" />
                  <b className="text-slate-300">Email:</b>{" "}
                  <Link
                    href="mailto:jobs@rojgariindia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group-hover:text-[#72B76A] transition-colors"
                  >
                    jobs@rojgariindia.com
                  </Link>
                </p>

                <p className="group flex items-center gap-2">
                  <IoIosCall className="text-[#72B76A] text-xl shrink-0" />
                  <b className="text-slate-300">Call:</b>{" "}
                  <Link
                    href="tel:+917201080009"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group-hover:text-[#72B76A] transition-colors"
                  >
                    +91 72010 80009
                  </Link>
                </p>

                <p className="flex items-start gap-2">
                  <SlLocationPin className="text-[#72B76A] text-xl shrink-0 mt-0.5" />
                  <span>
                    <b className="text-slate-300 mr-1">Address:</b>
                    Adarsh Plaza, 403 & 404, 150 Feet Ring Rd, Rajkot, Gujarat 360005
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 items-stretch lg:pt-20">
              <div className="flex flex-col gap-4">
                <p className="relative text-white font-bold text-xl mb-8">
                  For Candidates
                  <span className="absolute left-0 -bottom-3 w-10 h-0.5 bg-[#72B76A]"></span>
                </p>

                <Link
                  href="/jobs"
                  className="text-sm hover:text-[#72B76A] transition-colors"
                >
                  Explore Jobs
                </Link>

                <Link
                  href="/candidates/profile"
                  className="text-sm hover:text-[#72B76A] transition-colors"
                >
                  Candidate Profile
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                <p className="relative text-white font-bold text-xl mb-8">
                  For Recruiters
                  <span className="absolute left-0 -bottom-3 w-10 h-0.5 bg-[#72B76A]"></span>
                </p>

                <Link
                  href="/recruiters/post-job"
                  className="text-sm hover:text-[#72B76A] transition-colors"
                >
                  Post a Job
                </Link>

                <Link
                  href="/recruiters/candidates-list"
                  className="text-sm hover:text-[#72B76A] transition-colors"
                >
                  Search Candidates
                </Link>

                <Link
                  href="/recruiters/dashboard"
                  className="text-sm hover:text-[#72B76A] transition-colors"
                >
                  Recruiter Dashboard
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 items-stretch lg:pt-20">
              <div className="flex flex-col gap-4">
                <p className="relative text-white font-bold text-xl mb-8">
                  Helpful Resources
                  <span className="absolute left-0 -bottom-3 w-10 h-0.5 bg-[#72B76A]"></span>
                </p>

                <Link
                  href="/about-us"
                  className="text-sm hover:text-[#72B76A] transition-colors"
                >
                  About Us
                </Link>

                <Link
                  href="/contactus"
                  className="text-sm hover:text-[#72B76A] transition-colors"
                >
                  Contact Us
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                <p className="relative text-white font-bold text-xl mb-8">
                  Quick Links
                  <span className="absolute left-0 -bottom-3 w-10 h-0.5 bg-[#72B76A]"></span>
                </p>

                <Link
                  href="/"
                  className="text-sm hover:text-[#72B76A] transition-colors"
                >
                  Home
                </Link>

                <Link
                  href="/jobs"
                  className="text-sm hover:text-[#72B76A] transition-colors"
                >
                  Jobs
                </Link>

                <Link
                  href="/candidates"
                  className="text-sm hover:text-[#72B76A] transition-colors"
                >
                  Candidates
                </Link>

                <Link
                  href="/recruiters"
                  className="text-sm hover:text-[#72B76A] transition-colors"
                >
                  Recruiters
                </Link>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mt-8 text-2xl pt-6 border-t border-slate-800">
            <a
              href="https://www.instagram.com/rojgariindia/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:-translate-y-1 hover:text-[#E1306C] bg-slate-800/50 hover:bg-slate-800 p-3.5 rounded-full text-slate-300 shadow-lg"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/rojgariindia/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:-translate-y-1 hover:text-[#0077B5] bg-slate-800/50 hover:bg-slate-800 p-3.5 rounded-full text-slate-300 shadow-lg"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/share/1ACWMEKGH8/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:-translate-y-1 hover:text-[#1877F2] bg-slate-800/50 hover:bg-slate-800 p-3.5 rounded-full text-slate-300 shadow-lg"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://wa.me/917201080009?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:-translate-y-1 hover:text-[#25D366] bg-slate-800/50 hover:bg-slate-800 p-3.5 rounded-full text-slate-300 shadow-lg"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

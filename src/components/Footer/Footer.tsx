"use client";

import React from "react";
import Link from "next/link";
import "../Header/Header.css";
import Image from "next/image";
import "../Home/Home.css";
import { IoIosCall } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { SlLocationPin } from "react-icons/sl";

const Footer: React.FC = () => {
  return (
    <div suppressHydrationWarning>
      <div className="relative overflow-hidden bg-[#00C9FF] text-xs py-3 z-0">
        <div className="animate-marquee whitespace-nowrap flex w-max">
          <span className="pr-10">
            Get hired by top companies in India. Explore daily job opportunities. Log in to start applying! Connect with leading recruiters across multiple industries.
          </span>
          <span className="pr-10">
            Get hired by top companies in India. Explore daily job opportunities. Log in to start applying! Connect with leading recruiters across multiple industries.
          </span>
        </div>
      </div>

      <div className="bg-[#00233e] text-white py-10 px-5 lg:px-[5%] 2xl:px-[10%]" suppressHydrationWarning>
        <div className="flex flex-col justify-center w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[35%_60%] justify-between items-center gap-5 my-10">
            <p className="fontAL text-lg">
              Subscribe to our newsletter to receive the latest job listings, career tips, and placement opportunities directly in your inbox.
            </p>

            <div className="flex justify-end w-full">
              <input
                type="text"
                className="px-5 w-[90%] lg:w-[70%] text-black bg-white border rounded-l-lg border-white focus:border-[#00C9FF] focus-within:border-2 focus:outline-none focus:ring-0 focus-visible:outline-none placeholder:text-gray-400"
                placeholder="Your email"
                suppressHydrationWarning
              />
              <button className="newsletter_btn" suppressHydrationWarning>
                <span className="text-sm" suppressHydrationWarning>Subscribe</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10 mt-10">
            <div>
              <Link href="/">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={60}
                  height={60}
                  className="h-20 w-auto bg-white p-2 rounded-md"
                />
              </Link>

              <div className="space-y-3 mt-5">
                <p>
                  Rojgari India is a premier job board platform connecting skilled candidates with top employers across industries in India.
                </p>

                <p className="group">
                  <b>Email: </b>{" "}
                  <Link
                    href="mailto:support@rojgariindia.com"
                    className="group-hover:underline underline-offset-2"
                  >
                    support@rojgariindia.com
                  </Link>
                </p>

                <p className="group">
                  <b>Call: </b>{" "}
                  <Link
                    href="tel:+912812588660"
                    className="group-hover:underline underline-offset-2"
                  >
                    0281 258 8660
                  </Link>
                </p>

                <p className="group">
                  <b>Address: </b>{" "}
                  <span className="text-gray-300">
                    Adarsh Plaza, 403 & 404, 150 Feet Ring Rd, Rajkot, Gujarat 360005
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 items-stretch">
              <div className="flex flex-col justify-between h-full">
                <p className="relative text-[#00C9FF] text-xl mb-8">
                  For Candidates
                  <span className="absolute left-0 -bottom-3 w-10 h-0.5 bg-[#00C9FF]"></span>
                </p>

                <Link
                  href="/jobs"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Explore Jobs
                </Link>

                <Link
                  href="/candidates/profile"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Candidate Profile
                </Link>
              </div>

              <div className="flex flex-col justify-between h-full">
                <p className="relative text-[#00C9FF] text-xl mb-8">
                  For Recruiters
                  <span className="absolute left-0 -bottom-3 w-10 h-0.5 bg-[#00C9FF]"></span>
                </p>

                <Link
                  href="/recruiters/post-job"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Post a Job
                </Link>

                <Link
                  href="/recruiters/candidates-list"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Search Candidates
                </Link>

                <Link
                  href="/recruiters/dashboard"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Recruiter Dashboard
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 items-stretch">
              <div className="flex flex-col justify-between h-full">
                <p className="relative text-[#00C9FF] text-xl mb-8">
                  Helpful Resources
                  <span className="absolute left-0 -bottom-3 w-10 h-0.5 bg-[#00C9FF]"></span>
                </p>

                <Link
                  href="/pages/aboutus"
                  className="text-sm hover:underline underline-offset-2"
                >
                  About Us
                </Link>

                <Link
                  href="/contactus"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Contact Us
                </Link>
              </div>

              <div className="flex flex-col justify-between h-full">
                <p className="relative text-[#00C9FF] text-xl mb-8">
                  Quick Links
                  <span className="absolute left-0 -bottom-3 w-10 h-0.5 bg-[#00C9FF]"></span>
                </p>

                <Link
                  href="/candidates/dashboard"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Dashboard
                </Link>

                <Link
                  href="/candidates/saved-jobs"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Saved Jobs
                </Link>

                <Link
                  href="/candidates/applied-jobs"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Applied Jobs
                </Link>

                <Link
                  href="/candidates/job-alerts"
                  className="text-sm hover:underline underline-offset-2"
                >
                  Job Alerts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

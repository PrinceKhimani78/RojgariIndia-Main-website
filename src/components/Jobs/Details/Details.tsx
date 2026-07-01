"use client";
import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaEye,
  FaGlobe,
  FaUserFriends,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBriefcase,
  FaHourglassHalf,
  FaGraduationCap,
  FaVenusMars,
  FaDollarSign,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaWhatsapp,
  FaPinterest,
  FaCheck,
  FaPlus,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";

type JobData = {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  job_category: string;
  department: string;
  job_role: string;
  qualifications: string;
  gender: string;
  skills: string;
  industry: string;
  languages: string;
  employment_type: string;
  salary_min: string | number;
  salary_max: string | number;
  exp_min: string | number;
  exp_max: string | number;
  company_name: string;
  perks_and_benefits: string;
  posting_as: string;
  contact_name: string;
  contact_number: string;
  created_at: string;
  status: string;
  allow_calls?: boolean;
  screening_questions?: string;
};

const formatSalary = (min?: string | number, max?: string | number) => {
  if (!min && !max) return "Not disclosed";
  if (min && max) return `₹${Number(min).toLocaleString()} - ₹${Number(max).toLocaleString()} LPA`;
  if (min) return `₹${Number(min).toLocaleString()} LPA`;
  return `₹${Number(max).toLocaleString()} LPA`;
};

const formatExp = (min?: string | number, max?: string | number) => {
  if (min == null && max == null) return "Not specified";
  if (min != null && max != null) return `${min} - ${max} Yrs`;
  if (min != null) return `${min}+ Yrs`;
  return `Up to ${max} Yrs`;
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const JobDetailsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { user, token, isAuthenticated } = useAuth();

  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const parsedQuestions: string[] = React.useMemo(() => {
    if (!job?.screening_questions) return [];
    try {
      const parsed = JSON.parse(job.screening_questions);
      if (Array.isArray(parsed)) return parsed;
      // fallback if it's not a JSON array
      return [job.screening_questions];
    } catch {
      return [job.screening_questions];
    }
  }, [job?.screening_questions]);

  useEffect(() => {
    if (!id) return;

    // Fetch Job Details
    fetch(`/api/jobs/view/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJob(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Check application status if logged in as candidate
    if (isAuthenticated && user?.role === "candidate" && id) {
      fetch(`/api/applications/check/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.applied) {
            setApplied(true);
            setApplicationStatus(data.data.status);
          }
        })
        .catch((err) => console.error("Error checking application status:", err));

      // Check saved status
      fetch(`/api/applications/saved-jobs/check/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setIsSaved(data.saved);
          }
        })
        .catch((err) => console.error("Error checking saved status:", err));
    }
  }, [id, isAuthenticated, user, token]);

  const handleSaveJob = async () => {
    if (!isAuthenticated) {
      window.dispatchEvent(
        new CustomEvent("openAuthModal", {
          detail: { mode: "login", userType: "candidates" }
        })
      );
      return;
    }

    if (user?.role !== "candidate") {
      alert("Only candidates can save jobs.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/applications/saved-jobs/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setIsSaved(data.saved);
      } else {
        alert(data.message || "Failed to toggle save job.");
      }
    } catch (err) {
      console.error("Error saving job:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleApply = async () => {
    if (!isAuthenticated) {
      window.dispatchEvent(
        new CustomEvent("openAuthModal", {
          detail: { mode: "login", userType: "candidates" }
        })
      );
      return;
    }

    if (user?.role !== "candidate") {
      alert("Only candidates can apply for jobs.");
      return;
    }

    // Always show modal for resume upload if not already open
    if (!showQuestionModal) {
      setShowQuestionModal(true);
      return;
    }
    
    // Validate if answers are required
    if (parsedQuestions.length > 0) {
      for (let i = 0; i < parsedQuestions.length; i++) {
        if (!answers[i] || !answers[i].trim()) {
          alert(`Please answer question ${i + 1}: ${parsedQuestions[i]}`);
          return;
        }
      }
    }

    setApplying(true);
    try {
      // Build screeningAnswers array mapped to the questions
      const finalAnswers = parsedQuestions.length > 0 
        ? parsedQuestions.map((q, i) => ({ question: q, answer: answers[i] })) 
        : null;

      const formData = new FormData();
      formData.append('jobId', id || "");
      if (finalAnswers) {
          formData.append('screeningAnswers', JSON.stringify(finalAnswers));
      }
      if (resumeFile) {
          formData.append('resume', resumeFile);
      }

      const res = await fetch(`/api/applications/apply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setApplied(true);
        setApplicationStatus("Applied");
        setShowSuccess(true);
        setApplyError(null);
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        setApplyError(data.message || "Failed to apply. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setApplyError("A network error occurred. Please try again.");
    } finally {
      setApplying(false);
      setShowQuestionModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#72B76A]"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h2 className="text-2xl font-bold text-gray-800">Job Not Found</h2>
        <p className="text-gray-500 mt-2">
          The job you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/jobs"
          className="mt-4 px-6 py-2 bg-[#00c9ff] text-white rounded-lg font-medium hover:bg-[#00b4e6] transition-colors"
        >
          Browse Jobs
        </Link>
      </div>
    );
  }

  // Parse arrays from CSV
  const requirementsList = job.requirements
    ? job.requirements.split("\n").filter(Boolean)
    : [];
  const skillsList = job.skills
    ? job.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];
  const perksList = job.perks_and_benefits
    ? job.perks_and_benefits.split(",").filter(Boolean)
    : [];

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Jobs", href: "/jobs" },
    { name: job.title },
  ];

  // Sharing links
  const JOB_URL = typeof window !== "undefined" ? window.location.href : "";
  const SHARE_TEXT = `${job.title} at ${job.company_name} — apply now!`;

  const SHARE_LINKS = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        JOB_URL
      )}`,
      Icon: FaFacebook,
      cls: "bg-[#1877F2] hover:brightness-95",
    },
    {
      name: "Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        SHARE_TEXT
      )}&url=${encodeURIComponent(JOB_URL)}`,
      Icon: FaTwitter,
      cls: "bg-[#1DA1F2] hover:brightness-95",
    },
    {
      name: "Linkedin",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        JOB_URL
      )}`,
      Icon: FaLinkedin,
      cls: "bg-[#0A66C2] hover:brightness-95",
    },
    {
      name: "Whatsapp",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${SHARE_TEXT} ${JOB_URL}`
      )}`,
      Icon: FaWhatsapp,
      cls: "bg-[#25D366] hover:brightness-95",
    },
  ];

  const Check = () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0">
      <path
        d="M9 12.75 11.25 15 15 9.75"
        fill="none"
        stroke="rgb(37 99 235)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      <section className="fixed inset-x-0 top-0 h-[180px] sm:h-[220px] lg:h-[350px] w-full z-0">
        <div className="h-full w-full bg-[url('/images/RI_banner_bg.webp')] bg-cover bg-center bg-no-repeat" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(255, 255, 240, 0.1) 0%, rgba(255, 255, 240, 0.4) 65%, rgba(255, 255, 0, 0.1) 85%, rgba(255, 255, 0, 0.3) 100%)"
          }}
        />
        <div className="absolute inset-0 flex h-[180px] sm:h-[220px] lg:h-[350px] place-items-end justify-center px-5 lg:px-[5%] 2xl:px-[10%]">
          <div className="max-w-screen-xl w-full text-center">
            <h1 className="inline-block mb-4 px-4 py-2 text-slate-900 sm:text-xl fontAL font-semibold capitalize text-2xl md:text-3xl lg:text-4xl mt-5">
              {job.title}
            </h1>
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-700">
              <ol className="flex items-center justify-center gap-2">
                {crumbs.map((c, i) => {
                  const isLast = i === crumbs.length - 1;
                  return (
                    <li key={c.name} className="flex items-center gap-2">
                      {i > 0 && (
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-slate-400"
                        >
                          <path d="M7.05 4.55a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 1 1-1.4-1.4L9.88 10 7.05 7.15a1 1 0 0 1 0-1.4z" />
                        </svg>
                      )}
                      {isLast || !c.href ? (
                        <span className="fontPOP text-xs sm:text-sm text-gray-800 font-semibold">
                          {c.name}
                        </span>
                      ) : (
                        <Link
                          href={c.href}
                          className="hover:text-slate-900 fontPOP text-xs sm:text-sm text-gray-500"
                        >
                          {c.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>
      </section>

      {/* Spacer to allow scrolling */}
      <div className="h-[180px] sm:h-[220px] lg:h-[350px] pointer-events-none" />

      {/* Wrapper to scroll over the fixed hero section */}
      <div className="relative z-10 bg-[#FFFFF0] shadow-[0_-15px_30px_rgba(0,0,0,0.05)]">
        <section className="py-10 px-5 lg:px-[5%] 2xl:px-[15%]">
          <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[2fr_1fr] items-start">
            {/* Main content */}
            <div className="h-full">
              <div className="h-full rounded-2xl bg-white p-5 flex flex-col gap-8 shadow">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <span className="inline-block mb-2 rounded-full bg-[#72b76a] px-3 py-1 text-xs font-semibold text-white shadow">
                      {job.status}
                    </span>
                    <h1 className="text-xl font-bold text-[#0b0b0b] md:text-2xl leading-tight">
                      {job.title}
                    </h1>

                    {job.company_name && (
                      <div className="mt-2 text-md font-medium text-slate-700">
                        {job.company_name}
                      </div>
                    )}

                    <p className="mt-2 flex items-center gap-2 text-sm text-neutral-600 font-medium">
                      <FaMapMarkerAlt className="text-sky-500" />{" "}
                      {job.location || "Location not specified"}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                      <span className="font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-md">
                        {formatSalary(job.salary_min, job.salary_max)}
                      </span>
                      <span className="font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md uppercase tracking-wide text-xs">
                        {job.employment_type}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 mt-2 sm:mt-0 flex flex-col items-end gap-2">
                    {/* Success banner */}
                    {showSuccess && (
                      <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-2 rounded-xl animate-pulse">
                        <span>🎉</span>
                        <span>Application submitted successfully!</span>
                      </div>
                    )}
                    {/* Error banner */}
                    {applyError && (
                      <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-4 py-2 rounded-xl">
                        <span>⚠️</span>
                        <span>{applyError}</span>
                        <button onClick={() => setApplyError(null)} className="ml-1 text-red-400 hover:text-red-600">✕</button>
                      </div>
                    )}
                    {applied ? (
                      <div className="flex flex-col items-center gap-2">
                        <button
                          disabled
                          className="w-full sm:w-auto px-8 h-11 bg-emerald-500 rounded-lg text-white font-bold opacity-80 cursor-not-allowed shadow-md"
                        >
                          ✓ Applied
                        </button>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                          Status: {applicationStatus}
                        </span>
                      </div>
                    ) : (
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={handleSaveJob}
                          disabled={saving}
                          className={`flex items-center justify-center w-11 h-11 rounded-lg border-2 transition-all ${
                            isSaved
                              ? "border-rose-400 bg-rose-50 text-rose-500"
                              : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-600"
                          }`}
                          title={isSaved ? "Unsave Job" : "Save Job"}
                        >
                          {isSaved ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
                        </button>
                        <button
                          onClick={handleApply}
                          disabled={applying}
                          className="flex-1 sm:flex-none sm:px-8 h-11 bg-[#00C9FF] rounded-lg text-white font-bold hover:bg-[#00b4e6] active:scale-95 transition-all shadow-md disabled:opacity-50"
                        >
                          {applying ? "Applying..." : "Apply Now"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <h2 className="text-lg font-bold text-neutral-900 mb-3 border-l-4 border-[#00c9ff] pl-3">
                    Job Description
                  </h2>
                  <div className="prose prose-neutral max-w-none text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {(() => {
                      if (!job.description) return "No description provided.";
                      let formatted = job.description;
                      
                      // Format bullets
                      formatted = formatted.replace(/\s*•\s*/g, '\n• ');
                      
                      // Format numbered lists (1. 2. 3.)
                      formatted = formatted.replace(/([a-z\.])\s+(\d+\.\s+[A-Z])/g, '$1\n\n$2');
                      
                      // Format common headings
                      const headings = [
                        "Job Title:", "Experience:", "Education:", "Job Summary:", 
                        "Key Responsibilities:", "Requirements:", "Qualifications:",
                        "Responsibilities:"
                      ];
                      headings.forEach(heading => {
                        const escapedHeading = heading.replace(/([:])/g, '\\$1');
                        const regex = new RegExp(`([a-z\\.])\\s+(${escapedHeading})`, 'gi');
                        formatted = formatted.replace(regex, '$1\n\n$2\n');
                      });
                      
                      // Clean up extra newlines
                      formatted = formatted.replace(/\n{3,}/g, '\n\n');
                      formatted = formatted.replace(/^\n+/, '');
                      
                      return formatted.trim();
                    })()}
                  </div>
                </div>

                {requirementsList.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900 mb-4 border-l-4 border-emerald-400 pl-3">
                      Requirements & Responsibilities
                    </h2>
                    <ul className="space-y-3">
                      {requirementsList.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm text-gray-700 items-start"
                        >
                          <Check />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {perksList.length > 0 && (
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900 mb-4 border-l-4 border-purple-400 pl-3">
                      Perks & Benefits
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {perksList.map((item, i) => (
                        <span
                          key={i}
                          className="text-sm px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium"
                        >
                          {item.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-lg font-bold text-neutral-900 mb-4">
                    Share this job
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {SHARE_LINKS.map(({ name, href, Icon, cls }) => (
                      <a
                        key={name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-white text-sm font-medium transition-all ${cls}`}
                      >
                        <Icon className="text-lg" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="h-full flex flex-col gap-6">
              <div className="rounded-2xl bg-white p-6 shadow border border-slate-50">
                <h3 className="mb-6 font-bold text-lg text-neutral-900">
                  Job Information
                </h3>

                <ul className="space-y-5 text-sm">
                  <li className="flex items-start gap-4">
                    <div className="p-2 bg-blue-50 text-[#00c9ff] rounded-lg">
                      <FaCalendarAlt className="text-lg" />
                    </div>
                    <div>
                      <p className="text-neutral-500 text-xs font-semibold tracking-wider uppercase mb-1">
                        Date Posted
                      </p>
                      <p className="font-medium text-slate-800">
                        {formatDate(job.created_at)}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="p-2 bg-emerald-50 text-emerald-500 rounded-lg">
                      <FaMapMarkerAlt className="text-lg" />
                    </div>
                    <div>
                      <p className="text-neutral-500 text-xs font-semibold tracking-wider uppercase mb-1">
                        Location
                      </p>
                      <p className="font-medium text-slate-800">
                        {job.location || "Not specified"}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="p-2 bg-purple-50 text-purple-500 rounded-lg">
                      <FaBriefcase className="text-lg" />
                    </div>
                    <div>
                      <p className="text-neutral-500 text-xs font-semibold tracking-wider uppercase mb-1">
                        Job Role
                      </p>
                      <p className="font-medium text-slate-800">
                        {job.job_role || job.title}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
                      <FaHourglassHalf className="text-lg" />
                    </div>
                    <div>
                      <p className="text-neutral-500 text-xs font-semibold tracking-wider uppercase mb-1">
                        Experience
                      </p>
                      <p className="font-medium text-slate-800">
                        {formatExp(job.exp_min, job.exp_max)}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="p-2 bg-rose-50 text-rose-500 rounded-lg">
                      <FaGraduationCap className="text-lg" />
                    </div>
                    <div>
                      <p className="text-neutral-500 text-xs font-semibold tracking-wider uppercase mb-1">
                        Required Education Qualification
                      </p>
                      <p className="font-medium text-slate-800">
                        {job.qualifications || "Any"}
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="p-2 bg-indigo-50 text-indigo-500 rounded-lg">
                      <FaVenusMars className="text-lg" />
                    </div>
                    <div>
                      <p className="text-neutral-500 text-xs font-semibold tracking-wider uppercase mb-1">
                        Gender
                      </p>
                      <p className="font-medium text-slate-800">
                        {job.gender || "Any"}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {skillsList.length > 0 && (
                <div className="rounded-2xl bg-white p-6 shadow border border-slate-50">
                  <h4 className="mb-4 font-bold text-lg text-neutral-900">
                    Required Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillsList.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {(job.company_name || job.contact_name) && (
                <div className="rounded-2xl bg-white p-6 shadow border border-slate-50">
                  <h3 className="mb-5 text-lg font-bold text-neutral-900">
                    Contact / Company
                  </h3>
                  <div className="space-y-4 text-sm">
                    {job.company_name && (
                      <div className="flex items-start gap-3">
                        <FaBriefcase className="text-[#00C9FF] mt-1" />
                        <div>
                          <p className="font-medium text-gray-800">
                            {job.company_name}
                          </p>
                        </div>
                      </div>
                    )}

                    {job.contact_name && (
                      <div className="flex items-start gap-3">
                        <FaUserFriends className="text-[#00C9FF] mt-1" />
                        <div>
                          <p className="text-neutral-500 text-xs">
                            Recruiter Name
                          </p>
                          <p className="font-medium text-gray-800">
                            {job.contact_name}
                          </p>
                        </div>
                      </div>
                    )}

                    {job.allow_calls && job.contact_number && (
                      <div className="flex items-start gap-3">
                        <FaPhoneAlt className="text-[#00C9FF] mt-1" />
                        <div>
                          <p className="text-neutral-500 text-xs">Phone</p>
                          <p className="font-medium text-gray-800">
                            {job.contact_number}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </section>
      </div>

      {/* Screening Questions Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b flex items-center justify-between bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">
                {parsedQuestions.length > 0 ? "Employer Screening Questions" : "Apply for this Job"}
              </h3>
              <button 
                onClick={() => setShowQuestionModal(false)}
                className="text-slate-400 hover:text-slate-600 transition"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {parsedQuestions.length > 0 && (
                <p className="text-sm text-slate-500 mb-4">
                  The employer has requested that you answer the following questions to be considered for this position.
                </p>
              )}
              
              {parsedQuestions.map((q, index) => (
                <div key={index} className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-800">
                    <span className="text-[#00C9FF] mr-1">{index + 1}.</span> {q} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    className="w-full rounded-lg border-slate-300 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00C9FF] p-3 text-sm"
                    placeholder="Type your answer here..."
                    value={answers[index] || ""}
                    onChange={(e) => setAnswers(prev => ({ ...prev, [index]: e.target.value }))}
                    disabled={applying}
                  />
                </div>
              ))}

              <div className="pt-4 border-t border-dashed">
                  <label className="block text-sm font-semibold text-slate-800 mb-3">
                      Upload Resume (Optional but Recommended)
                  </label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${resumeFile ? "border-green-400 bg-green-50" : "border-slate-200 hover:border-[#00C9FF] bg-slate-50"}`}
                  >
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                        />
                        {resumeFile ? (
                            <>
                                <div className="p-2 bg-green-100 text-green-600 rounded-full">
                                    <FaCheck />
                                </div>
                                <p className="text-sm font-bold text-green-700">{resumeFile.name}</p>
                                <button onClick={(e) => { e.stopPropagation(); setResumeFile(null); }} className="text-xs text-red-500 hover:underline">Remove</button>
                            </>
                        ) : (
                            <>
                                <div className="p-3 bg-white text-slate-400 rounded-full shadow-sm ring-1 ring-slate-100">
                                    <FaPlus />
                                </div>
                                <p className="text-sm text-slate-600 font-medium">Click to upload Resume (PDF/PNG)</p>
                                <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">Max 5MB</p>
                            </>
                        )}
                  </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t flex justify-end gap-3">
              <button 
                onClick={() => setShowQuestionModal(false)}
                disabled={applying}
                className="px-5 py-2 rounded-lg font-medium text-slate-600 hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleApply}
                disabled={applying}
                className="px-6 py-2 rounded-lg font-bold text-white bg-[#00C9FF] hover:bg-[#00b4e6] active:scale-95 transition flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                {applying ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function Details() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#72B76A]"></div>
        </div>
      }
    >
      <JobDetailsContent />
    </Suspense>
  );
}

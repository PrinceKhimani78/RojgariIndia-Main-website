"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { getUploadUrl } from "@/utils/fileUrl";

const RecruiterProfileHeader = () => {
    const { user } = useAuth();

    const photoSrc = getUploadUrl(user?.profile_photo);

    return (
        <div className="flex items-center gap-4">
            <div className="relative h-20 w-20">
                <Image
                    src={photoSrc}
                    alt="Profile"
                    fill
                    className="rounded-full border object-cover shadow-sm"
                />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-800">
                    {user?.full_name || "Recruiter"}
                </h2>
                <p className="text-gray-500 font-medium">Recruiter</p>
            </div>
        </div>
    );
};

export default RecruiterProfileHeader;

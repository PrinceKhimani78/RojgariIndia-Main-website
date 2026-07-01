export const getFileUrl = (path: string | undefined | null): string => {
  if (!path) return "/images/profile1.webp"; // Default fallback
  if (path.startsWith("http")) return path;

  // Use BACKEND_API_URL and strip the trailing /api if present
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://api.rojgariindia.com/api";
  const baseUrl = apiUrl.replace(/\/api\/?$/, "");

  // Make sure the path starts with a slash
  const safePath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${safePath}`;
};

export const getUploadUrl = (filename: string | undefined | null): string => {
  if (!filename) return "/images/profile1.webp";
  if (filename.startsWith("http")) return filename;
  
  // If it already has /uploads, use getFileUrl
  if (filename.startsWith("/uploads") || filename.startsWith("uploads/")) {
    return getFileUrl(filename);
  }

  return getFileUrl(`/uploads/${filename}`);
};

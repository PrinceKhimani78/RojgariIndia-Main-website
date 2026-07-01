export const getFileUrl = (path: string | undefined | null): string => {
  if (!path) return "/images/profile1.webp"; // Default fallback
  if (path.startsWith("http")) return path;

  // Make sure the path starts with a slash
  const safePath = path.startsWith("/") ? path : `/${path}`;

  // Simply return the relative path so next.config.ts rewrites can handle it
  // This ensures it works flawlessly across local and production environments
  return safePath;
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

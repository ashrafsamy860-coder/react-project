import React, { useState, useEffect } from "react";
import { avatarPlaceholder, coursesCoverPlaceholder } from "../../utils/placeholderImages";

// Renders an <img> that always ends up showing something:
// - fades in smoothly once loaded (no jarring pop-in / perceived slow load)
// - if the source fails (broken link, offline, hotlink-blocked...) it swaps
//   to a locally generated placeholder (no external request at all) instead
//   of a broken icon — this used to fall back to another hotlinked service
//   (picsum.photos), which meant images vanished entirely if the browser or
//   network blocked third-party image hosts.
export default function SafeImage({
  src,
  fallbackSeed,
  alt = "",
  className = "",
  style = {},
  variant = "avatar", // "avatar" (circular initials) | "cover" (course banner)
  ...rest
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setLoaded(false);
  }, [src]);

  const handleError = () => {
    const fallback =
      variant === "cover"
        ? coursesCoverPlaceholder(fallbackSeed || alt)
        : avatarPlaceholder(fallbackSeed || alt || "EGC");
    if (imgSrc !== fallback) setImgSrc(fallback);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      onError={handleError}
      className={className}
      style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.3s ease",
        backgroundColor: "var(--color-surface-soft)",
        ...style,
      }}
      {...rest}
    />
  );
}

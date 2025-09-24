import { memo, useEffect, useState } from "react";

export const ReadingProgress = memo(() => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) {
        setProgress(0);
        setIsVisible(false);
        return;
      }

      const progressPercentage = (scrollTop / docHeight) * 100;
      const clampedProgress = Math.min(100, Math.max(0, progressPercentage));

      setProgress(clampedProgress);
      setIsVisible(scrollTop > 100);
    };

    // Throttle function for better performance
    let ticking = false;
    const throttledUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledUpdate, { passive: true });
    window.addEventListener("resize", throttledUpdate, { passive: true });

    // Initial calculation
    updateProgress();

    return () => {
      window.removeEventListener("scroll", throttledUpdate);
      window.removeEventListener("resize", throttledUpdate);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Background bar */}
      <div className="h-1 bg-gray-200/80 backdrop-blur-sm">
        {/* Progress bar */}
        <div
          className="h-full bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 transition-all duration-150 ease-out shadow-sm"
          style={{
            width: `${progress}%`,
            boxShadow:
              progress > 0 ? "0 0 10px rgba(34, 197, 94, 0.3)" : "none",
          }}
        />
      </div>
    </div>
  );
});

ReadingProgress.displayName = "ReadingProgress";

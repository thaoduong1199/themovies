import { useState } from "react";
import { useEffect } from "react";
export const useResponsive = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth <= 768 && window.innerWidth > 428) {
      setIsDesktop(true);
    } 
    if (window.innerWidth <= 428) {
      setIsMobile(true);
    } 
  }, []);
  return { isDesktop, isMobile };
};

import { useState, useEffect } from "react";
import { NAV_ID_MAP } from "../data";

const SECTION_IDS    = Object.values(NAV_ID_MAP);  // ["about", "skills", …]
const SECTION_LABELS = Object.keys(NAV_ID_MAP);    // ["About", "Skills", …]

/**
 * Returns the label of the section currently nearest the top of the viewport.
 */
export function useActiveSection() {
  const [active, setActive] = useState("About");

  useEffect(() => {
    const handler = () => {
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActive(SECTION_LABELS[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return [active, setActive];
}

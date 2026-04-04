import { useState, useEffect, useRef } from "react";

/**
 * Returns [ref, isVisible]. Fires once when the element enters the viewport.
 * @param {{ threshold?: number }} options
 */
export function useIntersection({ threshold = 0.1 } = {}) {
  const ref      = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

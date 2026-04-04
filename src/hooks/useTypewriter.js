import { useState, useEffect } from "react";

/**
 * Cycles through an array of strings with a typewriter effect.
 * @param {string[]} words
 * @returns {string} current typed string
 */
export function useTypewriter(words) {
  const [typed, setTyped]   = useState("");
  const [index, setIndex]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let paused = false;

    const tick = setInterval(() => {
      if (paused) return;

      const current = words[index];

      if (!deleting) {
        setTyped(prev => {
          const next = current.slice(0, prev.length + 1);
          if (next === current) {
            // Finished typing — pause then start deleting
            paused = true;
            setTimeout(() => {
              paused = false;
              setDeleting(true);
            }, 1500);
          }
          return next;
        });
      } else {
        setTyped(prev => {
          const next = prev.slice(0, -1);
          if (next === "") {
            setDeleting(false);
            setIndex(i => (i + 1) % words.length);
          }
          return next;
        });
      }
    }, deleting ? 55 : 95);

    return () => clearInterval(tick);
  }, [index, deleting, words]);

  return typed;
}

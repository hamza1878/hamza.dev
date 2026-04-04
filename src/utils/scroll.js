import { NAV_ID_MAP } from "../data";

/**
 * Smoothly scrolls the page to a section by its DOM id.
 * @param {string} id - The element's id attribute
 */
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Scrolls to the section that corresponds to a nav label.
 * @param {string} label - e.g. "Data Science"
 */
export function scrollToNav(label) {
  const id = NAV_ID_MAP[label];
  if (id) scrollToSection(id);
}

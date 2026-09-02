export type Theme = "dark" | "light";

const THEME_COLORS: Record<Theme, string> = {
  dark: "#080a0d",
  light: "#f4f7f5",
};

export function initializeThemeToggle(): void {
  const toggle =
    document.querySelector<HTMLButtonElement>(".nav__theme-toggle");
  const themeColor = document.querySelector<HTMLMetaElement>("#theme-color");
  if (!toggle) return;

  applyTheme(toggle, themeColor, getCurrentTheme());
  toggle.addEventListener("click", () => {
    const theme = getCurrentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
    applyTheme(toggle, themeColor, theme);
  });
}

export function updateProjectImages(theme: Theme): void {
  const images = document.querySelectorAll<HTMLImageElement>(
    "[data-dark-src][data-light-src]",
  );

  images.forEach((image) => {
    const source =
      theme === "light" ? image.dataset.lightSrc : image.dataset.darkSrc;
    if (source && image.getAttribute("src") !== source) image.src = source;
  });
}

function applyTheme(
  toggle: HTMLButtonElement,
  themeColor: HTMLMetaElement | null,
  theme: Theme,
): void {
  updateThemeControls(toggle, themeColor, theme);
  updateProjectImages(theme);
}

function getCurrentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // The selected theme still applies when storage is unavailable.
  }
}

function updateThemeControls(
  toggle: HTMLButtonElement,
  themeColor: HTMLMetaElement | null,
  theme: Theme,
): void {
  const nextTheme = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${nextTheme} theme`;

  toggle.setAttribute("aria-label", label);
  toggle.setAttribute("title", label);
  themeColor?.setAttribute("content", THEME_COLORS[theme]);
}

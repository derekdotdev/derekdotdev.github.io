type Theme = "dark" | "light";

const TOP_OF_PAGE_THRESHOLD = 16;

export function initializeNavigation(): void {
  const navigation = document.querySelector<HTMLElement>(".nav-shell");
  if (!navigation) return;

  const sectionLinks = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("[data-section-link]"),
  );

  initializeThemeToggle();
  initializeMobileMenu(navigation, sectionLinks);
  initializeSectionTracking(navigation, sectionLinks);
}

function initializeThemeToggle(): void {
  const toggle =
    document.querySelector<HTMLButtonElement>(".nav__theme-toggle");
  const themeColor = document.querySelector<HTMLMetaElement>("#theme-color");
  if (!toggle) return;

  updateThemeControls(toggle, themeColor, getCurrentTheme());
  toggle.addEventListener("click", () => {
    const theme = getCurrentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
    updateThemeControls(toggle, themeColor, theme);
  });
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
  themeColor?.setAttribute("content", theme === "dark" ? "#080a0d" : "#f4f7f5");
}

function initializeMobileMenu(
  navigation: HTMLElement,
  sectionLinks: HTMLAnchorElement[],
): void {
  const menu = navigation.querySelector<HTMLElement>(".nav__links");
  const toggle =
    navigation.querySelector<HTMLButtonElement>(".nav__menu-toggle");
  if (!menu || !toggle) return;

  const closeMenu = () => setMenuOpen(menu, toggle, false);

  toggle.addEventListener("click", () =>
    setMenuOpen(menu, toggle, !menu.classList.contains("is-open")),
  );
  sectionLinks.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("click", (event) =>
    closeMenuOnOutsideClick(event, navigation, closeMenu),
  );
  document.addEventListener("keydown", (event) =>
    closeMenuOnEscape(event, toggle, closeMenu),
  );
}

function setMenuOpen(
  menu: HTMLElement,
  toggle: HTMLButtonElement,
  isOpen: boolean,
): void {
  menu.classList.toggle("is-open", isOpen);
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
}

function closeMenuOnOutsideClick(
  event: MouseEvent,
  navigation: HTMLElement,
  closeMenu: () => void,
): void {
  if (!navigation.contains(event.target as Node)) closeMenu();
}

function closeMenuOnEscape(
  event: KeyboardEvent,
  toggle: HTMLButtonElement,
  closeMenu: () => void,
): void {
  if (event.key !== "Escape" || toggle.getAttribute("aria-expanded") !== "true")
    return;

  closeMenu();
  toggle.focus();
}

function initializeSectionTracking(
  navigation: HTMLElement,
  sectionLinks: HTMLAnchorElement[],
): void {
  const sections = getLinkedSections(sectionLinks);
  let updatePending = false;

  const requestUpdate = () => {
    if (updatePending) return;
    updatePending = true;
    window.requestAnimationFrame(() => {
      updateNavigationState(navigation, sectionLinks, sections);
      updatePending = false;
    });
  };

  if (document.readyState === "complete") requestUpdate();
  else window.addEventListener("load", requestUpdate, { once: true });

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  window.addEventListener("pageshow", requestUpdate);
}

function getLinkedSections(sectionLinks: HTMLAnchorElement[]): HTMLElement[] {
  return sectionLinks
    .map((link) =>
      document.querySelector<HTMLElement>(`#${link.dataset.sectionLink}`),
    )
    .filter((section): section is HTMLElement => section !== null);
}

function updateNavigationState(
  navigation: HTMLElement,
  sectionLinks: HTMLAnchorElement[],
  sections: HTMLElement[],
): void {
  navigation.classList.toggle("is-scrolled", window.scrollY > 16);
  setActiveSection(sectionLinks, findActiveSection(sections));
}

function findActiveSection(sections: HTMLElement[]): string | undefined {
  if (window.scrollY <= TOP_OF_PAGE_THRESHOLD) return undefined;

  const readingPosition = window.scrollY + window.innerHeight * 0.38;
  const currentSection = sections.findLast(
    (section) => section.offsetTop <= readingPosition,
  );
  const isAtPageEnd =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 8;

  return isAtPageEnd ? sections.at(-1)?.id : currentSection?.id;
}

function setActiveSection(
  sectionLinks: HTMLAnchorElement[],
  activeSectionId?: string,
): void {
  sectionLinks.forEach((link) => {
    const isActive = link.dataset.sectionLink === activeSectionId;
    link.classList.toggle("is-active", isActive);

    if (isActive) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

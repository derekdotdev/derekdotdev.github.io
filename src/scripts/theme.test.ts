// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import { initializeThemeToggle, updateProjectImages } from "./theme";

describe("updateProjectImages", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <img
        src="/project-dark.webp"
        data-dark-src="/project-dark.webp"
        data-light-src="/project-light.webp"
        alt="Project preview"
      />
    `;
  });

  it("uses the light artwork in light mode", () => {
    updateProjectImages("light");

    expect(getProjectImage().getAttribute("src")).toBe("/project-light.webp");
  });

  it("restores the dark artwork in dark mode", () => {
    updateProjectImages("light");
    updateProjectImages("dark");

    expect(getProjectImage().getAttribute("src")).toBe("/project-dark.webp");
  });

  it("ignores images that are not theme-aware", () => {
    document.body.innerHTML = '<img src="/unchanged.webp" alt="Unchanged" />';

    updateProjectImages("light");

    expect(getProjectImage().getAttribute("src")).toBe("/unchanged.webp");
  });
});

describe("initializeThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = "dark";
    document.body.innerHTML = `
      <meta id="theme-color" />
      <button class="nav__theme-toggle"></button>
      <img
        src="/project-dark.webp"
        data-dark-src="/project-dark.webp"
        data-light-src="/project-light.webp"
        alt="Project preview"
      />
    `;
  });

  it("updates the theme controls and artwork when toggled", () => {
    initializeThemeToggle();
    getThemeToggle().click();

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(getThemeToggle().getAttribute("aria-label")).toBe(
      "Switch to dark theme",
    );
    expect(
      document.querySelector("#theme-color")?.getAttribute("content"),
    ).toBe("#f4f7f5");
    expect(getProjectImage().getAttribute("src")).toBe("/project-light.webp");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("applies a saved light theme when initialized", () => {
    localStorage.setItem("theme", "light");
    document.documentElement.dataset.theme = "light";

    initializeThemeToggle();

    expect(getThemeToggle().getAttribute("aria-label")).toBe(
      "Switch to dark theme",
    );
    expect(getProjectImage().getAttribute("src")).toBe("/project-light.webp");
  });
});

function getProjectImage(): HTMLImageElement {
  const image = document.querySelector<HTMLImageElement>("img");
  if (!image) throw new Error("Expected a project image in the test document");
  return image;
}

function getThemeToggle(): HTMLButtonElement {
  const toggle =
    document.querySelector<HTMLButtonElement>(".nav__theme-toggle");
  if (!toggle) throw new Error("Expected a theme toggle in the test document");
  return toggle;
}

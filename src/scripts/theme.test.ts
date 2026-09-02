// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import { updateProjectImages } from "./theme";

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

function getProjectImage(): HTMLImageElement {
  const image = document.querySelector<HTMLImageElement>("img");
  if (!image) throw new Error("Expected a project image in the test document");
  return image;
}

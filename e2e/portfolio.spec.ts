import { expect, test } from "@playwright/test";

test.describe("portfolio navigation", () => {
  test("starts at the top without an active section", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("[data-section-link].is-active")).toHaveCount(0);
  });

  test("highlights the destination after animated navigation", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator('[data-section-link="work"]').click();

    await expect(page.locator('[data-section-link="work"]')).toHaveClass(
      /is-active/,
    );
    await expect(page).toHaveURL(/#work$/);
  });
});

test("swaps project artwork when the theme changes", async ({ page }) => {
  await page.goto("/");
  await page.locator(".nav__theme-toggle").click();

  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("[data-light-src]").first()).toHaveAttribute(
    "src",
    /-light\.webp$/,
  );
});

test("renders a useful not-found page", async ({ page }) => {
  await page.goto("/route-that-does-not-exist");

  await expect(
    page.getByRole("heading", { name: "Nothing to see here." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Back to the portfolio" }),
  ).toHaveAttribute("href", "/");
});

test.describe("mobile navigation", () => {
  test.use({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });

  test("opens the menu and closes it after selecting a section", async ({
    page,
  }) => {
    await page.goto("/");
    const menu = page.locator(".nav__links");
    const menuToggle = page.locator(".nav__menu-toggle");

    await menuToggle.click();
    await expect(menuToggle).toHaveAttribute("aria-expanded", "true");
    await expect(menu).toHaveClass(/is-open/);

    await menu.locator('[data-section-link="about"]').click();
    await expect(menuToggle).toHaveAttribute("aria-expanded", "false");
    await expect(menu).not.toHaveClass(/is-open/);
  });
});

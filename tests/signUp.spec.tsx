import { test, expect } from "@playwright/test";

test("test for sign up and first set up profile", async ({ page }) => {
  await page.goto("https://chat-app-4a684.web.app/regist");
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "tests/images/signUp/screenshot-regist.png" });

  await page.getByPlaceholder("Your Email").click();
  await page.getByPlaceholder("Your Email").fill("userR@gmail.com");
  await page.screenshot({
    path: "tests/images/signUp/screenshot-afterInputEmail.png",
  });

  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill("rrrrrr");
  await page.screenshot({
    path: "tests/images/signUp/screenshot-afterInputPassword.png",
  });

  await page.getByPlaceholder("Password Confirmation").click();
  await page.getByPlaceholder("Password Confirmation").fill("rrrrrr");
  await page.screenshot({
    path: "tests/images/signUp/screenshot-afterInputConfirmation.png",
  });

  //   await page.getByRole("button", { name: "Sign Up" }).click();
  //   await page.waitForTimeout(3000);
  //   await page.screenshot({
  //     path: "tests/images/signUp/screenshot-afterSignUp.png",
  //   });

  //   await expect(page.getByRole("alert")).toHaveText("Information");
});
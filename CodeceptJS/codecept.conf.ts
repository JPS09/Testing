require("dotenv").config({
  path: ".env"
});

export const config: CodeceptJS.MainConfig = {
  tests: "./*_test.ts",
  output: "./output",
  helpers: {
    Playwright: {
      browser: "firefox",
      url: process.env.base_url,
      show: true,
    },
  },
  include: {
    I: "./steps_file",
    loginPage: "./pages/login_page.ts",
    homePage: "./pages/home_page.ts",

    testPage: "./pages/test.ts",
  },
  name: "CodeceptJS",
};
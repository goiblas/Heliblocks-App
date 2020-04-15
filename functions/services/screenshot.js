const puppeteer = require("puppeteer");

module.exports = async function screenshot(content) {
  const browser = await puppeteer.launch({
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-sandbox",
      "--no-zygote",
      "--single-process"
    ]
  });
  const page = await browser.newPage();

  await page.setViewport({ width: 840, height: 640 });
  await page.setContent(content);
  const imageBuffer = await page.screenshot();
  await browser.close();
  return imageBuffer;
};

const puppeteer = require("puppeteer");
const Jimp = require("jimp");

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

  await page.setViewport({ width: 1440, height: 830 });
  await page.setContent(content);
  const imageBuffer = await page.screenshot({
    omitBackground: true
  });
  await browser.close();
  const image = await Jimp.read(imageBuffer);
  const imageBufferOptimazed = await image
    .resize(610, Jimp.AUTO)
    .quality(90)
    .getBufferAsync(Jimp.MIME_PNG);

  return imageBufferOptimazed;
};

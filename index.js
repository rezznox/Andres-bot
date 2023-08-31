/* const functions = require("firebase-functions");
const firebase = require("firebase-admin");
const { default: puppeteer } = require("puppeteer") */ /* firebase.initializeApp(); */
import puppeteer from "puppeteer";


/* exports.resetCreditsForFreeUsers = functions.pubsub
  .schedule("0 12 * * *")
  .onRun(async (context) => {
    return null;
  }); */
(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./user_data",
    headless: false
  });
  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com");
  const listElement = await page.waitForSelector('span[title="Andres"]');
  console.log(listElement);
  listElement.click({ });
  const inputElement = await page.waitForSelector('._3Uu1_');
  inputElement.click();
  await page.keyboard.type('whatever');
  await page.keyboard.press("Enter");
})();

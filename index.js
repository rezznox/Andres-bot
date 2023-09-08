/* const functions = require("firebase-functions");
const firebase = require("firebase-admin");
const { default: puppeteer } = require("puppeteer") */ /* firebase.initializeApp(); */
import puppeteer from "puppeteer";
import { run } from "./reddit-api.js";
import { config } from "dotenv";
config();
const {
  target,
  message
} = process.env;
const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36";

const getUrlFromReddit = async (redditApi) => {
  const subredditHot = await redditApi.retrieveSubredditHot();
  const children = subredditHot.data.data.children;
  return children[1].data.url;
};

/* exports.resetCreditsForFreeUsers = functions.pubsub
  .schedule("0 12 * * *")
  .onRun(async (context) => {
    return null;
  }); */
(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./user_data",
    headless: true,
  });
  const page = await browser.newPage();
  await page.setUserAgent(ua);
  await page.goto("https://web.whatsapp.com");
  const listElement = await page.waitForSelector(`span[title="${target}"]`);
  await listElement.click();
  const inputElement = await page.waitForSelector("._3Uu1_");
  await inputElement.click();
  
  const redditApi = await run();
  const url = await getUrlFromReddit(redditApi);
  await page.keyboard.type(`${message}: ${url}`);
  await page.keyboard.press("Enter");
  setTimeout(async () => {
    await browser.close();
  }, 2000);
})();

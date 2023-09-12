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

const focusElement = async (page, selector) => {
  const listElement = await page.waitForSelector(selector);
  await listElement.click();
}

const delay = ms => new Promise(res => setTimeout(res, ms));

const focusAndType = async(page, selector, type) => {
  focusElement(page, selector);
  await page.keyboard.type(type);
  await page.keyboard.press('Enter');
}

/* exports.resetCreditsForFreeUsers = functions.pubsub
  .schedule("0 12 * * *")
  .onRun(async (context) => {
    return null;
  }); */
(async () => {
  const browser = await puppeteer.launch({
    userDataDir: "./user_data",
    headless: false,
  });
  const page = await browser.newPage();
  await page.setUserAgent(ua);
  await page.goto("https://web.whatsapp.com");
  await focusAndType(page, `._2vDPL`, target);
  await delay(2000);
  await focusElement(page, `span[title="${target}"]`);

  const redditApi = await run();
  const url = await getUrlFromReddit(redditApi);
  
  await focusAndType(page, "._3Uu1_", `${message}: ${url}`)
  setTimeout(async () => {
    await browser.close();
  }, 2000);
})();

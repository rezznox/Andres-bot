/* const functions = require("firebase-functions");
const firebase = require("firebase-admin");
const { default: puppeteer } = require("puppeteer") */ /* firebase.initializeApp(); */
import puppeteer from "puppeteer";
import { run } from "./reddit-api.js";
import { config } from "dotenv";
config();
const {
  target
} = process.env;

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
  const redditApi = await run();
  const url = await getUrlFromReddit(redditApi);
  const browser = await puppeteer.launch({
    userDataDir: "./user_data",
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://web.whatsapp.com");
  const listElement = await page.waitForSelector(`span[title="${target}"]`);
  listElement.click({});
  const inputElement = await page.waitForSelector("._3Uu1_");
  inputElement.click();
  await page.keyboard.type(url);
  await page.keyboard.press("Enter");
  setTimeout(async () => {
    await browser.close();
  }, 2000);
})();

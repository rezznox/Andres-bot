import { config } from "dotenv";
import axios from "axios";

config();
let redditApi;

const {
  subreddit,
  access_token_url,
  reddit_username,
  reddit_password,
  reddit_client,
  reddit_secret,
} = process.env;

function RedditApi(access_token) {
  this.access_token = access_token;

  this.retrieve = async () => {
    const collection = fetch(
      `/api/v1/collections/subreddit_collections?sr_fullname=${subreddit}`
    );
  };
}

const redditAuth = async () => {

  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', reddit_username);
  params.append('password', reddit_password);

  const response = await axios.post(
    access_token_url,
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Script-Andres-bot/0.0.1 by rezznoxx",
      },
      auth: {
        username: reddit_client,
        password: reddit_secret,
      },
    }
  );

  return new RedditApi(response.access_token);
};

/* retrieve(); */
const run = () => {
  return new Promise(async (resolve, reject) => {
    try {
      redditApi = await redditAuth();
      resolve(redditApi);
    } catch (e) {
      reject(e);
    }
  });
};

run().then();

export { redditApi };

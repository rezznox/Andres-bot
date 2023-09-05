import { config } from "dotenv";
import axios from "axios";
import { writeThyFile } from "./writeFIle.js";

config();
let redditApi;

const {
  subreddit,
  access_token_url,
  reddit_username,
  reddit_password,
  reddit_client,
  reddit_secret,
  reddit_api_url
} = process.env;

function RedditApi(access_token) {
  this.access_token = access_token;
  const config = {
    headers: {
      'Authorization': `Bearer ${this.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "Script-Andres-bot/0.0.1 by rezznoxx",
    },
  };

  this.retrieveSubredditRandom = () => {
    return axios(
      `${reddit_api_url}r/${subreddit}/random`,
      config
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

  return new RedditApi(response.data.access_token);
};

/* retrieve(); */
const run = () => {
  return new Promise(async (resolve, reject) => {
    try {
      redditApi = await redditAuth();
      const collections = await redditApi.retrieveSubredditRandom();
      writeThyFile(collections);
      
      resolve(redditApi);
    } catch (e) {
      console.log('//////ERROR//////')
      reject(e);
    }
  });
};

run().then();

export { redditApi };

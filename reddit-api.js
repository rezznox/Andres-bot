import { config } from "dotenv";

config();
let redditApi;

const fetchJson = async (url, options) => {
  return await (await fetch(url, options)).json();
};

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
  const base64Token = Buffer.from(
    `${reddit_client}:${reddit_secret}`,
    'ascii'
  ).toString('base64');

  const response = await fetchJson(access_token_url, {
    method: "POST",
    body: {
      grant_type: 'password',
      username: reddit_username,
      password: reddit_password,
    },
    headers: {
      Authorization: `Basic ${base64Token}`,
      'Content-Type': 'application/json'
    },
  });
  return new RedditApi(response.access_token);
};

/* retrieve(); */

redditApi = redditAuth();
console.log(redditApi);

export { redditApi };

import { MongoArchiveHackernewsData, MongoArchiveSubredditData } from "../../../mongoose";

function generateHackernewsHtml(data: MongoArchiveHackernewsData) {
  let hackernewsText = "<h2>Hacker News</h2>";
  data.data.forEach((post) => {
    hackernewsText += `<a href=${post.link}>${post.title}</a><br/>`;
    hackernewsText += `Score: ${post.score}<br/><br/>`;
    hackernewsText += "</br>";
  });

  return hackernewsText;
}

function generateRedditHtml(data: MongoArchiveSubredditData[]) {
  let redditText = "<h2>Reddit</h2>";
  data.forEach((subreddit) => {
    redditText += `<b>/r/${subreddit.subreddit}:</b><br/><hr/>"`;
    subreddit.topPosts.forEach((post) => {
      redditText += `<a href=${post.url}>${post.title}</a><br/>`;
      redditText += `Score: ${post.score}<br/><br/>`;
    });
    redditText += "</br>";
  });

  return redditText;
}

export { generateHackernewsHtml, generateRedditHtml };

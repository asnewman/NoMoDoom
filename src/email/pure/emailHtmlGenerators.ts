import { HackerNewsArchiveData, MongoSubredditData } from "../../mongoose";

function generateHackernewsHtml(data: HackerNewsArchiveData[]) {
  let hackernewsText = "<h2>Hacker News</h2>";
  data.forEach(post => {
    hackernewsText += `<a href=${post.link}>${post.title}</a><br/>`
    hackernewsText += `Score: ${post.score}<br/><br/>`
    hackernewsText += "</br>"
  });

  return hackernewsText;
}

function generateRedditHtml(data: MongoSubredditData[]) {
  let redditText = "Here is your nomodoom email digest:<br/><br/>"
  data.forEach(subreddit => {
    redditText += `<b>/r/${subreddit.name}:</b><br/><hr/>"`
    subreddit.topPosts.forEach(post => {
      redditText += `<a href=${post.url}>${post.title}</a><br/>`
      redditText += `Score: ${post.score}<br/><br/>`
    })
    redditText += "</br>"
  });

  return redditText;
}

export {
  generateHackernewsHtml,
  generateRedditHtml
}
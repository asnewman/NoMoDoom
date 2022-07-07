import {
  MongoArchive,
  MongoArchiveHackernewsData,
  MongoArchiveSubredditData,
} from "../../../mongoose";

function generateHackernewsHtml(archive: MongoArchive) {
  let hackernewsText = "<h2>Hacker News</h2>";
  const hackernewsData: MongoArchiveHackernewsData =
    archive.data as MongoArchiveHackernewsData;

  [...Array(3).keys()].forEach((idx) => {
    const post = hackernewsData.data[idx];
    hackernewsText += `<a href=${post.link}>${post.title}</a><br/>`;
    hackernewsText += `Score: ${post.score}<br/><br/>`;
    hackernewsText += "</br>";
  });

  return hackernewsText;
}

function generateRedditHtml(archives: MongoArchive[], isUserPremium: boolean) {
  let redditText = "<h2>Reddit</h2>";
  archives.forEach((archive) => {
    const subredditData: MongoArchiveSubredditData =
      archive.data as MongoArchiveSubredditData;
    redditText += `<b>/r/${subredditData.subreddit}:</b><br/><hr/>`;
    subredditData.topPosts.forEach((post) => {
      redditText += `<a href=${post.url}>${post.title}</a><br/>`;
      redditText += `Score: ${post.score}<br/>`;
      if (isUserPremium) {
        redditText += `<b>What users are saying:</b><br/>`;
        redditText += `<ul>`;
        post.topThreeComments.forEach((comment) => {
          redditText += `<li><i>${comment.content}</i><span> <b>- ${comment.user}</b></li>`;
        });
        redditText += `</ul>`;
      }
      redditText += `<br/>`;
    });
    redditText += "</br>";
  });

  return redditText;
}

export { generateHackernewsHtml, generateRedditHtml };

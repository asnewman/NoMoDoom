import parse from "node-html-parser";

const DAY = 24 * 1000 * 60 * 60;

async function getTopPostsForDay(
  bestPages: string[],
  currentDatetime: number,
  getHackerNewsItem: (id: number) => Promise<HnItem>
) {
  interface Post {
    title: string;
    score: number;
    link: string;
    date: Date;
    comments: Comment[];
  }
  const posts: Post[] = [];

  for (const bestPage of bestPages) {
    const root = parse(bestPage);
    const titlesHtml = root.querySelectorAll(".titlelink");
    const titles = titlesHtml.map((title) => title.textContent);
    const scoresHtml = root.querySelectorAll(".score");
    const scores = scoresHtml.map((score) => score.textContent);
    const subtextsHtml = root.querySelectorAll(".subtext");
    const links = subtextsHtml.map(
      (subtext) => subtext.querySelectorAll("a")[1]?.attributes.href
    );
    const datesHtml = root.querySelectorAll(".age");
    const dates = datesHtml.map((date) => date.attributes.title);

    let idx = 0;
    for (const title of titles) {
      posts.push({
        title,
        score: parseInt(scores[idx]),
        link: `https://news.ycombinator.com/${links[idx]}`,
        date: new Date(dates[idx]),
        comments: [],
      });
      idx++;
    }
  }

  const filteredSortedPosts = posts
    .filter((a) => a.date.getTime() > currentDatetime - DAY)
    .sort((a, b) => b.score - a.score);

  const commentsPromises: Promise<any>[] = [];
  filteredSortedPosts.forEach((post) => {
    const regexRes = /(?:id=)(.*)/g.exec(post.link);
    const postId = regexRes ? parseInt(regexRes[1]) : null;

    if (postId) {
      commentsPromises.push(
        getTopCommentsForPost(postId, getHackerNewsItem).then((comments) => {
          post.comments = comments;
        })
      );
    }
  });

  await Promise.all(commentsPromises);

  return filteredSortedPosts;
}

export interface HnItem {
  by: string;
  kids: number[];
  text?: string;
}

interface Comment {
  user: string;
  content: string;
}

async function getTopCommentsForPost(
  postId: number,
  getHackerNewsItem: (id: number) => Promise<HnItem>
): Promise<Comment[]> {
  const res: { user: string; content: string }[] = [];
  const post = (await getHackerNewsItem(postId)) as unknown as HnItem;

  for (let cmtIdx = 0; cmtIdx < 3; cmtIdx++) {
    if (post.kids[cmtIdx]) {
      const comment = (await getHackerNewsItem(
        post.kids[cmtIdx]
      )) as unknown as HnItem;
      res.push({ user: comment.by, content: comment.text || "" });
    }
  }

  return res;
}

export { getTopPostsForDay, getTopCommentsForPost };

import parse from "node-html-parser";

const DAY = 24 * 1000 * 60 * 60;

function getTopPostsForDay(bestPages: string[], currentDatetime: number) {
  interface Post {
    title: string;
    score: number;
    link: string;
    date: Date;
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

    titles.forEach((title, idx) => {
      posts.push({
        title,
        score: parseInt(scores[idx]),
        link: `https://news.ycombinator.com/${links[idx]}`,
        date: new Date(dates[idx]),
      });
    });
  }

  return posts
    .filter((a) => a.date.getTime() > currentDatetime - DAY)
    .sort((a, b) => b.score - a.score);
}

export { getTopPostsForDay };

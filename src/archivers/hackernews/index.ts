import axios from "axios";
import parse from "node-html-parser";

const DAY = 24 * 1000 * 60 * 60;

export default async function archiveHackernews() {
  interface HackerNewsArchive {
    title: string;
    score: number;
    link: string;
    date: Date
  }
  const archive: HackerNewsArchive[] = []

  for(let i = 1; i <= 7; i++) {
    const res = await axios.get(`https://news.ycombinator.com/best?p=${i}`)
    const root = parse(res.data)
    const titlesHtml = root.querySelectorAll('.titlelink');
    const titles = titlesHtml.map(title => title.textContent);
    const scoresHtml = root.querySelectorAll('.score');
    const scores = scoresHtml.map(score => score.textContent);
    const subtextsHtml = root.querySelectorAll('.subtext');
    const links = subtextsHtml.map(subtext => subtext.querySelectorAll("a")[1]?.attributes.href);
    const datesHtml = root.querySelectorAll('.age');
    const dates = datesHtml.map(date => date.attributes.title);

    titles.forEach((title, idx) => {
      archive.push({
        title,
        score: parseInt(scores[idx]),
        link: `https://news.ycombinator.com${links[idx]}`,
        date: new Date(dates[idx])
      })
    })

    await (new Promise((resolve) => {
      setTimeout(() => resolve(null), 1000)
    }))
  }

  console.log(archive.filter(a => a.date.getTime() < Date.now() - DAY))
  console.log(archive.filter(a => a.date.getTime() > Date.now() - DAY))
}
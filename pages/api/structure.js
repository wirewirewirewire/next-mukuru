import { Configuration, OpenAIApi } from "openai";
import matter from "gray-matter";
import fs from "fs";

export default async function issues(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  //Create a topic list with 30 items for a website about adherence, pill box, automated pill dispenser and elderly people:

  //adherence, pill box, automated pill dispenser and elderly people
  //Create an outline for a website about ${req.query.topic}. Use bullets:

  const amount = req.query.topic || 30;

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Erstellen Sie eine Liste von Themen für eine Website über ${req.query.topic}. Erstellen Sie ${amount} Themen:`,
    //prompt: `Create a list of topics for a website about ${req.query.topic}. Create ${amount} topics:`,
    temperature: 0,
    max_tokens: 272,
    top_p: 1,
    frequency_penalty: 1.09,
    presence_penalty: 0.77,
  });
  console.log(completion.data.choices[0].text);

  completion.data.choices[0].text.split("\n").forEach((line) => {
    const title =
      line.split(" ")[0].length < 3
        ? line.slice(line.indexOf(" ") + 1)
        : line.substring(1);

    if (title.length < 5) return;
    fs.writeFileSync(
      `./_posts/${title}.mdx`,
      matter.stringify("empty", { title })
    );
  });

  //return "json";
  res.status(200).json(completion.data);
}

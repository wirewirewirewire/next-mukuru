import { Configuration, OpenAIApi } from "openai";
import matter from "gray-matter";
import path from "path";
import fs from "fs";

const baseDir = "./_posts";

export default async function issues(req, res) {
  const title = req.query.title;

  if (req.query.title) {
    await generateFile(`./_posts/${req.query.title}.mdx`);
  } else {
    var files = fs.readdirSync(baseDir);

    await Promise.all(
      files.map(async (file) => {
        if (path.extname(file) === ".mdx") {
          console.log("generating for: ", path.join(baseDir, file));
          await generateFile(path.join(baseDir, file));
        }
      })
    );
  }

  res.status(200).json({ success: true });
}

async function generateFile(fileName) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const file = matter.read(fileName);
  const title = file.data.title;

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    // prompt: `Write a blog post about ${title}. Use Markdown and multiple headings:`,
    prompt: `Schreibe einen Blogpost über ${title}. Verwende Markdown und mehrere Überschriften:`,
    temperature: 0,
    max_tokens: 1200,
    top_p: 1,
    frequency_penalty: 1.09,
    presence_penalty: 0.77,
  });

  const completionExcerpt = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `${completion.data.choices[0].text}-\n\nTl;dr`,
    temperature: 0.7,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  console.log(completion.data.choices[0].text);

  fs.writeFileSync(
    fileName,
    matter.stringify(completion.data.choices[0].text, {
      ...file.data,
      excerpt: completionExcerpt.data.choices[0].text.substring(2),
    })
  );
}

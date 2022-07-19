import { Configuration, OpenAIApi } from "openai";
import matter from "gray-matter";
import path from "path";
import fs from "fs";

const baseDir = "./_posts";

export default async function issues(req, res) {
  const title = req.query.title;

  if (req.query.title) {
    const result = await generateFile(`./_posts/${req.query.title}.mdx`);
    res.status(200).json(result);
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

  console.log(file.content);
  const title = file.data.title;

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    //prompt: `${file.content}-\n\nCreate a prompt for an AI image generator:`,
    prompt: `${file.content}-\n\nErstelle dazu eine Eingabeaufforderung für einen Bildgenerator:`,
    temperature: 0.7,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  fs.writeFileSync(
    fileName,
    matter.stringify(file, {
      ...file.data,
      imagePrompt: completion.data.choices[0].text.substring(2),
    })
  );
  return completion.data;
}

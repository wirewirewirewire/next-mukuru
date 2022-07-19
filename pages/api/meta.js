import { Configuration, OpenAIApi } from "openai";
import matter from "gray-matter";
import fs from "fs";

export default async function issues(req, res) {
  const topic = req.query.topic;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    //prompt: `Link color for a website about ${topic} as hex:`,
    prompt: `Erstelle einen Link-Farbwert für eine Website über ${topic} als Hex-Wert:`,
    temperature: 0,
    max_tokens: 50,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const completionSummary = await openai.createCompletion({
    model: "text-davinci-002",
    //prompt: `Write a short summary about ${topic}:`,
    prompt: `Schreibe einen kurzen Zusammenfassung über ${topic}:`,
    temperature: 0,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  let regularExpression = /#(?:[0-9a-fA-F]{3}){1,2}/g; // btw: this is the same as writing RegExp(/#(?:[0-9a-fA-F]{3}){1,2}/, 'g')
  let extractedHexCodes =
    completion.data.choices[0].text.match(regularExpression);

  fs.writeFileSync(
    `./_posts/meta.mdx`,
    matter.stringify("empty", {
      topic,
      color: extractedHexCodes,
      summary: completionSummary.data.choices[0].text,
    })
  );

  //return "json";
  res.status(200).json(completion.data);
}

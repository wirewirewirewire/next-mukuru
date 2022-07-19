import React from "react";
import Articles from "../components/Blog/Articles";
import Layout from "../components/Blog/Layout";
import { Wrapper } from "@un/react";
import { getAllPosts, getPostBySlug } from "../lib/getPost";
import styles from "./index.module.scss";

const Posts = ({ articles, meta }) => {
  console.log("meta", meta);
  return (
    <Layout>
      <Wrapper pageWidth="md">
        <Articles articles={articles} meta={meta} />
      </Wrapper>
    </Layout>
  );
};

export async function getStaticProps() {
  const meta = getPostBySlug("meta", ["topic", "summary", "color"]);

  const articles =
    (await getAllPosts([
      "title",
      "date",
      "slug",
      "excerpt",
      "author",
      "ogImage",
      "coverImage",
      "content",
    ])) || [];

  return {
    props: { articles, meta },
  };
}

export default Posts;

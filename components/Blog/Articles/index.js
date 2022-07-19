import React from "react";
import Card from "../Card";
import styles from "./article.module.scss";
//import { Search } from "@un/react";
import Link from "next/link";

import Search from "../../Search";
import { useTranslation } from "next-i18next";
import { getCategories } from "../../../lib/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrochip,
  faPaperPlane,
  faScaleBalanced,
} from "@fortawesome/pro-regular-svg-icons";

const links = [
  { href: "#", label: "Einrichten" },
  { href: "#", label: "App Download" },
  { href: "#", label: "Zurücksetzen" },
];

const Articles = ({ articles, meta }) => {
  // if (!categories) return null;
  const categories = [{ name: "common" }];

  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty("--interactive", meta.color[0]);
    document.documentElement.style.setProperty("--link-primary", meta.color[0]);
  }

  return (
    <div>
      <div className={styles.searchWrapper}>
        <Search />
      </div>

      <h2 className={styles.topic}>All about {meta.topic}</h2>
      <p className={styles.summary}> {meta.summary}</p>
      <div className={styles.articles}>
        {categories.map((category) => (
          <>
            <h3 className={styles.subHeading}>
              <FontAwesomeIcon icon={faScaleBalanced} />
              {category.name}
            </h3>
            {articles
              /*.filter((article) =>
                article.tags.find((tag) => tag.id === category.id)
              )*/
              .map((article) => {
                return (
                  <Card article={article} key={`article__${article.id}`} />
                );
              })}
          </>
        ))}
      </div>
    </div>
  );
};

export default Articles;

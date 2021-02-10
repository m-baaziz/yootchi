import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { Post } from "../types/post";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: Post[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      date: matterResult.data["date"],
      title: matterResult.data["title"],
      content: matterResult.content,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

import { Post } from "../lib/types/post";
import React from "react";

describe("Dummy tests", () => {
  it("test one", () => {
    const post: Post = {
      id: "mock",
      date: "2021-01-12",
      title: "title",
      content: "content",
    };
    expect(post.id).toBe("mock");
  });
});

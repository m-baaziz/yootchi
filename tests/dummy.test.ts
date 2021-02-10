import { Post } from "../src/types/post";

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

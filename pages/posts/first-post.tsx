import { GetStaticProps } from "next";
import Link from "next/link";

import { Post } from "../../src/types/post";
import { getSortedPostsData } from "../../src/lib/posts";

type FirstPostProps = {
  posts: Post[];
};

export default function FirstPost(props: FirstPostProps): React.ReactElement {
  const { posts } = props;
  return (
    <div>
      return{" "}
      <Link href="/">
        <a>home</a>
      </Link>
      {posts.map(({ id, date, title, content }) => (
        <section key={id}>
          <h2>{title}</h2>
          <p>
            <span>{date}: </span> {content}
          </p>
        </section>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps<FirstPostProps> = async () => {
  return {
    props: { posts: getSortedPostsData() },
  };
};

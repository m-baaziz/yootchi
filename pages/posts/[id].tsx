import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { Post } from "../../src/types/post";
import { getSortedPostsData } from "../../src/lib/posts";

type PostProps = {
  post?: Post;
};

export default function PostComponent(props: PostProps): React.ReactElement {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading ...</div>;
  }
  if (!props.post) {
    return <div>Post not found</div>;
  }
  const { post } = props;
  const { id, title, date, content } = post;
  return (
    <div>
      <section key={id}>
        <h2>{title}</h2>
        <p>
          <span>{date}: </span> {content}
        </p>
      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostProps> = async ({
  params: { id },
}) => {
  const posts = getSortedPostsData();
  try {
    const post = posts[parseInt(typeof id === "string" ? id : id[0], 10)];
    return {
      props: { post: post || null },
    };
  } catch (e) {
    return {
      props: { post: null },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getSortedPostsData();
  // const posts = [0];
  return {
    paths: posts.map((_, id) => ({
      params: {
        id: `${id}`,
      },
    })),
    fallback: false,
  };
};

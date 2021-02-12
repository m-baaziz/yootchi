import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";

import { Post } from "../../src/types/post";
import { Mode } from "../../src/types/game";
import GameContext from "../../src/contexts/game-context";
import { getSortedPostsData } from "../../src/lib/posts";

type FirstPostProps = {
  posts: Post[];
};

export default function FirstPost(props: FirstPostProps): React.ReactElement {
  const { posts } = props;
  const { setGame } = React.useContext(GameContext);

  const handleTitleClick = () => {
    setGame({
      mode: Mode.FLASHCARD,
    });
  };

  return (
    <div>
      return{" "}
      <Link href="/">
        <a>home</a>
      </Link>
      {posts.map(({ id, date, title, content }) => (
        <section key={id}>
          <button onClick={handleTitleClick}>SET GAME</button>
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

import React from "react";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";

import LessonEditor from "../../src/components/lesson/LessonEditor";

const styles = () =>
  createStyles({
    root: {
      height: "100%",
      display: "flex",
    },
    content: {
      margin: "auto",
      width: "100%",
      display: "grid",
      gridTemplate:
        "  \
        ' .      .            . '  1em   \
        ' .    title          . '  auto   \
        ' .    editor         . '  auto   \
        ' .      .            . '  2em   \
        / 1fr   70%          1fr          \
      ",
    },
    title: { gridArea: "title", placeSelf: "center" },
    editor: {
      gridArea: "editor",
      placeSelf: "center",
      width: "100%",
      minHeight: "50em",
    },
  });

type EditorProps = WithStyles<typeof styles> & { className?: string };

function Editor(props: EditorProps): React.ReactElement {
  const { classes, className } = props;

  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.content}>
        <div className={classes.title}>
          <h2>Create your lesson</h2>
        </div>
        <div className={classes.editor}>
          <LessonEditor />
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Editor);

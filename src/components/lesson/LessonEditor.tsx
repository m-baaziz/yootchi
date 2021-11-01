import React from "react";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const styles = () =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      gridArea: "editor",
      backgroundColor: grey[100],
      color: "black",
      borderRadius: "1em",
      paddingTop: "2em",
      paddingBottom: "2em",
    },
  });

type LessonEditorProps = WithStyles<typeof styles> & {
  className?: string;
};

function LessonEditorComponent(props: LessonEditorProps): React.ReactElement {
  const { classes, className } = props;

  React.useEffect(() => {
    const loadEditorJS = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default;
      const Header = (await import("@editorjs/header")).default;
      new EditorJS({
        holder: "editor",
        autofocus: true,
        tools: {
          header: Header,
        },
      });
    };
    loadEditorJS();
  }, []);

  return (
    <div className={cn(classes.root, className)}>
      <div id="editor" />
    </div>
  );
}

export default withStyles(styles)(LessonEditorComponent);

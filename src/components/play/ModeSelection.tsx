import React from "react";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core";

import { Mode } from "../../types/game";

const styles = () =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      margin: "auto",
    },
  });

type ModeSelectionProps = WithStyles<typeof styles> & {
  className?: string;
  value?: Mode;
  onChange: (mode: Mode) => void;
};

function ModeSelection(props: ModeSelectionProps): React.ReactElement {
  const { classes, className, value, onChange } = props;

  const handleOnChange = () => {
    onChange(value);
  };

  return (
    <div className={cn(classes.root, className)} onSubmit={handleOnChange}>
      <div className={classes.content}>Mode: {value}</div>
    </div>
  );
}

export default withStyles(styles)(ModeSelection);

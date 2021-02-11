import React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Grid } from "@material-ui/core";
import cn from "classnames";

import { Language } from "../../types/game";

const styles = () =>
  createStyles({
    root: {},
    image: {},
    langs: {},
  });

type LangSelectionProps = WithStyles<typeof styles> & {
  className?: string;
  value?: Language;
  onSubmit: (lang: Language) => void;
};

function LangSelection(props: LangSelectionProps): React.ReactElement {
  const { classes, className, value, onSubmit } = props;

  const handleSubmit = (): void => {
    onSubmit(Language.JA);
  };

  return (
    <div className={cn(classes.root, className)} onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div className={classes.image}>Image</div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.langs}>Languages: {value}</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(LangSelection);

import React from "react";
import Image from "next/image";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Card, Typography } from "@material-ui/core";

const styles = () =>
  createStyles({
    root: {
      width: "100%",
      borderRadius: 20,
      display: "grid",
      gridTemplate: `\
          '  image         '  2fr   \
          '   .            '  1em   \
          '  title         '  auto  \
          '  description   '  1fr   \
          /  auto                   \
        `,
    },
    imageContainer: {
      gridArea: "image",
      position: "relative",
    },
    title: { gridArea: "title", color: "black", justifySelf: "center" },
    description: {
      gridArea: "description",
      overflowY: "scroll",
      justifySelf: "center",
      margin: "1em",
    },
  });

type ModeCardProps = WithStyles<typeof styles> & {
  className?: string;
  image_url: string;
  title: string;
  description: string;
};

function ModeCard(props: ModeCardProps): React.ReactElement {
  const { classes, className, image_url, title, description } = props;

  return (
    <Card className={cn(classes.root, className)}>
      <div className={classes.imageContainer}>
        {image_url ? <Image src={image_url} alt={title} layout="fill" /> : null}
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {title}
      </Typography>
      <Typography
        className={classes.description}
        variant="body2"
        color="textSecondary"
        component="p"
      >
        {description}
      </Typography>
    </Card>
  );
}

export default withStyles(styles)(ModeCard);

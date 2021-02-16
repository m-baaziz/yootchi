import React from "react";
import Image from "next/image";
import cn from "classnames";
import { Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Card, CardContent, Typography } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      [theme.breakpoints.up("lg")]: {
        height: 615,
      },
      [theme.breakpoints.down("lg")]: {
        height: 415,
      },
      borderRadius: 20,
      display: "grid",
      gridTemplate: `\
          '  image           '  2fr \
          '  content         '  1fr                 \
          /  auto                                    \
        `,
    },
    content: {
      gridArea: "content",
      display: "grid",
      gridTemplate:
        "  \
        ' title       '  auto  \
        '   .         '  1em   \
        ' description '  1fr   \
        /  auto                \
      ",
      placeItems: "center",
      overflow: "auto",
    },
    imageContainer: {
      gridArea: "image",
      position: "relative",
    },
    title: { gridArea: "title", color: "black" },
    description: { gridArea: "description" },
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
      <CardContent className={classes.content}>
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
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(ModeCard);

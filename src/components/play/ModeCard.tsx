import React from "react";
import Image from "next/image";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Card, CardContent, Typography } from "@material-ui/core";

const MODE_IMG_HEIGHT = 415;
const MODE_IMG_WIDTH = 415;

const styles = () =>
  createStyles({
    root: {
      height: 600,
      width: MODE_IMG_WIDTH,
      borderRadius: 20,
      display: "grid",
      gridTemplate: `\
          '  image           '  ${MODE_IMG_HEIGHT}px \
          '  content         '  auto                 \
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
    },
    imageContainer: { gridArea: "image" },
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
        {image_url ? (
          <Image
            src={image_url}
            alt={title}
            width={MODE_IMG_WIDTH}
            height={MODE_IMG_HEIGHT}
          />
        ) : null}
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

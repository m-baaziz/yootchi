import React from "react";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Button } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

import ModeCard from "./ModeCard";

import { Mode, ModeInfo } from "../../types/mode";
import { getNext, getPrevious } from "../../lib/utils";

const styles = () =>
  createStyles({
    root: {
      display: "grid",
      ["@media (min-height:800px)"]: {
        gridTemplate:
          "  \
        '  .       .      .     .     .        .       .   ' 15%  \
        '  .  arrow-left  .   card    .   arrow-right  .   ' 1fr \
        '  .       .      .     .     .        .       .   ' 15%  \
        /  6%     10%    1fr   20%   1fr      10%      6%         \
      ",
      },
      ["@media (max-height:799px)"]: {
        gridTemplate:
          "  \
      '  .       .      .     .     .        .       .   ' 1em  \
      '  .  arrow-left  .   card    .   arrow-right  .   ' 1fr \
      '  .       .      .     .     .        .       .   ' 1em  \
      /  6%     10%    1fr   25%   1fr      10%      6%         \
    ",
      },
    },
    card: {
      gridArea: "card",
      overflow: "hidden",
    },
    arrowIcon: { fontSize: "5em" },
    arrowLeft: { gridArea: "arrow-left", placeSelf: "center" },
    arrowRight: { gridArea: "arrow-right", placeSelf: "center" },
  });

type ModeSelectionProps = WithStyles<typeof styles> & {
  className?: string;
  modeInfos: ModeInfo[];
  value?: Mode;
  onChange: (mode: Mode) => void;
};

function ModeSelection(props: ModeSelectionProps): React.ReactElement {
  const { classes, className, modeInfos, value, onChange } = props;
  const [modeInfo, setModeInfo] = React.useState<ModeInfo | undefined>(
    undefined
  );

  const handlePreviousClick = () => {
    if (typeof value === undefined) return;
    onChange(getPrevious(modeInfos, value, (info) => info.id));
  };

  const handleNextClick = () => {
    if (typeof value === undefined) return;
    onChange(getNext(modeInfos, value, (info) => info.id));
  };

  React.useEffect(() => {
    if (value === undefined && modeInfos.length > 0) {
      onChange(modeInfos[0].id);
    }
  }, [onChange, value, modeInfos]);

  React.useEffect(() => {
    setModeInfo(modeInfos.find((info) => info.id === value) || modeInfos[0]);
  }, [setModeInfo, modeInfos, value]);

  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.arrowLeft}>
        <Button
          aria-label="previous"
          onClick={handlePreviousClick}
          disabled={getPrevious(modeInfos, value, (info) => info.id) === null}
        >
          <KeyboardArrowLeft className={classes.arrowIcon} />
        </Button>
      </div>
      {modeInfo ? (
        <ModeCard
          key={modeInfo.id}
          className={classes.card}
          image_url={modeInfo.image_url}
          title={modeInfo.title}
          description={modeInfo.description}
        />
      ) : (
        <div className={classes.card} />
      )}
      <div className={classes.arrowRight}>
        <Button
          aria-label="next"
          onClick={handleNextClick}
          disabled={getNext(modeInfos, value, (info) => info.id) === null}
        >
          <KeyboardArrowRight className={classes.arrowIcon} />
        </Button>
      </div>
    </div>
  );
}

export default withStyles(styles)(ModeSelection);

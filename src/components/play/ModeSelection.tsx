import React from "react";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Button } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

import ModeCard from "./ModeCard";

import { Mode, ModeInfo } from "../../types/game";
import { getNext, getPrevious } from "../../lib/utils";

const styles = () =>
  createStyles({
    root: {
      display: "grid",
      gridTemplate:
        "  \
        '      .      .     .     .        .       ' 1em  \
        ' arrow-left  .   cards   .   arrow-right  ' 1fr  \
        '      .      .     .     .        .       ' 1em  \
        /     10%    1fr   auto  1fr      10%             \
      ",
      placeItems: "center",
    },
    cards: { gridArea: "cards" },
    arrowIcon: { fontSize: "5em" },
    arrowLeft: { gridArea: "arrow-left" },
    arrowRight: { gridArea: "arrow-right" },
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
      <div className={classes.cards}>
        {modeInfo ? (
          <ModeCard
            key={modeInfo.id}
            image_url={modeInfo.image_url}
            title={modeInfo.title}
            description={modeInfo.description}
          />
        ) : null}
      </div>
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

import React from "react";
import cn from "classnames";
import {
  withStyles,
  WithStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import {
  createStyles,
  Stepper as MuiStepper,
  Step as MuiStep,
  StepLabel as MuiStepLabel,
  StepConnector as MuiStepConnector,
} from "@material-ui/core";
import { Check as CheckIcon } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";

import { Step } from "../../types/play";

const styles = (theme: Theme) =>
  createStyles({
    root: {},
    stepper: {
      backgroundColor: "inherit",
    },
    alternativeLabel: {
      color: theme.palette.text.primary === grey[50] ? grey[600] : undefined,
    },
  });

const StepConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(MuiStepConnector);

const stepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

type StepperProps = WithStyles<typeof styles> & {
  className?: string;
  steps: Step[];
  value?: Step;
  onChange: (step: Step) => void;
};

type StepIconProps = {
  active: boolean;
  completed: boolean;
};

function StepIcon(props: StepIconProps) {
  const classes = stepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={cn(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <CheckIcon className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

function Stepper(props: StepperProps): React.ReactElement {
  const { classes, className, steps, value, onChange } = props;

  const handleStepClick = (step: Step) => (): void => {
    onChange(step);
  };

  const activeStep = Math.max(
    0,
    steps.findIndex((s) => s === value)
  );

  return (
    <div className={cn(classes.root, className)}>
      <MuiStepper
        classes={{ root: classes.stepper }}
        alternativeLabel
        activeStep={activeStep}
        connector={<StepConnector />}
      >
        {steps.map((step) => (
          <MuiStep key={step} onClick={handleStepClick(step)}>
            <MuiStepLabel
              classes={{ alternativeLabel: classes.alternativeLabel }}
              StepIconComponent={StepIcon}
            >
              {step}
            </MuiStepLabel>
          </MuiStep>
        ))}
      </MuiStepper>
    </div>
  );
}

export default withStyles(styles)(Stepper);

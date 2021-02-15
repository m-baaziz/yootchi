import React from "react";
import Image from "next/image";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Grid, Button } from "@material-ui/core";

import { Language, LanguageInfo } from "../../types/game";

const styles = () =>
  createStyles({
    root: {
      display: "grid",
      gridTemplate:
        "  \
        ' image langs'  1fr   \
        ' image langs'  auto  \
        /  2fr   1fr          \
      ",
      placeItems: "stretch",
      placeContent: "stretch",
    },
    imageContainer: { gridArea: "image", display: "flex" },
    langsContainer: {
      gridArea: "langs",
      justifySelf: "end",
      display: "flex",
    },
    image: { margin: "auto" },
    langsGrid: { margin: "auto" },
    langsGridItem: {
      margin: "auto",
      display: "grid",
      justifyContent: "end",
      alignItems: "center",
      paddingRight: "0 !important",
    },
    langBtn: {
      width: "14em",
      margin: "auto",
    },
    langBtnLabel: {
      display: "flex",
    },
    langBtnFlag: {
      margin: "auto",
    },
    langBtnText: {
      margin: "auto",
      flexGrow: 2,
    },
    submit: { gridArea: "submit", justifySelf: "end" },
    submitBtn: { fontSize: "4em" },
  });

type LangSelectionProps = WithStyles<typeof styles> & {
  className?: string;
  languageInfos: LanguageInfo[];
  value: Language;
  onChange: (lang: Language) => void;
};

function LangSelection(props: LangSelectionProps): React.ReactElement {
  const { classes, languageInfos, className, value, onChange } = props;
  const [hoveredLang, setHoveredLang] = React.useState<Language | undefined>();
  const [languageInfo, setLanguageInfo] = React.useState<LanguageInfo>(
    languageInfos[0]
  );

  const handleLangClick = (lang: Language) => (): void => {
    onChange(lang);
  };

  const handleLangMouseEnter = (lang: Language) => (): void => {
    setHoveredLang(lang);
  };

  const handleLangMouseLeave = (lang: Language) => (): void => {
    if (hoveredLang === lang) {
      setHoveredLang(undefined);
    }
  };

  React.useEffect(() => {
    setLanguageInfo(
      languageInfos.find((info) => info.id === value) || languageInfos[0]
    );
  }, [setLanguageInfo, languageInfos, value]);

  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.imageContainer}>
        <div className={classes.image}>
          <Image
            src={languageInfo.image_url}
            alt={`${languageInfo.id}-picture`}
            width={850}
            height={640}
          />
        </div>
      </div>
      <div className={classes.langsContainer}>
        <Grid container className={classes.langsGrid} spacing={3}>
          {languageInfos.map((info) => (
            <Grid
              item
              key={info.id}
              classes={{ item: classes.langsGridItem }}
              xs={12}
            >
              <Button
                className={classes.langBtn}
                classes={{
                  startIcon: classes.langBtnFlag,
                  label: classes.langBtnLabel,
                }}
                variant="outlined"
                color={
                  [value, hoveredLang].includes(info.id)
                    ? "secondary"
                    : "default"
                }
                startIcon={
                  info.flag_url ? (
                    <Image
                      src={info.flag_url}
                      alt={`${info.id}-flag`}
                      width={40}
                      height={40}
                    />
                  ) : null
                }
                onClick={handleLangClick(info.id)}
                onMouseEnter={handleLangMouseEnter(info.id)}
                onMouseLeave={handleLangMouseLeave(info.id)}
              >
                <span className={classes.langBtnText}>{info.id}</span>
              </Button>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default withStyles(styles)(LangSelection);

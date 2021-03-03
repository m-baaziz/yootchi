import React from "react";
import Image from "next/image";
import cn from "classnames";
import { Key } from "ts-key-enum";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, Grid, Button } from "@material-ui/core";

import { Language, LanguageInfo } from "../../types/language";
import { getNext, getPrevious } from "../../lib/utils";

const styles = () =>
  createStyles({
    root: {
      display: "grid",
      gridTemplate:
        "  \
        ' .     .     .    .  '  1em   \
        ' .   image langs  .  '  1fr   \
        ' .   image langs  .  '  auto  \
        / 10%  2fr   1fr  10%          \
      ",
      placeItems: "stretch",
      placeContent: "stretch",
    },
    imageContainer: { gridArea: "image", position: "relative" },
    langsContainer: {
      gridArea: "langs",
      justifySelf: "end",
      display: "flex",
    },
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
    const listener = (event: KeyboardEvent) => {
      const { key } = event;
      if (![Key.ArrowDown, Key.ArrowUp].includes(key as Key)) return;
      let nextLanguage: Language | undefined = undefined;
      const mapper: (li: LanguageInfo) => Language = (li) => li.id;
      if (key === Key.ArrowDown) {
        nextLanguage = getNext(languageInfos, value, mapper);
      }
      if (key === Key.ArrowUp) {
        nextLanguage = getPrevious(languageInfos, value, mapper);
      }
      if (nextLanguage) {
        onChange(nextLanguage);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [onChange, languageInfos, value]);

  React.useEffect(() => {
    setLanguageInfo(
      languageInfos.find((info) => info.id === value) || languageInfos[0]
    );
  }, [setLanguageInfo, languageInfos, value]);

  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.imageContainer}>
        <Image
          src={languageInfo.image_url}
          alt={`${languageInfo.id}-picture`}
          layout="fill"
        />
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
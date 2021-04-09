import React from "react";
import cn from "classnames";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { createStyles, TextField, Link, Button } from "@material-ui/core";

import { useUser } from "../src/hooks/user";

const styles = () =>
  createStyles({
    root: {
      height: "100%",
      display: "flex",
    },
    content: {
      margin: "auto",
      marginTop: "8em",
      width: "100%",
      display: "grid",
      gridTemplate:
        "  \
        ' .      .            . '  auto   \
        ' .    title          . '  auto   \
        ' .      .            . '  4em    \
        ' .    form           . '  auto   \
        ' .      .            . '  4em    \
        ' .    signup         . '  auto   \
        ' .      .            . '  2em    \
        ' .    signupLink     . '  auto   \
        ' .      .            . '  auto   \
        / 1fr   1fr           1fr         \
      ",
    },
    title: { gridArea: "title", placeSelf: "center" },
    form: {
      gridArea: "form",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, 1fr)",
      rowGap: "1em",
    },
    inputLabel: { color: "inherit" },
    forgotPassword: { gridArea: "forgotPassword", placeSelf: "end" },
    signup: { gridArea: "signup", placeSelf: "center" },
    signupLink: { gridArea: "signupLink", placeSelf: "center" },
    button: { textTransform: "none" },
  });

type SignUpProps = WithStyles<typeof styles> & { className?: string };

function SignUp(props: SignUpProps): React.ReactElement {
  const { classes, className } = props;
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { signUp } = useUser();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignUp = () => {
    console.log("sign up : ", email, password);
    signUp(email, password);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignUp();
  };

  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.content}>
        <div className={classes.title}>
          <h2>Create a new account</h2>
        </div>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <TextField
            label="Email"
            fullWidth
            InputLabelProps={{ className: classes.inputLabel }}
            onChange={handleEmailChange}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            InputLabelProps={{ className: classes.inputLabel }}
            onChange={handlePasswordChange}
          />
          <input type="submit" hidden />
        </form>
        <div className={classes.signup}>
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </div>
        <div className={classes.signupLink}>
          Already have an account ? <Link href="/signin">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(SignUp);

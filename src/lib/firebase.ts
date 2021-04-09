import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/firestore";
import keyMirror from "keymirror";

const config = {
  apiKey: "AIzaSyC0TIA4u6mnplQmEWbycidiAWZtZaWX3Lw",
  authDomain: "yootchi.firebaseapp.com",
  projectId: "yootchi",
  storageBucket: "yootchi.appspot.com",
  messagingSenderId: "480308391939",
  appId: "1:480308391939:web:75af5a4360317a82c91e36",
  measurementId: "G-G0XHE91X1R",
};

export const collections = keyMirror({
  USER_PREFERENCES: null,
});

function getApp() {
  if (process.env.STAGE === "dev" || location.hostname === "localhost") {
    const app =
      firebase.apps.length > 0
        ? firebase.app()
        : firebase.initializeApp({
            projectId: "dev",
            apiKey: "dev-api-key",
            appId: "dev-app-id",
          });
    app.auth().useEmulator("http://localhost:9099");
    app.firestore().useEmulator("localhost", 9080);
    return app;
  }
  const app =
    firebase.apps.length > 0 ? firebase.app() : firebase.initializeApp(config);
  if (
    typeof window !== "undefined" &&
    process.env.STAGE &&
    process.env.STAGE !== "dev"
  ) {
    console.log("initializing analytics");
    app.analytics();
  }
  return app;
}

const app = getApp();

console.log("firebase options = ", app.options);

export default app;

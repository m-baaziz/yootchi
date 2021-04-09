import React from "react";
import firebase, { collections } from "../lib/firebase";
import { User, Profile, Preferences } from "../types/user";

export type UseUserResult = {
  user: User;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithToken: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Profile) => Promise<void>;
  updatePreferences: (preferences: Preferences) => Promise<void>;
};

export function getUserPreferencesDocument(userId: string) {
  return firebase
    .firestore()
    .collection(collections.USER_PREFERENCES)
    .doc(userId);
}

function updateProfile(profile: Profile): Promise<void> {
  const { currentUser } = firebase.auth();
  if (!currentUser) return Promise.resolve();
  return currentUser.updateProfile({
    displayName: profile.username,
    photoURL: profile.avatar_url,
  });
}

function updatePreferences(preferences: Preferences): Promise<void> {
  const { currentUser } = firebase.auth();
  if (!currentUser) return Promise.resolve();
  return getUserPreferencesDocument(currentUser.uid).set(preferences);
}

export function useUser(): UseUserResult {
  const [user, setUser] = React.useState<User | null>(null);
  const [
    userPreferences,
    setUserPreferences,
  ] = React.useState<Preferences | null>(null);

  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (!user) return;
        setUser({
          user_id: user.uid,
          token: await user.getIdToken(),
          profile: {
            username: user.displayName,
            avatar_url: user.photoURL,
          },
        });
      } catch (e) {
        console.error(e);
      }
    });
  }, []);

  React.useEffect(() => {
    if (!user) return;
    return getUserPreferencesDocument(user.user_id).onSnapshot(
      (doc) => {
        setUserPreferences(
          doc.exists
            ? {
                language_info: doc.get("language_info"),
              }
            : null
        );
      },
      (error) => {
        console.log("snapshot error: ", error);
      }
    );
  }, [user]);

  return {
    user: user ? { ...user, preferences: userPreferences } : null,
    signUp: (email: string, password: string) =>
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          return;
        }),
    signIn: (email: string, password: string) =>
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          return;
        }),
    signInWithToken: (token: string) =>
      firebase
        .auth()
        .signInWithCustomToken(token)
        .then(() => {
          return;
        }),
    signOut: () =>
      firebase
        .auth()
        .signOut()
        .then(() => {
          setUser(null);
        }),
    updateProfile,
    updatePreferences,
  };
}

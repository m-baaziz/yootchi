import firebase, { collections } from "./firebase";

import { Profile, Preferences } from "../types/user";
import { Account, ERRORS } from "../types/account";
import { Player, Team } from "../types/player";
import { getPlayers } from "./player";

export async function getAccount(): Promise<Account> {
  return Promise.resolve(getPlayers()[0]);
}

export async function accountToPlayer(account: Account): Promise<Player> {
  const { user_id, username, avatar_url, language_info } = account;
  return Promise.resolve({
    user_id,
    username,
    avatar_url,
    language_info,
    team: Team.BLUE,
  });
}

export function getUserPreferencesDocument(userId: string) {
  return firebase
    .firestore()
    .collection(collections.USER_PREFERENCES)
    .doc(userId);
}

export function getPreferences(): Promise<Preferences> {
  const { currentUser } = firebase.auth();
  if (!currentUser) return Promise.reject(ERRORS.USER_NOT_SIGNED_IN);
  return getUserPreferencesDocument(currentUser.uid)
    .get()
    .then((value) => ({
      language_info: value.get("language_info"),
    }));
}

export function updatePreferences(preferences: Preferences): Promise<void> {
  const { currentUser } = firebase.auth();
  if (!currentUser) return Promise.resolve();
  return getUserPreferencesDocument(currentUser.uid).set(preferences);
}

export function updateProfile(profile: Profile): Promise<void> {
  const { currentUser } = firebase.auth();
  if (!currentUser) return Promise.resolve();
  return currentUser.updateProfile({
    displayName: profile.username,
    photoURL: profile.avatar_url,
  });
}

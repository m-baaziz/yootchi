import { Preferences } from "../../../types/user";
import { LANGUAGE_MAP } from "../../language";
import { getPreferences, updatePreferences } from "../../account";

export async function get(): Promise<Preferences> {
  return getPreferences();
}

export async function update(language_id: string): Promise<Preferences> {
  if (!(language_id in LANGUAGE_MAP)) return Promise.reject("Invalid language");

  const preferences: Preferences = {
    language_info: LANGUAGE_MAP[language_id],
  };

  return updatePreferences(preferences).then(() => preferences);
}

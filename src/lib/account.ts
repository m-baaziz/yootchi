import { Account } from "../types/account";
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

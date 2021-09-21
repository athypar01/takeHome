import { EntityState } from "@ngrx/entity";
import { USERS_FEATURE_KEY } from "../+state/users.reducer";
import { User } from "./users.interface";

export interface FriendsAppStateInterface extends EntityState<User> {
  selectedId?: string | null;
  loaded: boolean;
  error?: string | null;
  editToggleStatus: boolean;
  isSubmitting: boolean;
}

export interface UsersPartialState {
  readonly [USERS_FEATURE_KEY]: FriendsAppStateInterface;
}

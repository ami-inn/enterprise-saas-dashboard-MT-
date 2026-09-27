import type { InternalAxiosRequestConfig } from "axios";

/**
 * Shape of the decrypted token object.
 * Adjust field names/types to match what DecryptToken actually returns.
 */
export interface DecryptedToken {
  access: string;
  refresh: string;
}

/**
 * Minimal shape of the auth slice this file depends on.
 * Replace with your actual RootState["auth"] type if available,
 * e.g. `import type { RootState } from "../base/store/store";`
 */
export interface AuthState {
  userTokens: string | null; // encrypted token string, or whatever DecryptToken expects
}

export interface RootStateShape {
  auth: AuthState;
}

/**
 * The "type" discriminator used when refreshing tokens.
 * Currently only "user" is used; empty string represents "no type / not applicable".
 */
export type TokenOwnerType = "user" | "";

/**
 * Extends Axios's request config so we can safely set a custom `_retry` flag
 * used to prevent infinite refresh loops.
 */
export interface RetryableAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
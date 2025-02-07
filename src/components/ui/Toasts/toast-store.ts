import { writable } from "svelte/store";

interface IToastMsg {
  type: string;
  msg: string;
}

// TODO: Convert this to Svelte 5 and use runes instead of stores.

export const toastContent = writable(null);

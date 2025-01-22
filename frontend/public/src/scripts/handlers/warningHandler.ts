import { toggleWarning } from "../utils/domUtils.js";

export const showWarning = (msg: string) => {
  toggleWarning(msg);
};

export const clearWarning = () => {
  toggleWarning();
};
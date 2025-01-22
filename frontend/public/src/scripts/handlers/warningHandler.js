import { toggleWarning } from "../utils/domUtils.js";
export const showWarning = (msg) => {
    toggleWarning(msg);
};
export const clearWarning = () => {
    toggleWarning();
};

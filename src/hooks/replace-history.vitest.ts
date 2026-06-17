import {vi} from "vitest";
import {replaceHistory as replaceHistoryBase} from "./replace-history";

export const replaceHistory = () => replaceHistoryBase(vi.spyOn);

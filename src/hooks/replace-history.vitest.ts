import {vi} from "vitest";
import {replaceHistory as replaceHistoryBase} from "./replace-history.ts";

export const replaceHistory = () => replaceHistoryBase(vi.spyOn);

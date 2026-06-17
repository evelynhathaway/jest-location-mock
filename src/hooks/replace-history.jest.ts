import {jest} from "@jest/globals";
import {replaceHistory as replaceHistoryBase} from "./replace-history.ts";

export const replaceHistory = () => replaceHistoryBase(jest.spyOn);

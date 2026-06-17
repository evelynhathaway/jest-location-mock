import {vi} from "vitest";
import {replaceLocation as replaceLocationBase} from "./replace-location.ts";

export const replaceLocation = () => replaceLocationBase(vi.spyOn);

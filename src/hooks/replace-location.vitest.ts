import {vi} from "vitest";
import {replaceLocation as replaceLocationBase} from "./replace-location";

export const replaceLocation = () => replaceLocationBase(vi.spyOn);

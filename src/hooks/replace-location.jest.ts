import {jest} from "@jest/globals";
import {replaceLocation as replaceLocationBase} from "./replace-location";

export const replaceLocation = () => replaceLocationBase(jest.spyOn);

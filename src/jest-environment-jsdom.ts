import {createContext, type Context} from "node:vm";
import type {
	EnvironmentContext,
	JestEnvironmentConfig,
} from "@jest/environment";
import JSDOMEnvironment from "jest-environment-jsdom";
// import {locationMockRef} from "./hooks";
// import {LocationMockRelative} from "./utils";

export default class JSDOMEnvironmentWithCustomLocation extends JSDOMEnvironment {
	// private originalGlobal: typeof this.global;
	// private vm: Context;

	constructor (config: JestEnvironmentConfig, context: EnvironmentContext) {
		super(config, context);

		const window = this.dom?.getInternalVMContext();

		if (!window) {
			throw new Error("Failed to get the internal VM context from JSDOM");
		}

		// Object.defineProperty(
		// 	this.dom?.getInternalVMContext(),
		// 	"location",
		// 	{
		// 		value: "abc123",
		// 		configurable: true,
		// 		enumerable: true,
		// 	},
		// );

		const mockedWindow = new Proxy(window, {
			get (target, property, receiver) {
				console.log(property);
				if (property === "location") {
					console.log("Getting window.location");
					if (!target._locationMock) {
						throw new Error("Location mock is not set up yet");
					}
					return target._locationMock;
					// return locationMock;
				}
				if (property === "_originalLocation") {
					console.log("Getting window._originalLocation");
					// eslint-disable-next-line @typescript-eslint/no-unsafe-return
					return Reflect.get(target, "location", receiver);
				}
				// eslint-disable-next-line @typescript-eslint/no-unsafe-return
				return Reflect.get(target, property, receiver);
			},
			set (target, property, value, receiver) {
				console.log(property);
				if (property === "location") {
					console.log("Setting window.location");
					if (!target._locationMock) {
						throw new Error("Location mock is not set up yet");
					}
					target._locationMock.href = value;

					// locationMock.href = value;
				}
				return Reflect.set(target, property, value, receiver);
			},
		});
		// this.vm = createContext(mockedWindow);
		// TODO: more proper emulation of JSDOM's internal VM logic
		window._globalObject = mockedWindow;
		window._globalProxy = mockedWindow;

		// const originalWindow = this.global.window;
		// this.originalGlobal = this.global;

		// const proxiedHistory = new Proxy(
		// 	originalWindow.history,
		// 	{
		// 		get (target, property, receiver) {
		// 			const realValue: unknown = Reflect.get(target, property, receiver);
		// 			// If the property of window.history is a method, wrap it in a proxy to update the location mock
		// 			if (typeof realValue === "function" || jest.isMockFunction(realValue)) {
		// 				return new Proxy(
		// 					realValue,
		// 					{
		// 						apply (...args) {
		// 							Reflect.apply(...args);
		// 							// Update the location mock if the location was updated
		// 							if (locationMockRef.current && locationMockRef.current.href !== originalWindow.location.href) {
		// 								locationMockRef.current.href = originalWindow.location.href;
		// 							}
		// 						},
		// 					}
		// 				);
		// 			}
		// 			return realValue;
		// 		},
		// 	}
		// );

		// // Add the property to the Window
		// Object.defineProperty(
		// 	window,
		// 	"history",
		// 	{
		// 		set: undefined,
		// 		get () {
		// 			return proxiedHistory;
		// 		},
		// 		configurable: true,
		// 		enumerable: true,
		// 	},
		// );

		// const mockedWindow = new Proxy(originalWindow, {
		// 	get (target, property, receiver) {
		// 		if (property === "location" && locationMockRef.current) {
		// 			console.log("Getting window.location");
		// 			return locationMockRef.current;
		// 		}
		// 		if (property === "history") {
		// 			console.log("Getting window.history");
		// 			return proxiedHistory;
		// 		}
		// 		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		// 		return Reflect.get(target, property, receiver);
		// 	},
		// 	set (target, property, value, receiver) {
		// 		if (property === "location" && locationMockRef.current) {
		// 			console.log("Setting window.location");
		// 			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		// 			locationMockRef.current.href = value;
		// 		}
		// 		return Reflect.set(target, property, value, receiver);
		// 	},
		// });

		// this.global = new Proxy(this.originalGlobal, {
		// 	get (target, property, receiver) {
		// 		if (property === "window") {
		// 			console.log("Getting window");
		// 			return mockedWindow;
		// 		}
		// 		if (property === "location") {
		// 			console.log(new Error().stack);
		// 		}
		// 		if (property === "location" && locationMockRef.current) {
		// 			console.log("Getting location");
		// 			return locationMockRef.current;
		// 		}
		// 		if (property === "history") {
		// 			console.log("Getting history");
		// 			return proxiedHistory;
		// 		}
		// 		return Reflect.get(target, property, receiver);
		// 	},
		// 	set (target, property, value, receiver) {
		// 		if (property === "location" && locationMockRef.current) {
		// 			console.log("Setting location");
		// 			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		// 			locationMockRef.current.href = value;
		// 		}
		// 		return Reflect.set(target, property, value, receiver);
		// 	},
		// });
	}

	// teardown () {
	// 	// this.global = this.originalGlobal;
	// 	// this.originalGlobal = null as unknown as typeof this.global;
	// 	return super.teardown();
	// }
	// getVmContext () {
	// 	return this.vm;
	// }
}

export const TestEnvironment = JSDOMEnvironmentWithCustomLocation;

import React from "react";
import {screen, render, act} from "@testing-library/react";
import {
	BrowserRouter,
	createBrowserRouter,
	MemoryRouter,
	RouterProvider,
	Routes,
	Route,
	Link,
} from "react-router-dom";

describe("react-router-dom", () => {
	describe("createBrowserRouter() and <RouterProvider>", () => {
		it("should change routes alongside window.location", () => {
			const router = createBrowserRouter([
				{
					path: "/",
					element: <Link to="/e8ab27c6-7e83-4fa8-a52b-b3bab5023ff0">Link from Root to Page</Link>,
				},
				{
					path: "/e8ab27c6-7e83-4fa8-a52b-b3bab5023ff0",
					element: <Link to="/">Link from Page to Root</Link>,
				},
			]);
			render(<RouterProvider router={router} />);
			act(() => {
				screen.getByText("Link from Root to Page").click();
			});
			expect(window.location).toBeAt("/e8ab27c6-7e83-4fa8-a52b-b3bab5023ff0");
			expect(screen.getByText("Link from Page to Root")).toBeInTheDocument();
		});
	});

	describe("<BrowserRouter>", () => {
		it("should change routes alongside window.location", () => {
			render(
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={<Link to="/5c99ad6a-c1ed-4c6d-b4a9-9460a6da36f8">Link from Root to Page</Link>}
					/>
					<Route
						path="/5c99ad6a-c1ed-4c6d-b4a9-9460a6da36f8"
						element={<Link to="/">Link from Page to Root</Link>}
					/>
				</Routes>
			</BrowserRouter>
			);
			act(() => {
				screen.getByText("Link from Root to Page").click();
			});
			expect(window.location).toBeAt("/5c99ad6a-c1ed-4c6d-b4a9-9460a6da36f8");
			expect(screen.getByText("Link from Page to Root")).toBeInTheDocument();
		});
	});

	describe("<MemoryRouter>", () => {
		it("should change routes, but window.location should not update", () => {
			render(
			<MemoryRouter>
				<Routes>
					<Route
						path="/"
						element={<Link to="/1494ea67-a401-43c8-b393-dc8c843f394b">Link from Root to Page</Link>}
					/>
					<Route
						path="/1494ea67-a401-43c8-b393-dc8c843f394b"
						element={<Link to="/">Link from Page to Root</Link>}
					/>
				</Routes>
			</MemoryRouter>
			);
			act(() => {
				screen.getByText("Link from Root to Page").click();
			});
			// MemoryRouter doesn't change the `window.location`
			// - This time I checked a clean environment without any mocks or other tests
			expect(window.location).toBeAt("/");
			// The router should still behave like normal, even though it wouldn't change the location on the browser
			expect(screen.getByText("Link from Page to Root")).toBeInTheDocument();
		});
	});
});

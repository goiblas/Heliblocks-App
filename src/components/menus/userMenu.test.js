import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { UserMenu } from "./userMenu";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@chakra-ui/core";

describe("Header component", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: true, // show user name
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });
  });

  test("should be render name", () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <UserMenu profile={{ displayName: "Peter" }} auth={{ uid: 1 }} />
      </ThemeProvider>
    );
    expect(getByTestId("dropdown")).toHaveTextContent("Peter");
  });

  test("should call logout function", () => {
    const signOut = jest.fn();

    const { getByTestId } = render(
      <ThemeProvider>
        <BrowserRouter>
          <UserMenu
            profile={{ displayName: "Peter" }}
            auth={{ uid: 1 }}
            signOut={signOut}
          />
        </BrowserRouter>
      </ThemeProvider>
    );

    fireEvent.click(getByTestId("dropdown"));
    fireEvent.click(getByTestId("logout-button"));

    expect(signOut).toHaveBeenCalledTimes(1);
  });
});

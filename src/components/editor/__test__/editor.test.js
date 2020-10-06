import React from "react";
import { render, act } from "@testing-library/react";
import Editor from "../index";
import { AuthContext } from "services/auth";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@chakra-ui/core";
import theme from "theme";

// mock media query hook
import useMediaQuery from "react-use-media-query-hook";

// mock private heliblocks
import { useCanSaveRestrictedHeliblocks } from "hooks";
jest.mock("react-use-media-query-hook");
jest.mock("hooks");

useCanSaveRestrictedHeliblocks.mockImplementation(() => [true, true]);
useMediaQuery.mockImplementation(() => true); // default desktop version

// render component inside mock providers
const renderWithProviders = (component) => {
  const value = {
    isLoaded: true,
    user: {
      displayName: "John",
    },
  };
  return render(
    <AuthContext.Provider value={value}>
      <Router>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </Router>
    </AuthContext.Provider>
  );
};

// test
describe("Editor", () => {
  describe("Layout", () => {
    test("Should render mobile version in small screen", () => {
      act(() => {
        useMediaQuery.mockImplementationOnce(() => false);
        const { getByTestId, queryByTestId } = renderWithProviders(<Editor />);

        const mobile = getByTestId("mobile-editor");
        const desktop = queryByTestId("desktop-editor");

        expect(useMediaQuery).toHaveBeenCalledWith("(min-width: 880px)");
        expect(mobile).toBeInTheDocument();
        expect(desktop).toBeNull();
      });
    });

    test("Should render desktop version in large screen", () => {
      const { getByTestId, queryByTestId } = renderWithProviders(<Editor />);

      const desktop = getByTestId("desktop-editor");
      const mobile = queryByTestId("mobile-editor");

      expect(desktop).toBeInTheDocument();
      expect(mobile).toBeNull();
    });
  });
});

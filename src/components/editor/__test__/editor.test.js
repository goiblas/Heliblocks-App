import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import Editor from "../index";
import { AuthContext } from "./../../../services/auth";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@chakra-ui/core";
import theme from "./../../../theme";

// mock media query hook
import useMediaQuery from "react-use-media-query-hook";
jest.mock("react-use-media-query-hook");

useMediaQuery.mockImplementation(() => true); // default desktop version

// render component inside mock providers
const renderWithProviders = component => {
  const value = {
    isLoaded: true,
    user: {
      displayName: "John"
    }
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

  describe("OnSave", () => {
    test("should call with parametres", () => {
      const onSave = jest.fn();
      const { getByTestId } = renderWithProviders(
        <Editor onSave={onSave} hasUnsavedChanges={true} />
      );

      const button = getByTestId("save-button");
      fireEvent.click(button);

      const expected = {
        title: "Untitled",
        description: "",
        tags: [],
        theme: "twentynineteen",
        alignment: "normal",
        html: "",
        css: ""
      };
      expect(onSave).toHaveBeenCalledWith(expected);
    });
  });
});

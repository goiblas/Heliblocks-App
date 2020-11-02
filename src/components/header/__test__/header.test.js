import React from "react";
import { render } from "@testing-library/react";
import Header from "../index";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@chakra-ui/core";
import theme from "theme";
import { AuthContext } from "services/auth";

// mock media query hook
import { useMediaQuery } from "@react-hook/media-query";
jest.mock("@react-hook/media-query");

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

describe("Header", () => {
  test("Should render mobile version in small screen", () => {
    useMediaQuery.mockImplementationOnce(() => false);
    const { getByTestId, queryByTestId } = renderWithProviders(<Header />);

    const mobile = getByTestId("mobile-header");
    const desktop = queryByTestId("desktop-header");

    expect(useMediaQuery).toHaveBeenCalledWith("(min-width: 700px)");
    expect(mobile).toBeInTheDocument();
    expect(desktop).toBeNull();
  });

  test("Should render desktop version in large screen", () => {
    useMediaQuery.mockImplementation(() => true);
    const { getByTestId, queryByTestId } = renderWithProviders(<Header />);

    const desktop = getByTestId("desktop-header");
    const mobile = queryByTestId("mobile-header");

    expect(desktop).toBeInTheDocument();
    expect(mobile).toBeNull();
  });
});

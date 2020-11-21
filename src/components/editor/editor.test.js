import React from "react";
import { render, screen } from "@testing-library/react";
import Editor from ".";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@chakra-ui/core";
import theme from "theme";
import { AuthContext } from "services/auth";
import { useMediaQuery } from "@react-hook/media-query";
jest.mock("@react-hook/media-query");
jest.mock("./codeEditors/baseEditor.js");

const renderWithProviders = (component) => {
  const value = {
    isLoaded: true,
    user: {
      displayName: "John",
      uid: "1234",
      photoURL: "avatar.jpg",
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

describe("Editor", () => {
  it("should have all components", () => {
    useMediaQuery.mockImplementation(() => true);
    const onSave = jest.fn();
    const onPublish = jest.fn();
    renderWithProviders(<Editor onSave={onSave} onPublish={onPublish} />);

    const htmlEditor = screen.getByTestId("editor-html");
    const cssEditor = screen.getByTestId("editor-css");
    const iframe = screen.getByTitle("Preview");

    expect(htmlEditor).toBeInTheDocument();
    expect(cssEditor).toBeInTheDocument();
    expect(iframe).toBeInTheDocument();
  });
});

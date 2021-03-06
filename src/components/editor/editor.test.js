import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Editor from ".";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "theme";
import { AuthContext } from "services/auth";
import { useMediaQuery } from "@react-hook/media-query";

jest.mock("@react-hook/media-query");
jest.mock("./codeEditors/baseEditor.js");
jest.mock("./../preview");
jest.mock("hooks/useCanSaveRestrictedHeliblocks");

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
  it("should publish a heliblock", async () => {
    useMediaQuery.mockImplementation(() => true);
    const onPublish = jest.fn();
    renderWithProviders(<Editor onPublish={onPublish} />);

    const htmlEditor = screen.getByTestId("editor-html");
    const cssEditor = screen.getByTestId("editor-css");
    const preview = screen.getByTitle("Preview");

    userEvent.type(cssEditor, ".box {backgound: red}");
    userEvent.type(htmlEditor, "<div class='box'>hello world!</div>");

    await waitFor(() => expect(preview).toHaveTextContent(/hello world!/i));

    userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onPublish).toBeCalledWith({
      additionalLinks: expect.any(String),
      alignment: "normal",
      css: ".box {backgound: red}",
      description: "",
      draft: false,
      html: '<div class="box">hello world!</div>',
      restricted: false,
      tags: expect.any(Array),
      title: expect.any(String),
    });
  });
  it("should edit a heliblock", async () => {
    useMediaQuery.mockImplementation(() => true);

    const heliblock = {
      id: "1",
      title: "title",
      description: "",
      tags: [],
      alignment: "normal",
      html: "Hello world!",
      css: ".box {backgound: red}",
      additionalLinks: "",
      restricted: false,
      draft: false,
    };
    const onPublish = jest.fn();
    renderWithProviders(<Editor {...heliblock} onPublish={onPublish} />);

    const htmlEditor = screen.getByTestId("editor-html");
    const cssEditor = screen.getByTestId("editor-css");
    const preview = screen.getByTitle("Preview");

    expect(htmlEditor).toHaveTextContent(heliblock.html);
    expect(preview).toHaveTextContent("Hello world!");
    expect(cssEditor).toHaveTextContent(heliblock.css);

    userEvent.type(htmlEditor, " more...");

    await waitFor(() =>
      expect(preview).toHaveTextContent("Hello world! more...")
    );

    userEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onPublish).toBeCalledWith({
      additionalLinks: "",
      alignment: "normal",
      css: ".box {backgound: red}",
      description: "",
      draft: false,
      html: "Hello world! more...",
      restricted: false,
      tags: [],
      title: "title",
    });
  });
});

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { useMediaQuery } from "@react-hook/media-query";
jest.mock("@react-hook/media-query");

it("renders without crashing", () => {
  useMediaQuery.mockImplementationOnce(() => false);

  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import BookContainer from "../Containers/BookContainer";
import store from "./test-utils/mockStore";
import { Provider } from "react-redux";


let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Renders Container", async () => {
    act( () => {
        render(
        <Provider store={store}>
            <BookContainer/>
        </Provider>, container);
    });

    expect(container.querySelectorAll(".row").length).toBe(1);
});
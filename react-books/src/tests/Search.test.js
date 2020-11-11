import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Search from "../Components/Search";

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

const fakeFunction = () => {}

it("Renders Search", async () => {

    act( () => {
        render(
            <Search
            search={"How To Win Friends and Influence People"}
            handleSearch={fakeFunction}
            handleQueryChange={fakeFunction}
            handleAuthorChange={fakeFunction}
            handleLanguageChange={fakeFunction}
            handleFromDateChange={fakeFunction}
            handleToDateChange={fakeFunction} />, container);
    });

  expect(container.querySelectorAll("input").length).toBe(4);

});

it("Disables button when no search string", async () => {
    act( () => {
        render(
            <Search
            search={""}
            handleSearch={fakeFunction}
            handleQueryChange={fakeFunction}
            handleAuthorChange={fakeFunction}
            handleLanguageChange={fakeFunction}
            handleFromDateChange={fakeFunction}
            handleToDateChange={fakeFunction} />, container);
    });
    expect(container.querySelector("button").disabled ).toBeTruthy();
})
it("Enables button when search string passed", async () => {
    act( () => {
        render(
            <Search
            search={"How To Win Friends and Influence People"}
            handleSearch={fakeFunction}
            handleQueryChange={fakeFunction}
            handleAuthorChange={fakeFunction}
            handleLanguageChange={fakeFunction}
            handleFromDateChange={fakeFunction}
            handleToDateChange={fakeFunction} />, container);
    });
    expect(container.querySelector("button").disabled ).toBeFalsy();
})
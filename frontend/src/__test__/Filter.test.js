import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { mount } from "enzyme";
import Filter from "../components/Filter/Filter";

describe("Link component existing", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <Filter />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});

describe("Filter layout", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <Filter />
      </BrowserRouter>
    );
  });

  it("should have three buttons", () => {
    const button = wrapper.find(".filter-btn");
    expect(button).toHaveLength(3);
  });

  it("should have an 'Ajánló' button", () => {
    const button = wrapper.find(".filter-btn").at(0);
    expect(button.text()).toBe("Ajánló");
  });

  it("should have a 'Legjobb helyek' button", () => {
    const button = wrapper.find(".filter-btn").at(1);
    expect(button.text()).toBe("Legjobb helyek");
  });

  it("should have an 'Legújabb helyek' button", () => {
    const button = wrapper.find(".filter-btn").at(2);
    expect(button.text()).toBe("Legújabb helyek");
  });
});

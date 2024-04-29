import React from "react";
import { shallow } from "enzyme";
import NewestPins from "../components/NewestPins/NewestPins";

describe("NewestPins - layout", () => {
  let wrapper;
  const pins = [
    {
      _id: "12345678910",
      place: "Egri Vár",
      createdAt: "2021-06-30T10:46:13.171Z",
      rating: 4,
      desc: "Minden nagyon jó volt!",
    },
  ];

  beforeEach(() => {
    wrapper = shallow(<NewestPins pins={pins} />);
  });

  it("should have a title", () => {
    const h2Text = wrapper.find("h2");
    expect(h2Text.text()).toBe("Legújabb helyek");
  });

  it("should have a link button", () => {
    const text = wrapper.find(".back-btn");
    expect(text.text()).toBe("Vissza a főoldalra");
  });

  it("should show the place of pin", () => {
    const text = wrapper.find(".h3-pinPlace");
    expect(text.text()).toBe("Egri Vár");
  });

  it("should show text of h6", () => {
    const text = wrapper.find("p");
    expect(text.text()).toBe("Minden nagyon jó volt!");
  });
});

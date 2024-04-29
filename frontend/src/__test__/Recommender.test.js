import React from "react";
import { shallow } from "enzyme";
import Recommender from "../components/Recommender/Recommender";

describe("Recommender - layout", () => {
  let wrapper;
  const pins = [
    {
      username: "Kate",
      place: "Egri vár",
      desc: "Nagyon jó a hely!",
      rating: 4,
      lat: 75,
      long: 76,
      createDate: new Date(),
    },
  ];

  beforeEach(() => {
    wrapper = shallow(<Recommender pins={pins} />);
  });

  it("should have a title", () => {
    const text = wrapper.find("h2");
    expect(text.text()).toMatch("Ajánló");
  });

  it("should have text", () => {
    const text = wrapper.find("h3");
    expect(text.text()).toBe("Nézd meg a hozzád legközelebbi helyeket!");
  });

  it("should have button", () => {
    const label = wrapper.find(".location-btn");
    expect(label.text()).toBe("Keresd meg hol vagyok!");
  });
});

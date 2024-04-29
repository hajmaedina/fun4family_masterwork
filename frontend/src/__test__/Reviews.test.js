import React from "react";
import { shallow } from "enzyme";
import Reviews from "../components/Reviews/Reviews";

describe("Reviews - layout", () => {
  let wrapper;
  const reviews = [{ username: "Kate", review: "Nagyon jó az app!", _id: "749kif8hq87" }];

  beforeEach(() => {
    wrapper = shallow(<Reviews reviews={reviews} />);
  });

  it("should have an about text", () => {
    const text = wrapper.find(".carousel-item p.about");
    expect(text.text()).toMatch("Kimozdulnátok a hétvégén");
  });

  it("should have a review", () => {
    const text = wrapper.find("div.carousel-item p").at(1);
    expect(text.text()).toBe('"Nagyon jó az app!"');
  });

  it("should show the username of the review", () => {
    const text = wrapper.find("div.carousel-item p").at(2);
    expect(text.text()).toBe("Kate");
  });
});

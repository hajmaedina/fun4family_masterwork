import React from "react";
import { shallow, mount } from "enzyme";
import ContactUs from "../components/ContactUs/ContactUs";

describe("InputField component existing", () => {
  it("should have an InputField component", () => {
    const wrapper = shallow(<ContactUs />);
    expect(wrapper.find("InputField").exists()).toBeTruthy();
  });
});

describe("ContactUs Form - layout", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ContactUs />);
  });

  it("should have a title", () => {
    const familyText = wrapper.find("span.family");
    expect(familyText.text()).toBe("family");
  });

  it("should have form", () => {
    const form = wrapper.find("form");
    expect(form).toHaveLength(1);
  });

  it("should have three inputfield", () => {
    const input = wrapper.find("input");
    expect(input).toHaveLength(3);
  });

  it("should have button", () => {
    const label = wrapper.find("button");
    expect(label.text()).toBe("Elküldés");
  });
});

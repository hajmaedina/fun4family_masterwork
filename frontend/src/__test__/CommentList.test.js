import React from "react";
import { shallow } from "enzyme";
import CommentList from "../components/CommentList/CommentList";

describe("CommentList - layout", () => {
  let wrapper;
  const id = "749kif8hq87";
  const pinUsername = "Anna";

  beforeEach(() => {
    wrapper = shallow(<CommentList id={id} pinUsername={pinUsername} />);
  });

  it("should have a text", () => {
    const text = wrapper.find(".single-noComment");
    expect(text.text()).toMatch("Még nincsenek értékelések");
  });
});

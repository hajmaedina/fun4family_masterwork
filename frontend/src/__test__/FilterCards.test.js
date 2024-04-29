import React from "react";
import { shallow } from "enzyme";
import FilterCards from "../components/FilterCards/FilterCards";

describe("FilterCards - layout", () => {
  let wrapper;
  const filterByDistance = [
    {
      pin: {
        _id: "kld9a462ha",
        place: "Soltvadkert",
        desc: "Szuper hely!",
        rating: 4,
      },
      distance: "20",
    },
  ];
  const userAddress = "Kecskemét";
  beforeEach(() => {
    wrapper = shallow(
      <FilterCards
        filterByDistance={filterByDistance}
        userAddress={userAddress}
      />
    );
  });

  it("should have a h3 text", () => {
    const text = wrapper.find("h3.useraddress");
    expect(text.text()).toBe("Kecskemét");
  });

  it("should have a place", () => {
    const text = wrapper.find("h3.h3-pinPlace");
    expect(text.text()).toBe("Soltvadkert");
  });

  it("should show the distance", () => {
    const text = wrapper.find(".h5-pinDistance");
    expect(text.text()).toBe("Távolság tőled: 20 km");
  });
});

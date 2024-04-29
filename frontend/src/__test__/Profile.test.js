import React from "react";
import { render } from "../test-utils";
import Profile from "../components/Profile/Profile";

test("renders without error", () => {
  render(<Profile />);
});

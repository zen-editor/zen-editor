import { ToggleMember } from "../utilities/toggle-member";
import { HamburgerPages } from "./pages";
import { HamburgerIcon } from "./icon";

import "./hamburger.css";

export class Hamburgur extends ToggleMember<HamburgerPages> {
  // protected isOpen: boolean = false;

  constructor() {
    super(new HamburgerIcon(), new HamburgerPages());
  }
}

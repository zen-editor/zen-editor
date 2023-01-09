import { App } from "../app";
import { Icon } from "../utilities/icon";
import hamburger from "../svgs/hamburger.svg?raw";

export class HamburgerIcon extends Icon {
  constructor() {
    super("hamburger", hamburger);
  }

  protected onClick() {
    App.TM.hamburger.togglePages();
  }
}

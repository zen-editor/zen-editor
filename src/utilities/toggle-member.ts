import { App } from "../app";
import { Icon } from "./icon";
import { Pages } from "./pages";

export class ToggleMember<T extends Pages> {
  icon: Icon;
  pages: T;

  constructor(icon: Icon, pages: T) {
    this.icon = icon;
    this.pages = pages;
  }
  public togglePages() {
    App.toggle?.openOrClosePages(this.icon.id, this.pages);
  }
}

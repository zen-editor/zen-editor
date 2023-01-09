import { App } from "../app";
import { Icon } from "../utilities/icon";
import tabs from "../svgs/tabs.svg?raw";

export class TabsIcon extends Icon {
  constructor() {
    super("tabs", tabs);
  }

  protected onClick() {
    App.TM.tabs.togglePages();
  }
}

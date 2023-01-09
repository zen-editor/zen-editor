import { Component } from "../utilities/component";
import { Icon } from "../utilities/icon";

export class Tray extends Component<"div"> {
  constructor() {
    super("div", "tray");
  }

  public appendChild<T extends Icon>(child: T) {
    child.render(this.getHtml());
  }
}

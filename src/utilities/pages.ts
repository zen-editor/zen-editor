import { App } from "../app";
import { Component } from "./component";

export class Pages extends Component<"div"> {
  constructor() {
    super("div", "pages");
  }

  protected pushPage(page: Component<"div">) {
    if (!this.getChild(0)) {
      page.render(this.getHtml());
    } else {
      if (!this.getChild(1))
        this.getChild(0)?.setStyle("width", `${this.width}px`);
      let r = this.width;

      page.setStyle("width", `${App.toggle?.width}px`);

      this.setStyle("width", `${this.width + App.toggle!.width}px`);
      page.render(this.getHtml());
      this.setStyle("height", `${page.height}px`);

      this.getHtml().animate(
        [
          {
            right: `${r - App.toggle!.width}px`,
          },
          {
            right: `${this.width - App.toggle!.width}px`,
          },
        ],
        {
          duration: App.duration,
          iterations: 1,
          easing: "ease",
          fill: "forwards",
        }
      );
      App.toggle!.toggleHeightToPage(this);
    }
  }

  public popPage() {
    if (!this.getChild(0)) {
      this.removeLastChild();
    } else {
      let r = this.width;
      this.removeLastChild();
      this.setStyle("width", `${r - App.toggle!.width}px`);
      this.setStyle("height", `${this.getLastChild().height}px`);

      this.getHtml().animate(
        [
          {
            right: `${r - App.toggle!.width}px`,
          },
          {
            right: `${this.width - App.toggle!.width}px`,
          },
        ],
        {
          duration: App.duration,
          iterations: 1,
          easing: "ease",
          fill: "forwards",
        }
      );

      App.toggle!.toggleHeightToPage(this);
    }
  }
}

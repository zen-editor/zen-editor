import { Component } from "../utilities/component";
import { Pages } from "../utilities/pages";
import { Tray } from "./tray";
import "./toggle.css";

import { ToggleMember } from "../utilities/toggle-member";
import { App } from "../app";

export class Toggle extends Component<"div"> {
  private isopen: boolean = false;
  private ismouseover: boolean = false;
  private currentpage?: string;
  private tray: Tray;

  constructor() {
    super("div", "toggle");
    this.tray = new Tray();

    this.createIcon(App.TM!.tabs);

    this.createIcon(App.TM!.files!);

    this.createIcon(App.TM!.hamburger);

    this.tray.render(this.getHtml());
  }

  private createIcon(tm: ToggleMember<any>) {
    let icon = tm.icon;

    this.tray.appendChild(icon);
  }

  private changeToggleHeight(height: number, initial: number) {
    if (height > 400) this.setStyle("overflowY", "scroll");
    else this.setStyle("overflowY", "hidden");
    this.getHtml().animate(
      [
        {
          height: `${initial}px`,
        },
        {
          height: `${height}px`,
        },
      ],
      {
        duration: App.duration,
        iterations: 1,
        easing: "ease",
        fill: "forwards",
      }
    );
  }

  protected onMouseOver() {
    this.ismouseover = true;
    this.open();
  }

  protected onMouseLeave() {
    this.ismouseover = false;
    this.close();
  }

  public open() {
    if (!this.isopen) {
      this.toggleOpen();
    }
  }

  private toggleClose() {
    this.getHtml().animate(
      [
        {
          top: `-2px`,
        },
        {
          top: `-30px`,
        },
      ],
      {
        duration: App.duration,
        iterations: 1,
        easing: "ease",
        fill: "forwards",
      }
    );

    this.isopen = false;
  }

  private toggleOpen() {
    this.getHtml().animate(
      [
        {
          top: `-30px`,
        },
        {
          top: `-2px`,
        },
      ],
      {
        duration: App.duration,
        iterations: 1,
        easing: "ease",
        fill: "forwards",
      }
    );
    this.isopen = true;
  }

  public close() {
    if (this.isopen) {
      this.hidePages();
      this.toggleClose();
    }
  }

  public openOrClose() {
    if (this.isopen) this.close();
    else this.open();
  }

  public toggleHeightToPage<T extends Pages>(pages: T) {
    this.changeToggleHeight(this.tray.height + pages.height, this.height);
  }

  public showPages<T extends Pages>(id: string, pages: T) {
    this.open();

    let initial_height = this.height;

    if (this.getChild(1)) this.removeLastChild();

    pages.render(this.getHtml());

    this.changeToggleHeight(this.tray.height + pages.height, initial_height);
    this.getHtml().onmouseleave = () => {};

    if (this.currentpage) {
      App.TM![this.currentpage]!.icon.icon.style["backgroundColor"] = "";
    }

    App.TM![id]!.icon.icon.style["backgroundColor"] =
      " var(--primary-hover-color)";

    this.currentpage = id;
  }

  public hidePages() {
    if (!this.ismouseover) {
      this.toggleClose();
    }
    if (this.getChild(1)) {
      this.getHtml().onmouseleave = this.onMouseLeave.bind(this);
      this.changeToggleHeight(this.tray.height, this.height);
    }
    this.getHtml().onmouseleave = this.onMouseLeave.bind(this);
    if (this.currentpage) {
      App.TM![this.currentpage]!.icon.icon.style["backgroundColor"] = "";
    }
    this.currentpage = undefined;
  }

  public openOrClosePages<T extends Pages>(id: string, pages: T) {
    if (this.currentpage !== id) {
      this.showPages(id, pages);
    } else {
      this.hidePages();
    }
  }
}

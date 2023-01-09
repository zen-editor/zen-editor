import { App } from "../app";
import { EmptyTab } from "../emptytab/emptytab";
import { Component } from "../utilities/component";
import { Button, Div } from "../utilities/element";
import { Pages } from "../utilities/pages";
import addButton from "../svgs/add.svg?raw";
import cross from "../svgs/cross.svg?raw";

class RemButtom extends Component<"button"> {
  constructor(private pos: number) {
    super("button", "rembutton");
    this.getHtml().innerHTML = cross;
  }

  protected onClick() {
    App.TM.tabs.remTab(this.pos);
  }
}
class PageLi extends Component<"div"> {
  private remTab;

  constructor(private id: string, public pos: number) {
    super("div", "page_li");
    this.remTab = new RemButtom(pos);

    let li = Button(
      "libutton",
      {
        onClick: () => App.TM.tabs.openTab(this.pos),
      },
      id + " " + pos
    );
    li.render(this.getHtml());
  }

  protected onMouseOver() {
    this.remTab.render(this.getHtml(), this.getHtml().getBoundingClientRect());
  }

  protected onMouseLeave() {
    this.removeLastChild();
  }

  public render(node: Element) {
    node.appendChild(this.getHtml());
    App.toggle.toggleHeightToPage(App.TM.tabs.pages!);
    this.getHtml().animate([{ opacity: 0.0 }, { opacity: 1.0 }], {
      duration: App.duration,
      iterations: 1,
      easing: "ease",
      fill: "forwards",
    });

    return this;
  }
  public rem() {
    let ani = this.getHtml().animate([{ opacity: 1.0 }, { opacity: 0.0 }], {
      duration: App.duration,
      iterations: 1,
      easing: "ease",
      fill: "forwards",
    });
    ani.onfinish = () => {
      this.getHtml().remove();
      App.toggle.toggleHeightToPage(App.TM.tabs.pages);
    };
  }
}

class TabPage extends Component<"div"> {
  tabs: Record<number, PageLi> = {};
  tabslocal: Array<number> = [];

  constructor() {
    super("div", "page_content");
  }

  listTab(id: string, pos: number) {
    let pageli = new PageLi(id, pos);

    pageli.render(this.getHtml());
    this.tabs[pos] = pageli;
    this.tabslocal.push(pos);
  }
  removeLastTab() {
    this.removeLastChild();

    delete this.tabs[this.tabslocal.pop()!];
  }

  remTab(pos: number) {
    this.tabs[pos].rem();
    delete this.tabs[pos];
    let index = this.tabslocal.findIndex((value) => {
      if (value === pos) return true;
      else return false;
    });
    this.tabslocal.splice(index, 1);
  }

  prevTabPos(pos: number): number {
    let index = this.tabslocal.findIndex((value) => {
      if (value === pos) return true;
      else return false;
    });

    return this.tabs[this.tabslocal[index - 1]].pos;
  }

  furtTabPos(pos: number): number {
    let index = this.tabslocal.findIndex((value) => {
      if (value === pos) return true;
      else return false;
    });

    return this.tabs[this.tabslocal[index + 1]].pos;
  }

  tabLocalPos(pos: number) {
    return this.tabslocal.findIndex((value) => {
      if (value === pos) return true;
      else return false;
    });
  }
}

export class TabsPages extends Pages {
  public page = new TabPage();

  constructor() {
    super();

    this.pushPage(
      Div("page", {}, [
        Div("tabs_nav", {}, [
          Button(
            "back_button",
            {
              onClick: () => {
                App.TM.tabs.addTab("empty-tab", new EmptyTab());
              },
            },
            addButton
          ),
          Div("back_button", {}, "close saved"),
        ]),

        this.page,
      ])
    );
  }
}

import { Component } from "../utilities/component";
import { ToggleMember } from "../utilities/toggle-member";
import { TabsIcon } from "./icon";
import { Tab } from "./tab";
import "./tabs.css";
import { App } from "../app";
import { EmptyTab } from "../emptytab/emptytab";
import { TabsPages } from "./page";

class TabsView extends Component<"div"> {
  constructor() {
    super("div", "tabs_view");
  }

  public view(component: Component<"div">) {
    if (this.getChild(0)) {
      this.removeLastChild();
    }
    component.render(this.getHtml());
  }
}

export class Tabs extends ToggleMember<TabsPages> {
  private tabs: Record<number, { id: string; tab: Tab }> = {};

  private counter: number = 0;
  private tempTab: boolean = false;
  private tabview: TabsView;
  private prevTab?: number;
  private currentTab?: number;

  constructor() {
    super(new TabsIcon(), new TabsPages());
    this.tabview = new TabsView();
    App.show(this.tabview);
  }

  public addTab(id: string, content: Component<"div">) {
    this.remTempTab();
    let newTab = new Tab(content);

    this.tabview.view(newTab);

    this.tabs[this.counter] = { id: id, tab: newTab };

    if (this.currentTab) this.prevTab = this.currentTab;
    this.currentTab = this.counter;

    this.pages.page.listTab(id, this.counter);
    this.counter = this.counter + 1;
  }

  private remTempTab() {
    if (this.tempTab) {
      this.tempTab = false;
      delete this.tabs[this.counter - 1];
      this.pages.page.removeLastTab();
    }
  }

  public openTab(index: number) {
    this.remTempTab();
    this.tabview.view(this.tabs[index].tab);
    this.prevTab = this.currentTab;
    this.currentTab = index;
  }
  public openTempTab(id: string, content: Component<"div">) {
    this.addTab(id, content);
    this.tempTab = true;
  }

  public remTab(pos: number) {
    let tab = this.tabs[pos];
    tab.tab.removeSelf();
    delete this.tabs[pos];

    if (Object.keys(this.tabs).length === 0) {
      App.TM.tabs.openTempTab("empty-tab", new EmptyTab());
    } else {
      if (this.currentTab === pos) {
        if (this.pages.page.tabLocalPos(pos) != 0) {
          this.openTab(this.pages.page.prevTabPos(pos));
        } else {
          this.openTab(this.pages.page.furtTabPos(pos));
        }
      }
    }

    this.pages.page.remTab(pos);
  }
}

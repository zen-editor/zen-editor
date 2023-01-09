import { Toggle } from "./toggle/toggle";
import { Component } from "./utilities/component";
import { Tabs } from "./tabs/tabs";
import "./base.css";
import { EmptyTab } from "./emptytab/emptytab";
import { Hamburgur } from "./hamburger/hamburger";
import { Files } from "./files/files";
import { ToggleMember } from "./utilities/toggle-member";
import { Editor } from "./editor/editor";
import { Pages } from "./utilities/pages";

interface DefaultTM {
  hamburger: Hamburgur;
  files: Files;
  tabs: Tabs;
  [id: string]: ToggleMember<Pages>;
}

class AppC extends Component<"div"> {
  public toggle!: Toggle;
  public TM!: DefaultTM;
  // public editor: Editor = new Editor();
  public duration = 50; //milliseconds;

  constructor() {
    super("div", "app");
  }

  public initialize() {
    this.TM = {
      hamburger: new Hamburgur(),
      tabs: new Tabs(),
      files: new Files(),
    };
    this.toggle = new Toggle();
    this.toggle.render(this.getHtml());
    return this;
  }

  public show(component: Component<any>) {
    component.render(this.getHtml());
  }
}

export const App = new AppC();
App.initialize();

App.TM.tabs.openTempTab("empty-tab", new EmptyTab());

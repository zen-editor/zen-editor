import { App } from "../app";
import { Component } from "../utilities/component";
import { Button, Div, Ele } from "../utilities/element";
import "./emptytab.css";

export class EmptyTab extends Component<"div"> {
  constructor() {
    super("div", "emptytab");
    Div("display", {}, [
      Div("iconic", {}, [
        Div("logo", {}, []),
        Div("iconicrow", {}, [
          Ele("p", { className: "version" }, "version: devel 0.1"),
          Button("bigbutton", {}, "Click For Update"),
        ]),
      ]),
      Button(
        "bigbutton",
        {
          onClick: () => App.TM?.files.openFile(),
        },
        "Open File"
      ),
      Button("bigbutton", {}, "Open Folder"),
      Button("bigbutton", {}, "Documentation"),
    ]).render(this.getHtml());
  }
}

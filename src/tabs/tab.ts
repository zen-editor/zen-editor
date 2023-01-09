import { Component } from "../utilities/component";
import { App } from "../app";
export class Tab extends Component<"div"> {
  constructor(content: Component<"div">) {
    super("div", "tab");
    content.render(this.getHtml());
    this.getHtml().onclick = () => {
      App.toggle?.close();
    };
  }

  public removeSelf() {
    this.getHtml().remove();
  }

  // public viewAgain(){
  //   this
  // }
}

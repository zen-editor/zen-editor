import { App } from "../app";
import { Component } from "./component";

export class Icon extends Component<"div"> {
  icon: SVGSVGElement;
  id: string;

  private animation = () => {
    this.icon.animate(
      [
        {
          height: "12px",
          padding: "12px",
          width: "13px",
        },
      ],
      {
        duration: App.duration,
        iterations: 1,
        easing: "ease",
        fill: "none",
      }
    );
  };

  constructor(id: string, svg: string) {
    super("div");
    this.icon = this.createIcon(svg, "toggleIcon");
    this.id = id;
    this.icon.onclick = () => {
      this.animation();

      this.onClick();
    };
  }

  private createIcon(svg: string, className: string) {
    const svgDiv = this.getHtml();
    svgDiv.innerHTML = svg;
    const svgElement = svgDiv.getElementsByTagName("svg")[0];
    svgElement.classList.add("toggleIcons");
    return svgElement;
  }

  public render(node: Element): this {
    node.appendChild(this.icon);
    return this;
  }
}

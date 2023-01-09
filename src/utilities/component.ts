export class Component<T extends keyof HTMLElementTagNameMap> {
  private html: HTMLElementTagNameMap[T];

  constructor(elementName: T, className?: string) {
    this.html = document.createElement(elementName);
    if (className) this.html.className = className;
    this.setEvents();
  }

  protected setStyle<K extends keyof CSSStyleDeclaration>(
    key: K,
    style: CSSStyleDeclaration[K]
  ) {
    this.html.style[key] = style;
    this;
  }

  protected getHtml() {
    return this.html;
  }

  public render(node: Element, _additional?: unknown) {
    node.appendChild(this.html);
    return this;
  }

  protected removeLastChild() {
    let node = this.html.childNodes[this.html.childNodes.length - 1];

    if (node) this.html.removeChild(node);
  }

  protected getLastChild() {
    let child = this.html.childNodes[this.html.childNodes.length - 1];
    class Child extends Component<"div"> {
      pageheight(_pageheight: any, _height: number) {
        throw new Error("Method not implemented.");
      }
      private html = child;
      constructor() {
        super("div");
      }
    }
    return new Child();
  }

  protected getChild(index: number) {
    if (index > this.html.childNodes.length - 1) return undefined;
    let child = this.html.childNodes[index];
    class Child extends Component<"div"> {
      private html = child;
      constructor() {
        super("div");
      }
      public removeSelf() {
        this.getHtml().remove();
      }
    }
    return new Child();
  }

  public getStyle<T extends keyof CSSStyleDeclaration>(stylename: T) {
    return window.getComputedStyle(this.html)[stylename];
  }

  public init() {
    this.setEvents();
    this;
  }

  get height() {
    return parseInt(this.getStyle("height"));
  }

  get width() {
    return parseInt(this.getStyle("width"));
  }

  get right() {
    return parseInt(this.getStyle("right"));
  }

  private setEvents() {
    this.html.onmouseleave = this.onMouseLeave.bind(this);
    this.html.onmouseover = this.onMouseOver.bind(this);
    this.html.onclick = this.onClick.bind(this);
  }

  protected onMouseOver() {}
  protected onMouseLeave() {}
  protected onClick() {}
}

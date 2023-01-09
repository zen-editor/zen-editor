import { Component } from "./component";

interface Property {
  className?: string;
  onClick?: () => void;
  animation?: {
    keyframe: Keyframe[];
    option: KeyframeAnimationOptions;
  };
}

export const Button = (
  className: string,
  properties: Property,
  value: Array<Component<keyof HTMLElementTagNameMap>> | string
) => {
  return Ele("button", { className: className, ...properties }, value);
};

export const Div = (
  className: string,
  properties: Property,
  value: Array<Component<keyof HTMLElementTagNameMap>> | string
) => {
  return Ele("div", { className: className, ...properties }, value);
};

export const Ele = <T extends keyof HTMLElementTagNameMap>(
  type: T,
  properties: Property,
  value: Array<Component<keyof HTMLElementTagNameMap>> | string
): Component<T> => {
  class Element extends Component<T> {
    constructor() {
      super(type, properties.className);
      if (Array.isArray(value)) {
        value.forEach((val) => {
          val.render(this.getHtml());
        });
      } else {
        this.getHtml().innerHTML = value;
      }

      if (properties.onClick) this.getHtml().onclick = properties.onClick;
      if (properties.animation)
        this.getHtml().animate(
          properties.animation.keyframe,
          properties.animation.option
        );
    }
  }

  return new Element();
};

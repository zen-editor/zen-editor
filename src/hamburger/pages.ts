import { Button, Div, Ele } from "../utilities/element";
import { Pages } from "../utilities/pages";
import backarrow from "../svgs/backarrow.svg?raw";
export class HamburgerPages extends Pages {
  constructor() {
    super();
    this.pushPage(
      Ele("div", { className: "page" }, [
        Div("page_content", {}, [
          Button("page_button", {}, "about"),
          Button("page_button", {}, "themes"),
          Button("page_button", {}, "help"),
          Button(
            "page_button",
            {
              onClick: () =>
                this.pushPage(
                  Ele("div", { className: "page" }, [
                    Div("page_content", {}, [
                      Ele(
                        "button",
                        {
                          onClick: () => {
                            this.popPage();
                          },
                          className: "back_button",
                        },
                        backarrow
                      ),
                      Button("page_button", {}, "into more"),
                    ]),
                  ])
                ),
            },
            "more"
          ),
        ]),
      ])
    );
  }
}

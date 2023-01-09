import { ToggleMember } from "../utilities/toggle-member";
import { FilesIcon } from "./icon";
import { Pages } from "../utilities/pages";
import { Button, Div } from "../utilities/element";
import { dialog, fs } from "@tauri-apps/api";
import { App } from "../app";
import { Editor } from "../editor/editor";

export class FilesPages extends Pages {
  constructor() {
    super();
    this.defaultPage();
  }

  defaultPage() {
    this.pushPage(
      Div("page", {}, [
        Div("page_content", {}, [
          Button(
            "page_button",
            {
              onClick: () => App.TM!.files.openFile(),
            },
            "open file"
          ),
          Button("page_button", {}, "open folder"),
        ]),
      ])
    );
  }
}
export class Files extends ToggleMember<FilesPages> {
  folder: string | undefined;

  constructor() {
    super(new FilesIcon(), new FilesPages());
  }

  openFile = async () => {
    const filename = (await dialog.open({ directory: false })) as string;
    new Editor().content(filename, await fs.readTextFile(filename));
  };
}

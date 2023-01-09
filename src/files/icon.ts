import { App } from "../app";
import { Icon } from "../utilities/icon";
import files from "../svgs/files.svg?raw";

export class FilesIcon extends Icon {
  constructor() {
    super("files", files);
  }

  protected onClick() {
    App.TM?.files.togglePages();
  }
}

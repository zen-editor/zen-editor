import { EditorView, basicSetup } from "codemirror";
import { EditorState, Text } from "@codemirror/state";
import { Component } from "../utilities/component";

import "./codemirror.css";

import { App } from "../app";

export class Editor extends Component<"div"> {
  private editorView: EditorView;
  private editorState: EditorState;

  constructor() {
    super("div", "editorDiv");
  }

  public content(path: string, text: string) {
    App.TM?.tabs.addTab(path, this);

    let editor_state = EditorState.create({
      doc: Text.of(text.split("\n")),
      extensions: [basicSetup],
    });

    this.editorView = new EditorView({
      state: editor_state,
      parent: this.getHtml(),
    });
  }
}

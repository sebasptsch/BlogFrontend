/// <reference types="vite/client" />
// TypeScript users only add this code
import { BaseEditor, BaseElement, BaseNode, Descendant } from "slate";
import { ReactEditor, RenderLeafProps } from "slate-react";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: BaseElement & {
      type: string;
    };
    Node: BaseNode & {
      type: string;
    };
    Text: {
      type: string;
      bold?: boolean;
      code?: boolean;
      italic?: boolean;
      underline?: boolean;
      kbd: boolean;
    };
  }
}

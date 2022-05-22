/// <reference types="vite/client" />
// TypeScript users only add this code
import { BaseEditor, BaseElement, BaseNode, Descendant } from "slate";
import { ReactEditor, RenderLeafProps } from "slate-react";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element:
      | (BaseElement & {
          type: string;
        })
      | ImageElement;
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

export type ImageElement = {
  type: "image";
  url: string;
  children: EmptyText[];
};
export type EmptyText = {
  text: string;
};

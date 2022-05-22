import { BaseEditor, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const withImages = (editor: BaseEditor & ReactEditor) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split("/");

        if (mime === "image") {
          reader.addEventListener("load", () => {
            const url = reader.result;
            insertImage(editor, url as string);
          });

          reader.readAsDataURL(file);
        }
      }
    } else if (true) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};
export const insertImage = (editor: BaseEditor & ReactEditor, url: string) => {
  const text = { text: "" };
  const image: ImageElement = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

export type ImageElement = {
  type: "image";
  url: string;
  children: EmptyText[];
};
export type EmptyText = {
  text: string;
};

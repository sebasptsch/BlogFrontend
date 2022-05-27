import { Box } from "@chakra-ui/react";
import isHotkey from "is-hotkey";
import React, { useCallback, useMemo } from "react";
import { BaseEditor, createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import { Element, Leaf, toggleMark, Toolbar } from "./RichTextComponents";
import withHtml from "./withHtml";
import { withImages } from "./withImages";
import { withShortcuts } from "./withShortcuts";
import { withTables } from "./withTables";

// @refresh reset
const HOTKEYS: { [hotkey: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

export interface RichTextBlockProps {}

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

const exampleValue = [
  {
    type: "paragraph",
    children: [
      { text: "This is editable " },
      { text: "rich", bold: true },
      { text: " text, " },
      { text: "much", italic: true },
      { text: " better than a " },
      { text: "<textarea>", code: true },
      { text: "!" },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: "bold", bold: true },
      {
        text: ", or add a semantically rendered block quote in the middle of the page, like this:",
      },
    ],
  },
  {
    type: "block-quote",
    children: [{ text: "A wise quote." }],
  },
  {
    type: "paragraph",
    children: [{ text: "Try it out for yourself!" }],
  },
];

interface Props {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
}

export const RichTextBlock: React.FC<RichTextBlockProps & Props> = ({
  onChange,
  value,
}: Props) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  // const [value, setValue] = useState<Descendant[]>(exampleValue);

  const editor: BaseEditor & ReactEditor = useMemo(
    () =>
      withHtml(
        withImages(
          withTables(withShortcuts(withHistory(withReact(createEditor()))))
        )
      ),
    []
  );

  const savedSelection = React.useRef(editor.selection);

  const divRef = React.useRef<HTMLDivElement>(null);

  const focusEditor = React.useCallback(
    (e: React.MouseEvent) => {
      if (e.target === divRef.current) {
        ReactEditor.focus(editor);
        e.preventDefault();
      }
    },
    [editor]
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    for (const hotkey in HOTKEYS) {
      if (isHotkey(hotkey, event as any)) {
        event.preventDefault();
        const mark = HOTKEYS[hotkey];
        toggleMark(editor, mark);
      }
    }
  };

  return (
    <Box
      ref={divRef}
      onMouseDown={focusEditor}
      borderWidth={"1px"}
      borderRadius={"7"}
    >
      <Slate editor={editor} value={value} onChange={onChange}>
        <Toolbar editor={editor} />
        <Box padding={"15px 5px"}>
          <Editable
            onKeyDown={onKeyDown}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            spellCheck
            autoFocus
            style={{ minHeight: "150px", resize: "vertical", overflow: "auto" }}
          />
        </Box>
      </Slate>
    </Box>
  );
};

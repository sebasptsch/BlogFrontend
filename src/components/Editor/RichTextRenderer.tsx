import { useCallback, useMemo } from "react";
import { createEditor, Descendant } from "slate";
import {
  Editable,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import { Element, Leaf } from "./RichTextComponents";
import { withShortcuts } from "./withShortcuts";
import { withTables } from "./withTables";

interface Props {
  content: Descendant[];
}

const RichTextRenderer: React.FC<Props> = ({ content }: Props) => {
  const editor = useMemo(
    () => withShortcuts(withTables(withReact(createEditor()))),
    []
  );
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  return (
    <Slate editor={editor} value={content}>
      <Editable
        readOnly
        renderElement={renderElement}
        renderLeaf={renderLeaf}
      />
    </Slate>
  );
};

export default RichTextRenderer;

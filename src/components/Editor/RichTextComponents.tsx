import {
  chakra,
  Heading,
  HStack,
  IconButton,
  Kbd,
  ListItem,
  OrderedList,
  Table,
  Tbody,
  Td,
  Tr,
  UnorderedList,
  useColorMode,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import {
  MdCode,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatQuote,
  MdFormatUnderlined,
  MdKeyboard,
  MdLooks3,
  MdLooks4,
  MdLooks5,
  MdLooks6,
  MdLooksOne,
  MdLooksTwo,
} from "react-icons/md";
import {
  BaseEditor,
  BaseElement,
  Editor,
  Element as SlateElement,
  Transforms,
} from "slate";
import {
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  useSlate,
} from "slate-react";

type EditorProps = BaseEditor & ReactEditor;
const LIST_TYPES = ["numbered-list", "bulleted-list"];

const isBlockActive = (editor: EditorProps, format: string) => {
  const nodeGen = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  let node = nodeGen.next();
  while (!node.done) {
    return true;
  }
  return false;
};

const isMarkActive = (editor: EditorProps, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const toggleBlock = (editor: EditorProps, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (
      n: BaseElement & {
        type: string;
      }
    ) =>
      LIST_TYPES.includes(
        (!Editor.isEditor(n) && SlateElement.isElement(n) && n.type) as string
      ),
    split: true,
  });
  const newProperties: Partial<
    SlateElement & {
      type: string;
    }
  > = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleMark = (editor: EditorProps, format: string) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const MarkButton = ({
  format,
  icon,
}: {
  format: string;
  icon: ReactElement;
}) => {
  const editor = useSlate();
  return (
    <IconButton
      variant="outline"
      colorScheme="blue"
      isActive={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      aria-label={format}
      icon={icon}
      borderWidth={0}
      fontSize={"20px"}
    />
  );
};

export const BlockButton = ({
  format,
  icon,
}: {
  format: string;
  icon: ReactElement;
}) => {
  const editor = useSlate();
  return (
    <IconButton
      variant="outline"
      colorScheme="blue"
      isActive={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      aria-label={format}
      icon={icon}
      borderWidth={0}
      fontSize={"20px"}
    />
  );
};

export const Toolbar = () => {
  return (
    <HStack
      borderWidth={"0 0 1px 0"}
      padding={"10px 5px"}
      spacing={"5px"}
      wrap={"wrap"}
    >
      <MarkButton format="bold" icon={<MdFormatBold />} />
      <MarkButton format="italic" icon={<MdFormatItalic />} />
      <MarkButton format="underline" icon={<MdFormatUnderlined />} />
      <MarkButton format="code" icon={<MdCode />} />
      <MarkButton format="kbd" icon={<MdKeyboard />} />
      <BlockButton format="heading-one" icon={<MdLooksOne />} />
      <BlockButton format="heading-two" icon={<MdLooksTwo />} />
      <BlockButton format="heading-three" icon={<MdLooks3 />} />
      <BlockButton format="heading-four" icon={<MdLooks4 />} />
      <BlockButton format="heading-five" icon={<MdLooks5 />} />
      <BlockButton format="heading-six" icon={<MdLooks6 />} />
      <BlockButton format="block-quote" icon={<MdFormatQuote />} />
      <BlockButton format="numbered-list" icon={<MdFormatListNumbered />} />
      <BlockButton format="bulleted-list" icon={<MdFormatListBulleted />} />
    </HStack>
  );
};

const BlockquoteStyle: React.CSSProperties | undefined = {
  margin: "1.5em 10px",
  padding: "0.5em 10px",
};

export const Element = ({
  attributes,
  children,
  element,
}: RenderElementProps & {
  element: {
    type: string;
  };
}) => {
  switch (element.type) {
    case "table":
      return (
        <Table>
          <Tbody {...attributes}>{children}</Tbody>
        </Table>
      );
    case "table-row":
      return <Tr {...attributes}>{children}</Tr>;
    case "table-cell":
      return <Td {...attributes}>{children}</Td>;
    case "block-quote":
      return (
        <chakra.blockquote
          style={BlockquoteStyle}
          borderLeftWidth={"10px"}
          borderLeftColor={"gray.200"}
          {...attributes}
        >
          {children}
        </chakra.blockquote>
      );
    case "list-item":
      return <ListItem {...attributes}>{children}</ListItem>;
    case "numbered-list":
      return <OrderedList {...attributes}>{children}</OrderedList>;
    case "bulleted-list":
      return <UnorderedList {...attributes}>{children}</UnorderedList>;
    case "heading-one":
      return (
        <Heading as="h1" size="3xl" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-two":
      return (
        <Heading as="h2" size="2xl" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-three":
      return (
        <Heading as="h3" size="lg" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-four":
      return (
        <Heading as="h4" size="md" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-five":
      return (
        <Heading as="h5" size="sm" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-six":
      return (
        <Heading as="h6" size="xs" {...attributes}>
          {children}
        </Heading>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <chakra.code
        padding={"3px"}
        backgroundColor={colorMode === "dark" ? "gray.700" : "gray.200"}
        fontSize={"90%"}
      >
        {children}
      </chakra.code>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.kbd) {
    children = <Kbd>{children}</Kbd>;
  }

  return <span {...attributes}>{children}</span>;
};

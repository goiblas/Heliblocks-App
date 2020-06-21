import React, { useContext } from "react";
import { Editable, EditablePreview, EditableInput } from "@chakra-ui/core";
import { EditorContext } from "../editorContext";

const Title = props => {
  const { title, setState } = useContext(EditorContext);
  const onChange = newTitle => {
    setState({ title: newTitle });
  };
  return (
    <Editable
      w={110}
      maxW={520}
      mx={[2, 10]}
      flexGrow="1"
      placeholder="Add title"
      onSubmit={onChange}
      defaultValue={title}
      data-testid="editor-title"
      textAlign="center"
      {...props}
    >
      <EditablePreview
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        display="block"
      />
      <EditableInput />
    </Editable>
  );
};

export default Title;

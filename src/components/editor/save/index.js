import React, { useContext } from "react";
import { ProtectedButton } from "./../../menus";
import { EditorContext } from "./../editorContext"

const Save = ( props ) => {
    const { save, hasUnsavedChanges } = useContext(EditorContext);
    const disabled = !hasUnsavedChanges;
    
    const buttonProps = {
        variantColor: "blue",
        fontWeight: "normal",
        leftIcon: "cloud",
        size: "md",
        ...props
      };

    return (
        <ProtectedButton
            {...buttonProps}
            onClick={save}
            disabled={disabled}
            >
            {"Save"}
        </ProtectedButton>
    )
}

export default Save;
  
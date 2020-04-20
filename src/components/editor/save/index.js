import React, { useContext } from "react";
import { ProtectedButton } from "./../../menus";
import { EditorContext } from "./../editorContext"

const Save = ( props ) => {
    const { save, hasUnsavedChanges, saving } = useContext(EditorContext);
    const disabled = !hasUnsavedChanges;
    
    const buttonProps = {
        variantColor: "blue",
        fontWeight: "normal",
        leftIcon: "cloud",
        size: "md",
        loadingText: "Saving",
        ...props
      };

    return (
        <ProtectedButton
            {...buttonProps}
            onClick={save}
            disabled={disabled}
            data-testid="save-button"
            isLoading={saving}
            >
            {"Save"}
        </ProtectedButton>
    )
}

export default Save;
  
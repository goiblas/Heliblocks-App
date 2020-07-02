import React, { useEffect, useContext } from "react";
import { ProtectedButton } from "components/menus";
import { EditorContext } from "./../editorContext";
import { AuthContext } from "services/auth";

const Save = props => {
  const { user } = useContext(AuthContext)
  const { save, hasUnsavedChanges, saving } = useContext(EditorContext);
  const disabled = !hasUnsavedChanges;

  useEffect(() => {
    const downHandler = (e) => {
      if (user && (e.metaKey || e.ctrlKey) && e.keyCode === 83){
        e.preventDefault();
        save()
      }
    }
    window.addEventListener('keydown', downHandler);
    return () => window.removeEventListener('keydown', downHandler);
  },[ user, save ])
  const buttonProps = {
    variantColor: "primary",
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
      Save
    </ProtectedButton>
  );
};

export default Save;

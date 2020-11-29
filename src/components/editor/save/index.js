import React, { useEffect, useContext } from "react";
import { ProtectedButton } from "components/menus";
import { EditorContext } from "./../editorContext";
import { AuthContext } from "services/auth";

const Save = (props) => {
  const { user } = useContext(AuthContext);
  const { publish, publishing } = useContext(EditorContext);

  useEffect(() => {
    const downHandler = (e) => {
      if (user && (e.metaKey || e.ctrlKey) && e.keyCode === 83) {
        e.preventDefault();
        publish();
      }
    };
    window.addEventListener("keydown", downHandler);
    return () => window.removeEventListener("keydown", downHandler);
  }, [user, publish]);

  const buttonProps = {
    colorScheme: "primary",
    fontWeight: "normal",
    size: "md",
    loadingText: "Saving",
    ...props,
  };

  return (
    <ProtectedButton
      {...buttonProps}
      onClick={publish}
      data-testid="save-button"
      isLoading={publishing}
    >
      Save
    </ProtectedButton>
  );
};

export default Save;

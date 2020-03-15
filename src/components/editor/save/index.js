import React from "react";
import { connect } from "react-redux";
import { saveNewCreation, saveCreation } from "./../../../store/creation/actions";
import { ProtectedButton } from "./../../menus";

const Save = ( {profile, hasUnsavedChanges, saveNew, save, creationId, ...props } ) => {
    const { isLoaded } = profile;
    
    if (!isLoaded) {
        return null;
    }

    const clickHandle = () => {
        if(!creationId) {
            saveNew()
            return
        }
        if(Array.isArray(profile.heliblocks) && profile.heliblocks.includes(creationId)) {
            save()
            return 
        }

        // @todo fork action
        console.log('Fork!!')
    }

    const isOwner = !creationId || (Array.isArray(profile.heliblocks) && profile.heliblocks.includes(creationId));
    const disabled = isOwner && !hasUnsavedChanges;

    const buttonProps = {
        variantColor: isOwner ? "blue": "teal",
        fontWeight: "normal",
        leftIcon: isOwner ? "cloud": "copy",
        size: "md",
        ...props
      };

    return (
        <ProtectedButton
            {...buttonProps}
            onClick={clickHandle}
            disabled={disabled}
            >
            {isOwner ? "Save": "Fork"}
        </ProtectedButton>
    )
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  creationId: state.creation.id,
  hasUnsavedChanges: state.creation.hasUnsavedChanges,
  profile: state.firebase.profile
});

const mapDispatchToProps = {
    saveNew: saveNewCreation,
    save: saveCreation
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Save);
  
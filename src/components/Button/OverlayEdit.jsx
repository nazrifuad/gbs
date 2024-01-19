import { useState } from "react";
import editIcon from "../../assets/img/edit-icon.svg";

const OverlayEdit = ({ showModal }) => {

  return (
    <>
      <div className="overlay edit" onClick={() => showModal('editStyleguide')}>
        <img src={editIcon} alt="Icon" />
      </div>
    </>
  );
};

export default OverlayEdit;

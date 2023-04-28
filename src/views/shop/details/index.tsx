import React, { useState } from "react";

enum DETAILS_ENUM {
  ABOUT = "ABOUT",
  CONTACT = "CONTACT",
}
function Details() {
  const [activeTab, setActiveTab] = useState<string>(DETAILS_ENUM.ABOUT);
  return (
    <div className="my-3">
      <div className="details-tabs">
        <div
          className={activeTab === DETAILS_ENUM.ABOUT ? "active" : ""}
          onClick={() => setActiveTab(DETAILS_ENUM.ABOUT)}
        >
          About Store
        </div>
        <div
          className={activeTab === DETAILS_ENUM.CONTACT ? "active" : ""}
          onClick={() => setActiveTab(DETAILS_ENUM.CONTACT)}
        >
          Contacts
        </div>
      </div>
      {activeTab === DETAILS_ENUM.ABOUT && (
        <div className="tab-details">About the store</div>
      )}
      {activeTab === DETAILS_ENUM.CONTACT && (
        <div className="tab-details">Contacts of the store</div>
      )}
    </div>
  );
}

export default Details;

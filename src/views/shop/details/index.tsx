import React, { useState } from "react";
import { Ishop } from "../../../interfaces";
import ReactHtmlParser from "react-html-parser";

enum DETAILS_ENUM {
  ABOUT = "ABOUT",
  CONTACT = "CONTACT",
}

interface IDetailsProps {
  shop: Ishop;
}
function Details({ shop }: IDetailsProps) {
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
        <div className="tab-details">{ReactHtmlParser(shop.description)}</div>
      )}
      {activeTab === DETAILS_ENUM.CONTACT && (
        <div className="tab-details">
          <table className="table table-bordered">
            <tbody style={{ borderTopWidth: 0 }}>
              <tr>
                <td>Location</td>
                <td>{shop.address} </td>
              </tr>

              <tr>
                <td>Phone</td>
                <td>{shop.phone1} </td>
              </tr>

              {shop.phone2.trim() !== "" && (
                <tr>
                  <td>Phone2</td>
                  <td>{shop.phone2} </td>
                </tr>
              )}
              {shop.phone3.trim() !== "" && (
                <tr>
                  <td>Phone3</td>
                  <td>{shop.phone3} </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Details;

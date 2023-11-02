import { useEffect, useState } from "react";

interface IsearchByAttribute {
  value: string;
  label: string;
}
interface IProps {
  searchByAttributes: IsearchByAttribute[];
  showSearchByLabel?: boolean;
  placeHolder?: string;
  setState: any;
  currentState: any;
  allData: any;
}
function SearchData(props: IProps) {
  const [keyword, setKeyword] = useState("");
  const [searchBy, setSearchBy] = useState(props.searchByAttributes[0].value);
  useEffect(() => {
    if (keyword.trim().length > 0) {
      if (searchBy !== "") {
        const res = props.allData.filter((item: any) =>
          item[searchBy].toLowerCase().includes(keyword.toLowerCase())
        );
        props.setState(res);
      }
    } else {
      props.setState(props.allData);
    }
  }, [keyword, searchBy]);

  return (
    <div className="search-table-data-container">
      <table>
        <tr>
          {props.showSearchByLabel && (
            <td>
              <label htmlFor="">Search by: </label>
              <select
                value={searchBy}
                onChange={(e: any) => setSearchBy(e.target.value)}
              >
                {props.searchByAttributes.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                ))}
              </select>
            </td>
          )}
          <td>
            <div className="input-container">
              <input
                type="text"
                value={keyword}
                onChange={(e: any) => setKeyword(e.target.value)}
                placeholder={props.placeHolder ? props.placeHolder : "Search"}
              />
              <div className="icon-container">
                <i className="bi bi-search"></i>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default SearchData;

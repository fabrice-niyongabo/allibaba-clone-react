import { useEffect, useState } from "react";
import { ITableFilterConfig } from "../../interfaces";

interface IFilterOption {
  value: string;
  label: string;
}

interface IProps {
  placeHolder: string;
  filterBy: string;
  filterByOptions: IFilterOption[];
  config: ITableFilterConfig;
  setConfig: any;
  maxWidth?: number;
}

function TableFilter(props: IProps) {
  const [option, setOption] = useState("");

  useEffect(() => {
    handleFilter();
  }, [option]);

  const handleFilter = () => {
    const newState = [...props.config.filters];
    const index = newState.findIndex((item) => item.type === props.filterBy);
    if (index >= 0) {
      newState[index].value = option;
      props.setConfig((prev: any) => ({ ...prev, filters: newState }));
    }
  };

  return (
    <div className="filter-table-data-container">
      <label>{props.placeHolder}</label>
      <select
        value={option}
        style={{ maxWidth: props.maxWidth ? props.maxWidth : "100%" }}
        onChange={(e: any) => setOption(e.target.value)}
      >
        <option value="">All</option>
        {props.filterByOptions.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TableFilter;

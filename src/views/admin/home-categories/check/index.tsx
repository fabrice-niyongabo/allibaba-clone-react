import React, { useState } from "react";
interface ICheckProps {
  defaultValue: boolean;
  callBack: any;
  column: string;
  id: number;
}
function Check(props: ICheckProps) {
  const [checked, setChecked] = useState(props.defaultValue);
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => {
        setChecked(e.target.checked);
        props.callBack({
          column: props.column,
          value: e.target.checked,
          id: props.id,
        });
      }}
    />
  );
}

export default Check;

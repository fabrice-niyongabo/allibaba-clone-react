import { useEffect, useState } from "react";
import { IVariation, VARITION_TYPES_ENUM } from "../../../../../interfaces";

interface IVariationProps {
  type: VARITION_TYPES_ENUM;
  variations: IVariation[];
  setVariations: any;
  setUnsavedVariations: any;
  unsavedVariations: VARITION_TYPES_ENUM[];
  defaultVariations: IVariation[];
}

interface IVariationInputProps {
  index: number;
  type: string;
  inputId: string;
  handleChange: any;
  defaultValue: string;
}
const VariationInput = ({
  index,
  type,
  inputId,
  handleChange,
  defaultValue,
}: IVariationInputProps) => {
  const [vValue, setVvalue] = useState(defaultValue);
  useEffect(() => {
    if (vValue !== defaultValue) handleChange(index, vValue);
  }, [vValue]);
  return (
    <input
      type="text"
      className="form-control"
      placeholder={`Enter ${type} ${index + 1}`}
      id={inputId}
      value={vValue}
      onChange={(e) => setVvalue(e.target.value)}
    />
  );
};

function Variation({
  type,
  variations,
  setVariations,
  setUnsavedVariations,
  unsavedVariations,
  defaultVariations,
}: IVariationProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [values, setValues] = useState<string[]>([]); // Array to store dynamically added input values
  const [inputValues, setInputValues] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(true);

  const handleAdd = () => {
    const newState = inputValues;
    const index = values.length; // Get the index of the new input element
    setValues([...values, `input-${index}`]); // Add the ID to the values array
    newState.push("");
    setInputValues(newState);
  };

  const handleRemove = (index: number) => {
    const inputId = values[index];
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      const newState = inputValues;
      newState.splice(index, 1);
      inputElement.remove();
      setValues(values.filter((id) => id !== inputId)); // Remove the input ID from the values array
      setInputValues(newState);
      setIsSaved(false);
      addToUnSavedVariation();
    }
  };

  const handleRemoveFromDom = (index: number) => {
    const inputId = values[index];
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      inputElement.remove();
    }
  };

  const handleChange = (index: number, value: string) => {
    const newState = inputValues;
    newState[index] = value;
    setInputValues(newState);
    setIsSaved(false);
    addToUnSavedVariation();
  };

  const handleVariationToggle = () => {
    if (isChecked) {
      setIsChecked(false);
      setVariations(variations.filter((item) => item.type !== type));
      values.map((item) => {
        handleRemoveFromDom(Number(item.split("-")[1]));
      });
      setValues([]);
      setInputValues([]);
    } else {
      setIsChecked(true);
    }
  };

  const addToUnSavedVariation = () => {
    const exists = unsavedVariations.find((item) => item === type);
    if (!exists) {
      setUnsavedVariations([...unsavedVariations, type]);
    }
  };

  const handleSave = () => {
    const newSate = variations;
    const index = newSate.findIndex((item) => item.type === type);
    if (index > -1) {
      newSate[index] = { type: type, values: inputValues };
    } else {
      newSate.push({ type: type, values: inputValues });
    }
    setVariations(newSate);
    setUnsavedVariations(unsavedVariations.filter((item) => item !== type));
    setIsSaved(true);
  };

  useEffect(() => {
    const exists = variations.find((item) => item.type === type);
    if (exists) {
      setIsChecked(true);
      //
      const inputVs = [];
      const values = [];
      for (let i = 0; i < exists.values.length; i++) {
        values.push(`input-${i}`);
        inputVs.push(exists.values[i]);
      }
      setInputValues(inputVs);
      setValues(values);
    }
  }, [defaultVariations]);

  return (
    <div className="col-md-4  mb-3">
      <div className="variation-header">
        <div>
          <input
            type="checkbox"
            checked={isChecked}
            onClick={() => handleVariationToggle()}
          />{" "}
          {type}
        </div>
        {isChecked && (
          <button
            type="button"
            className="common-btn"
            onClick={() => handleAdd()}
          >
            <i className="bi bi-plus" />
          </button>
        )}
      </div>
      {isChecked && (
        <div>
          {values.map((inputId, index) => (
            <div key={inputId} className="variation-option-value">
              <VariationInput
                defaultValue={inputValues[index]}
                handleChange={handleChange}
                index={index}
                inputId={inputId}
                type={type}
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemove(index)}
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>
          ))}
          {!isSaved && (
            <button
              type="button"
              className="common-btn mt-3"
              onClick={() => handleSave()}
            >
              Save {type} changes
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Variation;

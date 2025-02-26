import React from "react";

export function InputField(props) {
  // podporované typy pro element input
  const INPUTS = ["text", "number", "date"];

  // validace elementu a typu
  const type = props.type.toLowerCase();
  const isTextarea = type === "textarea";
  const isSelect = type === "select";
  const required = props.required || false;

  if (!isTextarea && !isSelect &&!INPUTS.includes(type)) {
    return null;
  }

  // přiřazení hodnoty minima do atributu příslušného typu
  const minProp = props.min || null;
  const min = ["number", "date"].includes(type) ? minProp : null;
  const minlength = ["text", "textarea"].includes(type) ? minProp : null;

  const maxProp = props.max || null;
  const max = type ==="number" ? maxProp : null

  return (
    <div className="form-group">
      <label>{props.label}:</label>

      {/* vykreslení aktuálního elementu */}
      {isTextarea ? (
        <textarea
          required={required}
          className="form-control"
          placeholder={props.prompt}
          rows={props.rows}
          minLength={minlength}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
        />
      ): isSelect?(
        <select
          required={required}
          className="form-control"
          name={props.name}
          value={props.value}
          
          onChange={props.handleChange}>
            <option value="">{props.prompt}</option>
            {props.options.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name} {option.identificationNumber}
              </option>
            ))}

        </select>



      
      ) : (
        <input
          required={required}
          type={type}
          className="form-control"
          placeholder={props.prompt}
          minLength={minlength}
          min={min}
          max={max}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
        />
      )}
    </div>
  );
}

export default InputField;

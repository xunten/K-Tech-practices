import React from 'react'

const CheckboxToggle = () => {
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        Toggle me
      </label>
      <p>Checkbox is: {isChecked ? 'checked' : 'unchecked'}</p>
    </div>
  )
}

export default CheckboxToggle

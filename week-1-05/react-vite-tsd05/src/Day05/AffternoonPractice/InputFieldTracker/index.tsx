import React from 'react'

const InputFieldTracker = () => {
  const [inputValue, setInputValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const displayValue = inputValue.trim() === '' ? 'nothing' : inputValue;

  return (
    <div>
      <input type="text" value={inputValue} placeholder='Type Something' onChange={handleChange} />
      <p>You typed: {displayValue}</p>
    </div>
  )
}

export default InputFieldTracker

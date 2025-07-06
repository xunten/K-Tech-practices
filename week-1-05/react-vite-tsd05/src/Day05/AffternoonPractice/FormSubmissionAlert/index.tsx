import React, { useState } from 'react'

const FormSubmissionAlert = () => {

  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      alert(`Form submitted with value: ${inputValue}`);
      setInputValue('');
    } else {
        alert('Input value empty!');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
        <input type="text" value={inputValue} onChange={handleChange} placeholder="Enter something..." />
        <button type="submit">Submit</button>
    </form>
  )
}

export default FormSubmissionAlert

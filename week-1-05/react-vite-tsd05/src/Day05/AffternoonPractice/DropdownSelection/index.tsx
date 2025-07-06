import React from 'react'

// Task: Create a component with a <select> dropdown containing options like "Apple", "Banana", and "Orange". Show the selected option below the dropdown.
// Expected Output: A dropdown with fruit options and text below showing "Selected fruit: [fruit name]".

const DropdownSelection = () => {
  const [selectedFruit, setSelectedFruit] = React.useState<string | null>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFruit(e.target.value);
  }
    return (
        <div>
        <select onChange={handleSelectChange}>
            <option value="">Select a fruit</option>
            <option value="Apple">Apple</option>
            <option value="Banana">Banana</option>
            <option value="Orange">Orange</option>
        </select>
        {selectedFruit && <p>Selected fruit: {selectedFruit}</p>}
        </div>
    );
}

export default DropdownSelection


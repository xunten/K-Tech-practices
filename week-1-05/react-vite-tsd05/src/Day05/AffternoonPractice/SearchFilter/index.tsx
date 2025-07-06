import React from 'react'
const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const items = ['Apple', 'Banana', 'Orange', 'Grapes', 'Pineapple'];

  const filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default SearchFilter


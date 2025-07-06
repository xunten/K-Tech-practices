import React from 'react'

const KeyPressDisplay = () => {
  const [keyPressed, setKeyPressed] = React.useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setKeyPressed(e.key);
  }

  return (
    <div>
      <input type="text" onKeyPress={handleKeyPress} />
      {keyPressed && <p>Last key: {keyPressed}</p>}
    </div>
  )
}

export default KeyPressDisplay

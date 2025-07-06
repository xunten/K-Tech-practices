import React from 'react'

const DoubleClickMessage = () => {
  const [messageVisible, setMessageVisible] = React.useState(false);

  const handleDoubleClick = () => {
    setMessageVisible(true);
    setTimeout(() => {
      setMessageVisible(false);
    }, 2000);
  };

  return (
    <div>
      <button onDoubleClick={handleDoubleClick}>Double-click me</button>
      {messageVisible && <p>Double-clicked!</p>}
    </div>
  )
}

export default DoubleClickMessage

import React from 'react'

const ButtonClickCounter = () => {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
        <button onClick={handleClick}>Click Me</button>
        <p>Click {count} times</p>
    </div>
  )
}

export default ButtonClickCounter;

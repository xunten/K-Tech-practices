import React from 'react'

const ToggleSwitch = () => {
  const [isToggled, setIsToggled] = React.useState(false);

  const handleToggle = () => {
    setIsToggled(prevState => !prevState);
  };

  return (
    <div>
      <button onClick={handleToggle}>
        {isToggled ? 'ON' : 'OFF'}
      </button>
      <p>State: {isToggled ? 'ON' : 'OFF'}</p>
    </div>
  )
}

export default ToggleSwitch

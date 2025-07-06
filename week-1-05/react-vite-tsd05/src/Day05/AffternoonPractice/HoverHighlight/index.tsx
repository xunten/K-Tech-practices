import React from 'react'

const HoverHighlight = () => {
  const [isHovered, setIsHovered] = React.useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
  return (
    <div>
      <p
        style={{
          backgroundColor: isHovered ? 'yellow' : 'transparent',
          width: '200px',
          height: '50px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Hover me!
      </p>
    </div>
  )
}

export default HoverHighlight

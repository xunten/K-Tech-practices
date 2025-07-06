import React from "react";

type Props = {
  icon: React.ReactNode;
  active: React.ReactNode;
};

const LikeButton = ({ icon, active }: Props) => {
  const [like, setLike] = React.useState(false);

  const handleClick = () => {
    setLike(!like);
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <span
        style={{
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        {like ? active : icon}
      </span>
      <span>
        {like ? "Thank you !" : "Click like post!"}
      </span>
    </div>
  );
};

export default LikeButton;

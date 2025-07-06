import React from "react";

type Props = {
  stars?: number;
};

export default function Rating({ stars = 0 }: Props) {
  const [rating, setRating] = React.useState(stars);

  const handleClick = (index: number) => {
    setRating(index);
  };
  const labels = ["Really Bad", "Bad", "Normal", "Amazing", "Excellently!"];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <div>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <span
              key={index}
              style={{
                cursor: "pointer",
                WebkitTextStroke: "1px orange",
                fontSize: "25px",
                transition: "color 0.2s",
                color: rating >= item ? "orange" : "white",
              }}
              onClick={() => handleClick(item)}
            >
              ★
            </span>
          );
        })}
      </div>
      {rating > 0 && (
        <div style={{ marginTop: 8, fontWeight: "bold" }}>
          {labels[rating - 1]}
        </div>
      )}
    </div>
  );
}

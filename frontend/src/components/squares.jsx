const Square = ({ click, value, isUserturn }) => {
  return (
    <>
      <button
        style={{
          color: "white",
          backgroundColor: "black",
          boxShadow: "0px 0px 3px 1px rgba(255 ,255 , 255 , 0.4)",
          borderRadius: "0.5rem",
        }}
        onClick={click}
        disabled={isUserturn ? false : true}
      >
        {value}
      </button>
    </>
  );
};

export default Square;

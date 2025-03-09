import Button from "../UI/Button/Button.jsx";
export const buttonOptions = {
  default: "default",
  active: "active",
  activeReverse: "activeReverse",
};

function CardSortButton({ children, handleClickFn, option, ...props }) {
  const threeState =
    option === buttonOptions.active || option === buttonOptions.activeReverse
      ? true
      : false;
  
  return (
    <Button
      threeState={threeState}
      handleClick={handleClickFn}
      color="lightBlue"
      {...props}
    >
      {children}
      {option === buttonOptions.default ? (
        <div></div>
      ) : option === buttonOptions.active ? (
        <img src="/arrowUp.svg" alt="" />
      ) : (
        <img src="/arrowDown.svg" alt="" />
      )}
    </Button>
  );
}

export default CardSortButton;

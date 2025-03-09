import { useEffect, useState } from "react";
import Button from "../UI/Button/Button";

function AccompanyingLetterTextButton({ children, description }) {
  const [active, setActive] = useState(false);
  
  const handleClick = () => {
      setActive(!active); 
  };

  useEffect (() => { 
    setActive(false)
  },[description])

  return (
    <Button
      handleClick={handleClick}
      color="lightBlue"
      hasActive={active}
      size="maxWidth"
    >
      {children}
    </Button>
  );
}

export default AccompanyingLetterTextButton;

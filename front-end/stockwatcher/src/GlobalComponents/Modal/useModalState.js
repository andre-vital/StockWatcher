import { useState } from "react";

const useModalState = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    visible: isOpen,
    show: () => setIsOpen(true),
    hide: () => setIsOpen(false),
  };
};

export default useModalState;

import { useEffect, useRef, useState } from "react";

export const useClickOutside = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      ref.current &&
      !ref.current.contains(event.target as Node) &&
      !["BUTTON", "IMG", "INPUT"].includes(
        (event.target as HTMLElement).tagName
      )
    ) {
      setVisible(false);
      console.log((event.target as HTMLElement).tagName);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref]);

  return { visible, setVisible, ref };
};

import { useEffect, useRef, useState } from "react";

export const useClickOutside = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (
      ref.current &&
      !ref.current.contains(target as Node) &&
      (target.hasAttribute("data-click-outside-ignore") ||
        !["BUTTON", "IMG", "INPUT"].includes(target.tagName))
    ) {
      setVisible(false);
      console.log((event.target as HTMLElement).tagName);
      console.log(
        (event.target as HTMLElement).getAttribute("data-click-outside-ignore")
      );
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

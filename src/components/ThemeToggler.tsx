import { useEffect, useState } from "react";
import { DayIcon, NightIcon } from "./Icon";

const ThemeToggler = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document
        .querySelector("meta[name='theme-color']")
        ?.setAttribute("content", "#0f172a");
    } else {
      document.documentElement.classList.remove("dark");
      document
        .querySelector("meta[name='theme-color']")
        ?.setAttribute("content", "#fffffe");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setTheme(theme === "light" ? "dark" : "light");
  };
  if (!isMounted) {
    return (
      <div className="bg-secondary relative flex h-8 w-[3.5rem] flex-shrink-0 items-center justify-center rounded-full shadow-inner" />
    );
  }

  return (
    <button
      className="bg-secondary group relative flex h-8 w-[3.5rem] flex-shrink-0 items-center justify-center rounded-full shadow-inner"
      onClick={handleClick}
    >
      <div
        className="bg-primary border-primary group-hover:bg-secondary absolute left-0 grid h-9 w-9 place-items-center rounded-full border shadow-sm transition-transform"
        style={{
          transform: theme === "dark" ? "translateX(55%)" : "translateX(0%)",
        }}
      >
        {theme === "dark" ? <NightIcon /> : <DayIcon />}
      </div>
    </button>
  );
};

export default ThemeToggler;

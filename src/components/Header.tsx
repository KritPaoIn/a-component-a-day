import ThemeToggler from "./ThemeToggler";
interface NavItem {
  label: string;
  page?: string;
}

const navItems: NavItem[] = [
  { label: "Home", page: "/" },
  { label: "Components", page: "/components/" },
];

interface HeaderProps {
  pathname: string;
}

const Header: React.FC<HeaderProps> = ({ pathname }) => {
  return (
    <header className="bg-primary border-primary fixed top-0 z-[99] flex w-full items-center justify-center border-b py-4 px-6 shadow-sm">
      <div className="flex w-full max-w-2xl items-center  justify-between gap-3">
        <nav className="flex w-full max-w-[18rem] items-center justify-center gap-3">
          {navItems.map(({ label, page }) => {
            return (
              <a
                className={`${
                  pathname === page
                    ? "bg-secondary text-accent font-bold"
                    : "hover:bg-secondary hover:text-accent"
                } border-primary flex-1 rounded-md border py-0.5 text-center text-sm  shadow-sm`}
                key={label}
                href={page}
              >
                {label}
              </a>
            );
          })}
        </nav>
        <ThemeToggler />
      </div>
    </header>
  );
};

export default Header;

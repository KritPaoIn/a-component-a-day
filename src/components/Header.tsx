interface NavItem {
  label: string;
  page: string;
}

const navItems: NavItem[] = [
  { label: "Home", page: "/" },
  { label: "Components", page: "/components" },
  { label: "About", page: "/about" },
];

interface HeaderProps {
  pathname: string;
}

const Header: React.FC<HeaderProps> = ({ pathname }) => {
  return (
    <header className="bg-primary border-primary fixed flex w-full items-center justify-center border-b py-5 px-3 shadow-sm">
      <div className="w-full max-w-md">
        <nav className="flex w-full items-center justify-center gap-3">
          {navItems.map(({ label, page }) => {
            return (
              <a
                className={`${
                  pathname === page
                    ? "bg-secondary text-accent font-bold"
                    : "hover:bg-secondary hover:text-accent"
                } border-primary flex-1 rounded-md border py-0.5 text-center text-sm  shadow-sm transition-colors`}
                key={label}
                href={page}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;

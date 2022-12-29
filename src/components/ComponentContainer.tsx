interface ComponentContainerProps {
  name: string;
  day: number;
  children: React.ReactNode;
}

const ComponentContainer: React.FC<ComponentContainerProps> = ({
  name,
  day,
  children,
}) => {
  return (
    <section className="bg-primary border-primary border-b">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-unaccent p-6 text-center text-xl font-bold md:text-left">
          Day {day} - {name}
        </h2>
        <div className="flex items-center justify-center pb-24 pt-6">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ComponentContainer;

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
      <div className="bg-primary mx-auto max-w-3xl pb-20 md:px-6">
        <h2 className="text-secondary p-6 text-center md:text-left">
          Day {day} - {name}
        </h2>
        <div className="border-primary bg-secondary flex items-center justify-center border-y py-12 shadow-inner md:rounded-3xl md:border-x">
          {children}
        </div>
      </div>
    </section>
  );
};

export default ComponentContainer;

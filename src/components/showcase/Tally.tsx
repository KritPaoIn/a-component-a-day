import { MouseEventHandler, useState, useEffect } from "react";

const UpIcon = () => {
  return (
    <svg
      className="group-hover:text-accent"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M128 320l128-128 128 128z"></path>
    </svg>
  );
};

const DownIcon = () => {
  return (
    <svg
      className="group-hover:text-accent"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M128 192l128 128 128-128z"></path>
    </svg>
  );
};

type NumberProps = {
  count: number;
};

const NumberItem: React.FC<NumberProps> = ({ count }) => {
  return (
    <i className="grid h-full w-full place-items-center not-italic">{count}</i>
  );
};

const position = {
  top: "TOP",
  middle: "MIDDLE",
  bottom: "BOTTOM",
};

let currentPosition = position.middle;

const Tally = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [queue, setQueue] = useState<number[]>([-1, 0, 1]);
  const [count, setCount] = useState(
    Number(localStorage.getItem("tally")) ?? 0
  );
  const [bottomFactor, setBottomFactor] = useState(count + 1);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      setQueue([count + 1, count, count - 1]);
      setBottomFactor(count + 1);
    }
  }, []);

  const handleIncrement: MouseEventHandler = () => {
    if (queue === null) return;
    setCount((prev) => {
      if (currentPosition === position.top) {
        queue.unshift(prev + 1);
        queue.pop();
        setBottomFactor((prev) => prev + 1);
      } else if (currentPosition === position.bottom) {
        currentPosition = position.middle;
        queue.unshift(prev + 2);
        setBottomFactor((prev) => prev + 1);
      } else if (currentPosition === position.middle) {
        currentPosition = position.top;
        queue.pop();
      }
      localStorage.setItem("tally", String(prev + 1));
      return prev + 1;
    });
  };

  const handleDecrement: MouseEventHandler = () => {
    if (queue === null) return;
    setCount((prev) => {
      if (currentPosition === position.top) {
        currentPosition = position.middle;
        queue.push(prev - 2);
      } else if (currentPosition === position.bottom) {
        queue.push(prev - 1);
        queue.shift();
        setBottomFactor((prev) => prev - 1);
      } else if (currentPosition === position.middle) {
        currentPosition = position.bottom;
        queue.shift();
        setBottomFactor((prev) => prev - 1);
      }
      localStorage.setItem("tally", String(prev - 1));
      return prev - 1;
    });
  };

  return (
    <div className="border-primary bg-primary flex flex-col items-center gap-6 rounded-3xl border py-12 px-16 shadow-md">
      <div className="bg-secondary border-primary h-20 w-20 overflow-hidden rounded-3xl border text-2xl shadow-inner">
        {isMounted && (
          <div
            style={{
              transform: `translateY(${count * 100}%)`,
              bottom: `${bottomFactor * 100}%`,
            }}
            className="pointer-events-none relative h-full text-center transition-transform"
          >
            {queue?.map((num) => {
              return <NumberItem key={num} count={num} />;
            })}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <button
          onClick={handleIncrement}
          className="border-primary hover:bg-secondary bg-primary group rounded-md border py-1 px-4 shadow-sm"
        >
          <UpIcon />
        </button>
        <button
          onClick={handleDecrement}
          className="border-primary hover:bg-secondary bg-primary group rounded-md border px-4 py-1 shadow-sm"
        >
          <DownIcon />
        </button>
      </div>
    </div>
  );
};

export default Tally;

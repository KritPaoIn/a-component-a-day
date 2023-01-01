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

const ResetIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="group-hover:text-accent h-6 w-6 transition-transform duration-500 group-hover:rotate-180"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
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

// let currentPosition = position.middle;

const Tally = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [queue, setQueue] = useState<number[]>([-1, 0, 1]);
  const [count, setCount] = useState(
    Number(localStorage.getItem("tally")) ?? 0
  );
  const [currentPosition, setCurrentPosition] = useState(position.middle);
  const [bottomFactor, setBottomFactor] = useState(count + 1);

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      setQueue([count + 1, count, count - 1]);
      setBottomFactor(count + 1);
    }
    localStorage.setItem("tally", String(count));
  }, [count]);

  const handleIncrement: MouseEventHandler = () => {
    if (queue === null) return;
    setCount((prev) => {
      if (currentPosition === position.top) {
        queue.unshift(prev + 1);
        queue.pop();
        setBottomFactor((prev) => prev + 1);
      } else if (currentPosition === position.bottom) {
        setCurrentPosition(position.middle);
        queue.unshift(prev + 2);
        setBottomFactor((prev) => prev + 1);
      } else if (currentPosition === position.middle) {
        setCurrentPosition(position.top);
        queue.pop();
      }
      return prev + 1;
    });
  };

  const handleDecrement: MouseEventHandler = () => {
    if (queue === null) return;
    setCount((prev) => {
      if (currentPosition === position.top) {
        setCurrentPosition(position.middle);
        queue.push(prev - 2);
      } else if (currentPosition === position.bottom) {
        queue.push(prev - 1);
        queue.shift();
        setBottomFactor((prev) => prev - 1);
      } else if (currentPosition === position.middle) {
        setCurrentPosition(position.bottom);
        queue.shift();
        setBottomFactor((prev) => prev - 1);
      }
      return prev - 1;
    });
  };

  const handleReset: MouseEventHandler = () => {
    setCount(0);
    setCurrentPosition(position.middle);
    setQueue([1, 0, -1]);
    setBottomFactor(1);
  };

  return (
    <div className="border-primary bg-primary flex flex-col items-center gap-6 rounded-3xl border px-16 pt-12 pb-6 shadow-md">
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
          className="border-primary hover:bg-secondary bg-primary group grid place-items-center rounded-md border py-1 px-4 shadow-sm"
        >
          <UpIcon />
        </button>
        <button
          onClick={handleDecrement}
          className="border-primary hover:bg-secondary bg-primary group grid place-items-center rounded-md border px-4 py-1 shadow-sm"
        >
          <DownIcon />
        </button>
      </div>
      <button onClick={handleReset} className="group p-1">
        <ResetIcon />
      </button>
    </div>
  );
};

export default Tally;

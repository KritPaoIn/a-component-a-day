import { useState, useEffect, useRef } from "react";

const TICK = 6;
const RADIUS = 8;

const Hands = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const t = new Date();

      const newSeconds = t.getSeconds() + 1 + t.getMilliseconds() / 1000;
      const newMinutes = t.getMinutes() + newSeconds / 60.0;
      const newHours = (t.getHours() % 12) + newMinutes / 60;
      setSeconds(newSeconds);
      setMinutes(newMinutes);
      setHours(newHours);
    }, 121);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="relative">
      <div
        style={{
          transform: `translateX(-50%) rotate(${seconds * TICK}deg)`,
          height: `${RADIUS * 0.85}rem`,
        }}
        className="bg-accent absolute bottom-1/2 left-1/2 w-0.5 origin-bottom rounded-full"
      />
      <div
        style={{
          transform: `translateX(-50%) rotate(${minutes * TICK}deg)`,
          height: `${RADIUS * 0.85}rem`,
        }}
        className="bg-text-primary absolute left-1/2 bottom-1/2 w-1 origin-bottom rounded-full"
      />
      <div
        style={{
          transform: `translateX(-50%) rotate(${5 * hours * TICK}deg)`,
          height: `${RADIUS * 0.6}rem`,
        }}
        className="bg-text-primary absolute left-1/2 bottom-1/2 w-1 origin-bottom rounded-full"
      />
      <div className="bg-text-primary absolute left-1/2 bottom-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full" />
    </div>
  );
};

const AnalogClock = () => {
  return (
    <div
      style={{ height: `${RADIUS * 2}rem`, width: `${RADIUS * 2}rem` }}
      className={`bg-primary border-primary relative rounded-full border`}
    >
      {[...Array(12).keys()].map((i) => {
        const a = (2 * Math.PI * (i + 1)) / 12;
        return (
          <i
            key={i}
            style={{
              transform: `translate(calc(${
                Math.sin(a) * RADIUS * 0.8
              }rem - 50%), calc(${-Math.cos(a) * RADIUS * 0.8}rem - 50%))`,
            }}
            className="text-primary absolute left-1/2 top-1/2 text-2xl font-light not-italic"
          >
            {i + 1}
          </i>
        );
      })}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Hands />
      </div>
    </div>
  );
};

export default AnalogClock;

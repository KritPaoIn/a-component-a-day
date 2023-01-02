import { useState } from "react";

const isNumeric = (value: string) => {
  return /^\d$/.test(value);
};

const operators = {
  "+": "ADDITION",
  "-": "SUBTRACTION",
  "*": "MULTIPLICATION",
  "/": "DIVISION",
};

const Calculator = () => {
  const [result, setResult] = useState<null | string>(null);
  const [lastResult, setLastResult] = useState<null | string>(null);
  const [resetNext, setResetNext] = useState(true);
  const [operator, setOperator] = useState<null | keyof typeof operators>(null);

  const handleInput = (symbol: string) => {
    if (isNumeric(symbol)) {
      if (operator === null) {
        if (resetNext) {
          setResult(() => symbol);
          setResetNext(false);
        } else {
          setResult((prev) =>
            (prev === null ? "0" : prev).length < 9
              ? (prev === null ? "0" : prev).concat(symbol)
              : prev
          );
        }
      } else {
        if (lastResult === null) {
          setLastResult(result);
          setResult(() => symbol);
          setResetNext(false);
        } else {
          setResult((prev) =>
            (prev === null ? "0" : prev).length < 9
              ? (prev === null ? "0" : prev).concat(symbol)
              : prev
          );
        }
      }
    } else if (symbol === ".") {
      setResetNext(false);
      setResult((prev) => {
        if (prev === null) return "0.";
        if (prev.length < 9) {
          return prev.concat(".");
        }
        return prev;
      });
    } else if (operators.hasOwnProperty(symbol)) {
      setOperator(symbol as keyof typeof operators);
    }
  };

  const handleToggleSign = () => {
    setResult((prev) => (prev === null ? null : String(-Number(prev))));
  };

  const handlePercent = () => {
    setResult((prev) => (prev === null ? null : String(Number(prev) / 100)));
  };

  const handleCalculate = () => {
    if (lastResult === null) return;
    switch (operator) {
      case "+": {
        setResult((prev) =>
          prev === null ? null : String(Number(lastResult) + Number(prev))
        );
        break;
      }
      case "-": {
        setResult((prev) =>
          prev === null ? null : String(Number(lastResult) - Number(prev))
        );
        break;
      }
      case "*": {
        setResult((prev) =>
          prev === null ? null : String(Number(lastResult) * Number(prev))
        );
        break;
      }
      case "/": {
        setResult((prev) =>
          prev === null ? null : String(Number(lastResult) / Number(prev))
        );
        break;
      }
    }
    setOperator(null);
    setResetNext(true);
  };

  const handleReset = () => {
    setLastResult(null);
    setResult(null);
    setOperator(null);
    setResetNext(true);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-primary border-primary overflow-hidden rounded-xl border text-lg shadow-lg">
        <button className="border-primary hover:bg-secondary flex h-20 w-full items-center justify-center border-b">
          <p className="text-primary w-full max-w-[10ch] overflow-x-hidden text-right text-3xl">
            {result === null ? 0 : result}
          </p>
        </button>
        <div className="grid grid-cols-4">
          <button
            onClick={handleReset}
            className="bg-secondary border-primary hover:bg-tertiary h-14 w-14 border-b"
          >
            AC
          </button>
          <button
            onClick={handleToggleSign}
            className="bg-secondary border-primary hover:bg-tertiary h-14 w-14 border-b"
          >
            +/-
          </button>
          <button
            onClick={handlePercent}
            className="bg-secondary border-primary hover:bg-tertiary h-14 w-14 border-b"
          >
            %
          </button>
          <button
            onClick={() => {
              handleInput("/");
            }}
            className={`hover:bg-accent-hover border-primary h-14 w-14 border-l text-white ${
              operator === "/" ? "bg-accent-hover" : "bg-accent"
            }`}
          >
            ÷
          </button>
          <button
            onClick={() => {
              handleInput("7");
            }}
            className="hover:bg-secondary"
          >
            7
          </button>
          <button
            onClick={() => {
              handleInput("8");
            }}
            className="hover:bg-secondary"
          >
            8
          </button>
          <button
            onClick={() => {
              handleInput("9");
            }}
            className="hover:bg-secondary"
          >
            9
          </button>
          <button
            onClick={() => {
              handleInput("*");
            }}
            className={`hover:bg-accent-hover border-primary h-14 w-14 border-l text-white ${
              operator === "*" ? "bg-accent-hover" : "bg-accent"
            }`}
          >
            ×
          </button>
          <button
            onClick={() => {
              handleInput("4");
            }}
            className="hover:bg-secondary"
          >
            4
          </button>
          <button
            onClick={() => {
              handleInput("5");
            }}
            className="hover:bg-secondary"
          >
            5
          </button>
          <button
            onClick={() => {
              handleInput("6");
            }}
            className="hover:bg-secondary"
          >
            6
          </button>
          <button
            onClick={() => {
              handleInput("-");
            }}
            className={`hover:bg-accent-hover border-primary h-14 w-14 border-l text-white ${
              operator === "-" ? "bg-accent-hover" : "bg-accent"
            }`}
          >
            -
          </button>
          <button
            onClick={() => {
              handleInput("1");
            }}
            className="hover:bg-secondary"
          >
            1
          </button>
          <button
            onClick={() => {
              handleInput("2");
            }}
            className="hover:bg-secondary"
          >
            2
          </button>
          <button
            onClick={() => {
              handleInput("3");
            }}
            className="hover:bg-secondary"
          >
            3
          </button>
          <button
            onClick={() => {
              handleInput("+");
            }}
            className={`hover:bg-accent-hover border-primary h-14 w-14 border-l text-white ${
              operator === "+" ? "bg-accent-hover" : "bg-accent"
            }`}
          >
            +
          </button>
          <button
            onClick={() => {
              handleInput("0");
            }}
            className="hover:bg-secondary col-span-2"
          >
            0
          </button>
          <button
            onClick={() => {
              handleInput(".");
            }}
            className="hover:bg-secondary"
          >
            .
          </button>
          <button
            onClick={handleCalculate}
            className="bg-accent border-primary h-14 w-14 border-l text-white"
          >
            =
          </button>
        </div>
      </div>
      <p className="text-unaccent text-xs">
        Decimals may be inaccurate because of floating point numbers.
      </p>
    </div>
  );
};

export default Calculator;

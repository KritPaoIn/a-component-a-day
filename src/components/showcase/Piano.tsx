import { useEffect, useState, useRef } from "react";

const notesInfo: Record<string, { frequency: number; key: string }> = {
  C4: { frequency: 261.6, key: "a" },
  "C#4": { frequency: 277.18, key: "w" },
  D4: { frequency: 293.7, key: "s" },
  "D#4": { frequency: 311.13, key: "e" },
  E4: { frequency: 329.6, key: "d" },
  F4: { frequency: 349.2, key: "f" },
  "F#4": { frequency: 369.99, key: "t" },
  G4: { frequency: 392, key: "g" },
  "G#4": { frequency: 415.3, key: "y" },
  A4: { frequency: 440, key: "h" },
  "A#4": { frequency: 466.16, key: "u" },
  B4: { frequency: 493.9, key: "j" },
  C5: { frequency: 523.3, key: "k" },
};

class Sound {
  audioCtx = new AudioContext();
  nodes: Record<
    number,
    { oscillatorNode: OscillatorNode; gainNode: GainNode }
  > = {};

  constructor() {}

  play = (frequency: number) => {
    if (this.nodes[frequency] !== undefined) return;

    const oscillatorNode = this.audioCtx.createOscillator();
    const gainNode = new GainNode(this.audioCtx, { gain: 0.1 });
    oscillatorNode.frequency.setValueAtTime(
      frequency,
      this.audioCtx.currentTime
    );

    oscillatorNode.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);

    this.nodes[frequency] = { oscillatorNode, gainNode };

    oscillatorNode.start();
  };

  stop = (frequency: number) => {
    if (this.nodes[frequency] === undefined) return;

    const { oscillatorNode, gainNode } = this.nodes[frequency];

    const releaseTime = this.audioCtx.currentTime + 0.1;
    gainNode.gain.linearRampToValueAtTime(0, releaseTime);
    oscillatorNode.stop(releaseTime);

    oscillatorNode.onended = () => {
      oscillatorNode.disconnect();
      gainNode.disconnect();
    };
    delete this.nodes[frequency];
  };
}

type NoteProps = {
  note: string;
  held: boolean;
  notate?: boolean;
};

const Note: React.FC<NoteProps> = ({ note, held, notate = false }) => {
  const isBlack = note.includes("#");

  if (isBlack) {
    return (
      <div
        id={note}
        className={`relative z-10 cursor-pointer after:absolute after:left-[-1rem] after:top-0 after:h-[6rem] after:w-[2rem]  after:rounded-b-md after:bg-neutral-800 dark:after:bg-slate-100  ${
          held
            ? "after:bg-neutral-500 dark:after:bg-slate-400"
            : "after:bg-neutral-800 hover:after:bg-neutral-600 dark:after:bg-slate-100 dark:hover:after:bg-slate-300"
        }`}
      >
        <p
          className={`pointer-events-none absolute bottom-[5rem] left-1/2 z-20 hidden -translate-x-1/2 text-white transition-opacity dark:text-slate-900 sm:block ${
            notate ? "opacity-100" : "opacity-0"
          }`}
        >
          {notesInfo[note].key.toUpperCase()}
        </p>
      </div>
    );
  }
  return (
    <div
      id={note}
      className={`border-primary relative grid h-[10rem] w-[3rem] cursor-pointer border-r last:border-r-0 ${
        held ? "bg-tertiary" : "bg-primary hover:bg-secondary"
      }`}
    >
      <p
        className={`pointer-events-none absolute bottom-3 left-1/2 hidden -translate-x-1/2 transition-opacity sm:block ${
          notate ? "opacity-100" : "opacity-0"
        }`}
      >
        {notesInfo[note].key.toUpperCase()}
      </p>
    </div>
  );
};

const Piano = () => {
  const [keyboardEnabled, _setKeyboardEnabled] = useState(false);

  const keyboardEnabledRef = useRef(keyboardEnabled);
  const setKeyboardEnabled = (data: boolean) => {
    keyboardEnabledRef.current = data;
    _setKeyboardEnabled(data);
  };

  const [noteHeld, setNoteHeld] = useState<Record<string, boolean>>(
    Object.keys(notesInfo).reduce(
      (acc, note) => ({ ...acc, [note]: false }),
      {}
    )
  );

  useEffect(() => {
    const sound = new Sound();

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target === null) return;

      const noteInfo = notesInfo[target.id];
      if (noteInfo) {
        e.preventDefault();
        sound.play(noteInfo.frequency);
        setNoteHeld((prev) => ({ ...prev, [target.id]: true }));
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target === null) return;

      const noteInfo = notesInfo[target.id];

      if (noteInfo) {
        e.preventDefault();
        sound.stop(noteInfo.frequency);
        setNoteHeld((prev) => ({ ...prev, [target.id]: false }));
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target === null) return;

      const noteInfo = notesInfo[target.id];

      if (noteInfo) {
        e.preventDefault();
        sound.play(noteInfo.frequency);
        setNoteHeld((prev) => ({ ...prev, [target.id]: true }));
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target === null) return;

      const noteInfo = notesInfo[target.id];
      if (noteInfo === undefined) return;
      if (noteInfo) {
        e.preventDefault();
        sound.stop(noteInfo.frequency);
        setNoteHeld((prev) => ({ ...prev, [target.id]: false }));
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!keyboardEnabledRef.current) return;
      if (sound === null) return;
      if (e.repeat) return;

      let noteInfo: { note: string; frequency: number } | null = null;

      for (const [note, { frequency, key }] of Object.entries(notesInfo)) {
        if (key === e.key) {
          noteInfo = { note, frequency };
        }
      }

      if (noteInfo) {
        sound.play(noteInfo.frequency);
        setNoteHeld((prev) =>
          noteInfo ? { ...prev, [noteInfo.note]: true } : prev
        );
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (sound === null) return;
      if (e.repeat) return;

      let noteInfo: { note: string; frequency: number } | null = null;

      for (const [note, { frequency, key }] of Object.entries(notesInfo)) {
        if (key === e.key) {
          noteInfo = { note, frequency };
        }
      }

      if (noteInfo) {
        sound.stop(noteInfo.frequency);
        setNoteHeld((prev) =>
          noteInfo ? { ...prev, [noteInfo.note]: false } : prev
        );
      }
    };
    addEventListener("keydown", handleKeyDown);
    addEventListener("keyup", handleKeyUp);
    addEventListener("mousedown", handleMouseDown);
    addEventListener("mouseup", handleMouseUp);
    addEventListener("touchstart", handleTouchStart);
    addEventListener("touchend", handleTouchEnd);
    addEventListener("mouseout", handleMouseUp);
    return () => {
      removeEventListener("keydown", handleKeyDown);
      removeEventListener("keyup", handleKeyUp);
      removeEventListener("mousedown", handleMouseDown);
      removeEventListener("mouseup", handleMouseUp);
      removeEventListener("touchstart", handleTouchStart);
      removeEventListener("touchend", handleTouchEnd);
      removeEventListener("mouseout", handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="border-primary scale-[85%] select-none overflow-hidden  rounded-md border sm:scale-105">
        <div className="relative flex">
          {Object.entries(noteHeld).map(([note, held]) => {
            return (
              <Note
                key={note}
                note={note}
                held={held}
                notate={keyboardEnabled}
              />
            );
          })}
        </div>
      </div>
      <button
        onClick={() => {
          setKeyboardEnabled(!keyboardEnabled);
        }}
        className="bg-accent hover:bg-accent-hover hidden w-40 rounded-full py-1 text-white shadow-sm sm:block"
      >
        {keyboardEnabled ? "Disable" : "Enable"} keyboard
      </button>
    </div>
  );
};

export default Piano;

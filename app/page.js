'use client';

import { useState, useRef } from 'react';

export default function Home() {
  const [numDice, setNumDice] = useState(2);
  const [numSides, setNumSides] = useState(6);
  const [currentRoll, setCurrentRoll] = useState(null);
  const [rollHistory, setRollHistory] = useState([]);
  const [selectedRoll, setSelectedRoll] = useState(null);

  const sidesInputRef = useRef(null);

  const clamp = (value, min, max) => {
    const num = parseInt(value) || min;
    return Math.max(min, Math.min(max, num));
  };

  const formatRollBreakdown = (rolls, includeDiceCount = true) => {
    if (rolls.length <= 6) {
      return rolls.join(' • ');
    }
    if (includeDiceCount) {
      return `${rolls.length} dice • min ${Math.min(...rolls)} • max ${Math.max(...rolls)}`;
    }
    return `min ${Math.min(...rolls)} • max ${Math.max(...rolls)}`;
  };

  const handleDiceChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setNumDice('');
    } else {
      const num = parseInt(value);
      if (!isNaN(num)) {
        setNumDice(Math.min(50, Math.max(0, num)));
      }
    }
  };

  const handleSidesChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setNumSides('');
    } else {
      const num = parseInt(value);
      if (!isNaN(num)) {
        setNumSides(Math.min(100, Math.max(0, num)));
      }
    }
  };

  const handleDiceBlur = () => {
    if (numDice === '' || numDice < 1) {
      setNumDice(1);
    }
  };

  const handleSidesBlur = () => {
    if (numSides === '' || numSides < 2) {
      setNumSides(2);
    }
  };

  const handleDiceKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sidesInputRef.current?.focus();
    }
  };

  const handleSidesKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      rollDice();
    }
  };

  const rollDice = () => {
    const diceCount = numDice === '' ? 1 : parseInt(numDice);
    const sidesCount = numSides === '' ? 2 : parseInt(numSides);

    const rolls = [];
    let total = 0;

    for (let i = 0; i < diceCount; i++) {
      const roll = Math.floor(Math.random() * sidesCount) + 1;
      rolls.push(roll);
      total += roll;
    }

    const result = {
      rolls,
      total,
      config: `${diceCount}d${sidesCount}`,
      timestamp: Date.now(),
    };

    setCurrentRoll(result);
    setRollHistory((prev) => [result, ...prev].slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-6">
      <main className="w-full max-w-md">
        {/* Title */}
        <h1 className="text-4xl font-bold text-black mb-8 text-center tracking-tight finger-paint-regular">
          Die, Die, Dice!
        </h1>

        {/* Inputs */}
        <div className="flex gap-2.5 mb-5">
          <div className="flex-1">
            <label htmlFor="numDice" className="block text-xs font-semibold text-black mb-1 uppercase tracking-wide">
              Number of Dice
            </label>
            <input
              id="numDice"
              type="number"
              min="1"
              max="50"
              value={numDice}
              onChange={handleDiceChange}
              onBlur={handleDiceBlur}
              onKeyDown={handleDiceKeyDown}
              className="w-full px-3 py-2 text-base border-2 border-black bg-white text-black focus:outline-none transition-all rounded-md"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="numSides" className="block text-xs font-semibold text-black mb-1 uppercase tracking-wide">
              Number of Sides
            </label>
            <input
              id="numSides"
              ref={sidesInputRef}
              type="number"
              min="2"
              max="100"
              value={numSides}
              onChange={handleSidesChange}
              onBlur={handleSidesBlur}
              onKeyDown={handleSidesKeyDown}
              className="w-full px-3 py-2 text-base border-2 border-black bg-white text-black focus:outline-none transition-all rounded-md"
            />
          </div>
        </div>

        {/* Roll Button */}
        <button
          onClick={rollDice}
          className="w-full py-5 bg-black text-white text-2xl font-bold tracking-wider active:bg-zinc-900 active:scale-[0.99] active:translate-y-[1px] transition-all duration-100 mb-6 rounded-xl finger-paint-regular focus:outline-none"
        >
          Roll
        </button>

        {/* Current Roll Display - Always visible */}
        <div className="mb-7 border-4 border-black p-6 rounded-xl">
          <div className="text-center">
            <div className="text-xs font-medium text-black/60 mb-3 uppercase tracking-widest">
              {currentRoll ? currentRoll.config : '\u00A0'}
            </div>
            <div className="text-8xl font-bold mb-4 leading-none finger-paint-regular">
              <span className={currentRoll ? 'text-accent' : 'text-black/10'}>
                {currentRoll ? currentRoll.total : '—'}
              </span>
            </div>
            <div className="text-xs text-black/40 font-mono">
              {currentRoll ? formatRollBreakdown(currentRoll.rolls) : '\u00A0'}
            </div>
          </div>
        </div>

        {/* Roll History - Always visible */}
        <div>
          <h2 className="text-xs font-semibold text-black mb-3 uppercase tracking-widest">
            Previous Rolls
          </h2>
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => {
              const roll = rollHistory[index];
              return (
                <div
                  key={roll?.timestamp || `empty-${index}`}
                  onClick={() => roll && setSelectedRoll(roll)}
                  className={`relative grid grid-cols-3 items-center px-3.5 h-[40px] text-sm transition-opacity rounded-md ${
                    roll && index === 0
                      ? 'border-2 border-black'
                      : roll
                      ? 'border border-black/30'
                      : 'border border-black/10'
                  } ${roll ? 'cursor-pointer active:scale-[0.99]' : ''}`}
                  style={{ opacity: roll ? (index === 0 ? 1 : Math.max(0.3, 1 - index * 0.15)) : 0.15 }}
                >
                  {roll ? (
                    <>
                      <span className="font-semibold justify-self-start">{roll.config}</span>
                      <span className="font-bold text-black justify-self-center">{roll.total}</span>
                      <span className="text-black/50 text-xs font-mono justify-self-end truncate">
                        {formatRollBreakdown(roll.rolls, false)}
                      </span>
                    </>
                  ) : (
                    <span className="text-black/20 text-xs col-span-3">—</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Bottom Sheet */}
      {selectedRoll && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 animate-fade-in"
            onClick={() => setSelectedRoll(null)}
          />

          {/* Sheet */}
          <div className="fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:max-w-md bg-white border-t-4 border-black rounded-t-2xl z-50 max-h-[80vh] flex flex-col animate-slide-up">
            {/* Header */}
            <div className="flex justify-between items-start p-6 border-b-2 border-black/10">
              <div className="flex-1">
                <div className="text-5xl font-bold text-accent finger-paint-regular mb-2 leading-none">
                  {selectedRoll.total}
                </div>
                <div className="text-xs font-medium text-black/40 uppercase tracking-wide">
                  {selectedRoll.config}
                </div>
              </div>
              <button
                onClick={() => setSelectedRoll(null)}
                className="text-xl text-black/40 hover:text-black w-8 h-8 flex items-center justify-center flex-shrink-0 ml-4"
              >
                ×
              </button>
            </div>

            {/* Individual Die Values */}
            <div className="p-6 pb-12 overflow-y-auto">
              <h3 className="text-xs font-semibold text-black mb-3 uppercase tracking-widest">
                Rolls
              </h3>
              <div className="flex flex-wrap gap-1.5 pb-8">
                {selectedRoll.rolls.map((value, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 border border-black/40 rounded flex items-center justify-center font-bold text-black"
                  >
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

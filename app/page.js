'use client';

import { useState } from 'react';

export default function Home() {
  const [numDice, setNumDice] = useState(2);
  const [numSides, setNumSides] = useState(6);
  const [currentRoll, setCurrentRoll] = useState(null);
  const [rollHistory, setRollHistory] = useState([]);

  const clamp = (value, min, max) => {
    const num = parseInt(value) || min;
    return Math.max(min, Math.min(max, num));
  };

  const handleDiceChange = (e) => {
    setNumDice(clamp(e.target.value, 1, 100));
  };

  const handleSidesChange = (e) => {
    setNumSides(clamp(e.target.value, 2, 100));
  };

  const rollDice = () => {
    const rolls = [];
    let total = 0;

    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * numSides) + 1;
      rolls.push(roll);
      total += roll;
    }

    const result = {
      rolls,
      total,
      config: `${numDice}d${numSides}`,
      timestamp: Date.now(),
    };

    setCurrentRoll(result);
    setRollHistory((prev) => [result, ...prev].slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <main className="w-full max-w-md">
        {/* Title */}
        <h1 className="text-5xl font-bold text-black mb-12 text-center tracking-tight">
          DIE DIE DICE
        </h1>

        {/* Inputs */}
        <div className="space-y-6 mb-8">
          <div>
            <label htmlFor="numDice" className="block text-sm font-semibold text-black mb-2 uppercase tracking-wide">
              Number of Dice
            </label>
            <input
              id="numDice"
              type="number"
              min="1"
              max="100"
              value={numDice}
              onChange={handleDiceChange}
              className="w-full px-4 py-3 text-lg border-2 border-black bg-white text-black focus:outline-none focus:border-accent transition-colors"
            />
          </div>

          <div>
            <label htmlFor="numSides" className="block text-sm font-semibold text-black mb-2 uppercase tracking-wide">
              Number of Sides
            </label>
            <input
              id="numSides"
              type="number"
              min="2"
              max="100"
              value={numSides}
              onChange={handleSidesChange}
              className="w-full px-4 py-3 text-lg border-2 border-black bg-white text-black focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Roll Button */}
        <button
          onClick={rollDice}
          className="w-full py-4 bg-black text-white text-xl font-bold uppercase tracking-wider hover:bg-accent transition-colors mb-12"
        >
          Roll
        </button>

        {/* Current Roll Display */}
        {currentRoll && (
          <div className="mb-8 border-4 border-black p-6">
            <div className="text-center">
              <div className="text-sm font-semibold text-black mb-2 uppercase tracking-wide">
                {currentRoll.config}
              </div>
              <div className="text-6xl font-bold text-accent mb-4">
                {currentRoll.total}
              </div>
              <div className="text-sm text-black">
                {currentRoll.rolls.join(' + ')}
              </div>
            </div>
          </div>
        )}

        {/* Roll History */}
        {rollHistory.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-black mb-3 uppercase tracking-wide">
              Previous Rolls
            </h2>
            <div className="space-y-2">
              {rollHistory.map((roll) => (
                <div
                  key={roll.timestamp}
                  className="flex justify-between items-center border-2 border-black px-4 py-3 text-sm"
                >
                  <span className="font-semibold">{roll.config}</span>
                  <span className="font-bold text-accent">{roll.total}</span>
                  <span className="text-black text-xs">{roll.rolls.join(' + ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

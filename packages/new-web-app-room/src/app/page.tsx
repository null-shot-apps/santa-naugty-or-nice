'use client';

import { useState } from 'react';

interface Person {
  id: number;
  name: string;
  status: 'nice' | 'naughty';
  reason?: string;
}

export default function SantaList() {
  const [people, setPeople] = useState<Person[]>([]);
  const [newName, setNewName] = useState('');
  const [newReason, setNewReason] = useState('');

  const addPerson = (status: 'nice' | 'naughty') => {
    if (newName.trim()) {
      const newPerson: Person = {
        id: Date.now(),
        name: newName.trim(),
        status,
        reason: newReason.trim() || undefined
      };
      setPeople([...people, newPerson]);
      setNewName('');
      setNewReason('');
    }
  };

  const removePerson = (id: number) => {
    setPeople(people.filter(person => person.id !== id));
  };

  const toggleStatus = (id: number) => {
    setPeople(people.map(person => 
      person.id === id 
        ? { ...person, status: person.status === 'nice' ? 'naughty' : 'nice' }
        : person
    ));
  };

  const niceList = people.filter(person => person.status === 'nice');
  const naughtyList = people.filter(person => person.status === 'naughty');

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 via-green-900 to-red-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-2 text-yellow-300">🎅 Santa's List 🎄</h1>
          <p className="text-xl text-green-200">Who's been naughty or nice this year?</p>
        </div>

        {/* Add Person Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-300">Add Someone to the List</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              placeholder="Reason (optional)..."
              value={newReason}
              onChange={(e) => setNewReason(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <div className="flex gap-4">
              <button
                onClick={() => addPerson('nice')}
                disabled={!newName.trim()}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                ✨ Add to Nice List
              </button>
              <button
                onClick={() => addPerson('naughty')}
                disabled={!newName.trim()}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                🔥 Add to Naughty List
              </button>
            </div>
          </div>
        </div>

        {/* Lists */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Nice List */}
          <div className="bg-green-800/30 backdrop-blur-sm rounded-lg p-6 border border-green-400/30">
            <h2 className="text-2xl font-bold mb-4 text-green-300 flex items-center gap-2">
              ✨ Nice List ({niceList.length})
            </h2>
            {niceList.length === 0 ? (
              <p className="text-green-200/60 italic">No one on the nice list yet...</p>
            ) : (
              <div className="space-y-3">
                {niceList.map(person => (
                  <div key={person.id} className="bg-green-700/30 rounded-lg p-4 border border-green-400/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-green-100">{person.name}</h3>
                        {person.reason && (
                          <p className="text-sm text-green-200/80 mt-1">{person.reason}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleStatus(person.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                          title="Move to naughty list"
                        >
                          🔄
                        </button>
                        <button
                          onClick={() => removePerson(person.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                          title="Remove from list"
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Naughty List */}
          <div className="bg-red-800/30 backdrop-blur-sm rounded-lg p-6 border border-red-400/30">
            <h2 className="text-2xl font-bold mb-4 text-red-300 flex items-center gap-2">
              🔥 Naughty List ({naughtyList.length})
            </h2>
            {naughtyList.length === 0 ? (
              <p className="text-red-200/60 italic">No one on the naughty list yet...</p>
            ) : (
              <div className="space-y-3">
                {naughtyList.map(person => (
                  <div key={person.id} className="bg-red-700/30 rounded-lg p-4 border border-red-400/20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-red-100">{person.name}</h3>
                        {person.reason && (
                          <p className="text-sm text-red-200/80 mt-1">{person.reason}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleStatus(person.id)}
                          className="text-green-400 hover:text-green-300 text-sm"
                          title="Move to nice list"
                        >
                          🔄
                        </button>
                        <button
                          onClick={() => removePerson(person.id)}
                          className="text-green-400 hover:text-green-300 text-sm"
                          title="Remove from list"
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {people.length > 0 && (
          <div className="mt-8 text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">🎁 Summary</h3>
            <p className="text-lg">
              <span className="text-green-300">{niceList.length} nice</span>
              {' • '}
              <span className="text-red-300">{naughtyList.length} naughty</span>
              {' • '}
              <span className="text-white">{people.length} total</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


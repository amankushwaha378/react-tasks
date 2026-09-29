import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const characters = [
  { id: 1, name: "Luke Skywalker" },
  { id: 2, name: "C-3PO" },
  { id: 3, name: "R2-D2" },
  { id: 4, name: "Darth Vader" },
  { id: 5, name: "Leia Organa" },
  { id: 6, name: "Owen Lars" },
];

const fetchCharacter = async (characterId) => {
  const response = await fetch(
    `https://swapi.py4e.com/api/people/${characterId}/`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch character");
  }

  // Artificial delay so the query lifecycle is visible
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return response.json();
};

function StarWars() {
  const [characterId, setCharacterId] = useState(null);

  const characterQuery = useQuery({
    queryKey: ["star-wars-character", characterId],
    queryFn: () => fetchCharacter(characterId),
    enabled: !!characterId,
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Star Wars Characters
        </h1>

        <p className="mt-2 text-gray-600">
          Select a character and observe how the query key creates
          a separate cache entry for each character.
        </p>
      </div>

      {/* Query Key Explanation */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <h2 className="font-semibold text-blue-900">
          Dynamic Query Key
        </h2>

        <code className="mt-3 block rounded-lg bg-white p-3 text-sm text-blue-800">
          ["star-wars-character", characterId]
        </code>

        <p className="mt-3 text-sm text-blue-800">
          Changing the character ID changes the query key, so
          React Query treats each character as a separate query.
        </p>
      </div>

      {/* Character Buttons */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {characters.map((character) => (
          <button
            key={character.id}
            onClick={() => setCharacterId(character.id)}
            className={`rounded-lg border px-4 py-3 text-left transition ${
              characterId === character.id
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white hover:border-blue-400"
            }`}
          >
            <p className="font-medium">{character.name}</p>

            <p className="mt-1 text-xs text-gray-500">
              ID: {character.id}
            </p>
          </button>
        ))}
      </div>

      {/* Character Details */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        {!characterId && (
          <div className="py-10 text-center text-gray-500">
            Select a character to fetch their details.
          </div>
        )}

        {characterQuery.isPending && (
          <div className="py-10 text-center">
            <p className="font-medium text-gray-700">
              Fetching character...
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Watch the query state below.
            </p>
          </div>
        )}

        {characterQuery.isError && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">
            {characterQuery.error.message}
          </div>
        )}

        {characterQuery.data && (
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {characterQuery.data.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Character #{characterId}
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Data Available
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Info label="Height" value={characterQuery.data.height} />
              <Info label="Mass" value={characterQuery.data.mass} />
              <Info label="Hair Color" value={characterQuery.data.hair_color} />
              <Info label="Eye Color" value={characterQuery.data.eye_color} />
              <Info label="Gender" value={characterQuery.data.gender} />
              <Info label="Birth Year" value={characterQuery.data.birth_year} />
            </div>
          </div>
        )}
      </div>

      {/* Query State */}
      <div className="rounded-xl border bg-gray-50 p-5">
        <h2 className="font-semibold text-gray-900">
          Query State
        </h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <StateItem
            label="Query Status"
            value={characterQuery.status}
          />

          <StateItem
            label="Fetch Status"
            value={characterQuery.fetchStatus}
          />

          <StateItem
            label="Is Pending"
            value={String(characterQuery.isPending)}
          />

          <StateItem
            label="Is Fetching"
            value={String(characterQuery.isFetching)}
          />
        </div>
      </div>
     
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg bg-gray-50 p-4">
      <p className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-medium text-gray-900">
        {value}
      </p>
    </div>
  );
}

function StateItem({ label, value }) {
  return (
    <div className="rounded-lg bg-white p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 font-mono text-sm font-medium">
        {value}
      </p>
    </div>
  );
}

export default StarWars;
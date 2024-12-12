import { Metadata } from "next";
import Link from "next/link";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  created: string;
}

interface Location {
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

interface Episode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

export const metadata: Metadata = {
  title: "Character Details",
};

const fetchCharacter = async (id: string) => {
  const apiUrl = `https://rickandmortyapi.com/api/character/${id}`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error("Failed to fetch character details");
  }
  return res.json();
};

const fetchLocation = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch location details");
  }
  return res.json();
};

const fetchEpisodes = async (episodeUrls: string[]) => {
  const promises = episodeUrls.map((url) =>
    fetch(url).then((res) => res.json())
  );
  return Promise.all(promises);
};

const CharacterDetailPage = async ({ params }: { params: { id: string } }) => {
  const character: Character = await fetchCharacter(params.id);
  const location: Location = await fetchLocation(character.location.url);
  const episodes: Episode[] = await fetchEpisodes(character.episode);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
          <img
            src={character.image}
            alt={character.name}
            className="w-48 h-48 rounded-full border-4 border-blue-600"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
            <p>
              <span className="font-bold">Status:</span> {character.status}
            </p>
            <p>
              <span className="font-bold">Species:</span> {character.species}
            </p>
            <p>
              <span className="font-bold">Type:</span>{" "}
              {character.type || "Unknown"}
            </p>
            <p>
              <span className="font-bold">Gender:</span> {character.gender}
            </p>
            <p>
              <span className="font-bold">Origin:</span> {character.origin.name}
            </p>
            <p>
              <span className="font-bold">Location:</span> {location.name} -{" "}
              {location.type} ({location.dimension})
            </p>
            <p>
              <span className="font-bold">Created:</span>{" "}
              {new Date(character.created).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Episodes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {episodes.map((episode, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-md">
                <Link href={`/episodes/${episode.id}`} key={episode.id}>
                  <h3 className="text-lg font-bold">{episode.name}</h3>
                </Link>
                <p>
                  <span className="font-bold">Air Date:</span>{" "}
                  {episode.air_date}
                </p>
                <p>
                  <span className="font-bold">Episode:</span> {episode.episode}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailPage;

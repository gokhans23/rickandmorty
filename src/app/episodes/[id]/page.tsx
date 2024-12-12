import { Metadata } from "next";
import Link from "next/link";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  created: string;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export const metadata: Metadata = {
  title: "Episode Details",
};

const fetchEpisode = async (id: string) => {
  const apiUrl = `https://rickandmortyapi.com/api/episode/${id}`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error("Failed to fetch episode details");
  }
  return res.json();
};

const fetchCharacters = async (characterUrls: string[]) => {
  const promises = characterUrls.map((url) =>
    fetch(url).then((res) => res.json())
  );
  return Promise.all(promises);
};

const EpisodeDetailPage = async ({ params }: { params: { id: string } }) => {
  const episode: Episode = await fetchEpisode(params.id);
  const characters: Character[] = await fetchCharacters(episode.characters);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{episode.name}</h1>
        <p>
          <span className="font-bold">Air Date:</span> {episode.air_date}
        </p>
        <p>
          <span className="font-bold">Episode Code:</span> {episode.episode}
        </p>
        <p>
          <span className="font-bold">Created:</span>{" "}
          {new Date(episode.created).toLocaleDateString()}
        </p>

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Characters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {characters.map((character) => (
              <div
                key={character.id}
                className="bg-gray-700 p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <Link href={`/characters/${character.id}`} key={character.id}>
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />

                  <h3 className="text-lg font-bold text-center">
                    {character.name}
                  </h3>
                </Link>
                <p>
                  <span className="font-bold">Status:</span> {character.status}
                </p>
                <p>
                  <span className="font-bold">Species:</span>{" "}
                  {character.species}
                </p>
                <p>
                  <span className="font-bold">Gender:</span> {character.gender}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetailPage;

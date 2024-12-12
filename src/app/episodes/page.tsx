import { Metadata } from "next";
import Link from "next/link";
export const runtime = "edge";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

export const metadata: Metadata = {
  title: "Episodes List",
};

const fetchEpisodes = async (page: number) => {
  const apiUrl = `https://rickandmortyapi.com/api/episode/?page=${page}`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error("Failed to fetch episodes");
  }
  return res.json();
};

const EpisodesPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const page = parseInt(searchParams.page || "1", 10);
  const data = await fetchEpisodes(page);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Episodes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.results.map((episode: Episode) => (
          <Link href={`/episodes/${episode.id}`} key={episode.id}>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer">
              <h2 className="text-xl font-bold mb-2">{episode.name}</h2>
              <p>
                <span className="font-bold">Air Date:</span> {episode.air_date}
              </p>
              <p>
                <span className="font-bold">Episode:</span> {episode.episode}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: data.info.pages }, (_, i) => (
          <Link
            key={i}
            href={`?page=${i + 1}`}
            className={`px-4 py-2 rounded-md ${
              page === i + 1 ? "bg-blue-600" : "bg-gray-800"
            } text-white hover:bg-blue-500 cursor-pointer`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EpisodesPage;

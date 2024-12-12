import { Metadata } from "next";
import Link from "next/link";
export const runtime = "edge";

interface Character {
  id: number;
  name: string;
  status: string;
  gender: string;
  image: string;
}

interface CharactersPageProps {
  characters: Character[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
}

export const metadata: Metadata = {
  title: "Rick and Morty Characters",
};

const fetchCharacters = async (
  status: string,
  gender: string,
  page: number
) => {
  const apiUrl = `https://rickandmortyapi.com/api/character/?status=${status}&gender=${gender}&page=${page}`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error("Failed to fetch characters");
  }
  return res.json();
};

const CharactersPage = async ({
  searchParams,
}: {
  searchParams: { status?: string; gender?: string; page?: string };
}) => {
  const status = searchParams.status || "";
  const gender = searchParams.gender || "";
  const page = parseInt(searchParams.page || "1", 10);

  const data = await fetchCharacters(status, gender, page);
  const totalPages = data.info.pages;
  const currentPage = Math.min(page, totalPages);

  const paginationLinks = [];
  if (currentPage > 1) paginationLinks.push(1);
  if (currentPage > 3) paginationLinks.push("...");
  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(totalPages, currentPage + 2);
    i++
  ) {
    if (!paginationLinks.includes(i)) {
      paginationLinks.push(i);
    }
  }
  if (currentPage < totalPages - 2) paginationLinks.push("...");
  if (!paginationLinks.includes(totalPages)) paginationLinks.push(totalPages);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Rick and Morty Characters
      </h1>

      <form method="get" className="mb-8 flex justify-center gap-4">
        <select
          name="status"
          defaultValue={status}
          className="block p-2 bg-gray-800 text-white rounded-md cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select
          name="gender"
          defaultValue={gender}
          className="block p-2 bg-gray-800 text-white rounded-md cursor-pointer"
        >
          <option value="">All Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md cursor-pointer"
        >
          Apply Filters
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {data.results.map((character: Character) => (
          <Link href={`/characters/${character.id}`} key={character.id}>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center cursor-pointer hover:bg-gray-700 transition">
              <img
                src={character.image}
                alt={character.name}
                className="rounded-full w-24 h-24 mb-4"
              />
              <h2 className="text-xl font-bold text-center">
                {character.name}
              </h2>
              <p className="text-sm">Status: {character.status}</p>
              <p className="text-sm">Gender: {character.gender}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {paginationLinks.map((link, index) =>
          typeof link === "number" ? (
            <a
              key={index}
              href={`?${new URLSearchParams({
                ...searchParams,
                page: link.toString(),
              }).toString()}`}
              className={`px-4 py-2 rounded-md ${
                currentPage === link ? "bg-blue-600" : "bg-gray-800"
              } text-white hover:bg-blue-500 cursor-pointer`}
            >
              {link}
            </a>
          ) : (
            <span key={index} className="px-4 py-2 text-gray-400">
              {link}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default CharactersPage;

import { Metadata } from "next";
import Link from "next/link";

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

export const metadata: Metadata = {
  title: "Locations List",
};

const fetchLocations = async (page: number) => {
  const apiUrl = `https://rickandmortyapi.com/api/location/?page=${page}`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error("Failed to fetch locations");
  }
  return res.json();
};

const LocationsPage = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const page = parseInt(searchParams.page || "1", 10);
  const data = await fetchLocations(page);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Locations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.results.map((location: Location) => (
          <Link href={`/locations/${location.id}`} key={location.id}>
            <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer">
              <h2 className="text-xl font-bold mb-2">{location.name}</h2>
              <p>
                <span className="font-bold">Type:</span> {location.type}
              </p>
              <p>
                <span className="font-bold">Dimension:</span>{" "}
                {location.dimension}
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

export default LocationsPage;

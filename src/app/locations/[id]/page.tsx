import { Metadata } from "next";
import Link from "next/link";

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  created: string;
}

interface Resident {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export const metadata: Metadata = {
  title: "Location Details",
};

const fetchLocation = async (id: string) => {
  const apiUrl = `https://rickandmortyapi.com/api/location/${id}`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error("Failed to fetch location details");
  }
  return res.json();
};

const fetchResidents = async (residentUrls: string[]) => {
  const promises = residentUrls.map((url) =>
    fetch(url).then((res) => res.json())
  );
  return Promise.all(promises);
};

const LocationDetailPage = async ({ params }: { params: { id: string } }) => {
  const location: Location = await fetchLocation(params.id);
  const residents: Resident[] = await fetchResidents(location.residents);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">{location.name}</h1>
        <p>
          <span className="font-bold">Type:</span> {location.type}
        </p>
        <p>
          <span className="font-bold">Dimension:</span> {location.dimension}
        </p>
        <p>
          <span className="font-bold">Created:</span>{" "}
          {new Date(location.created).toLocaleDateString()}
        </p>

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Residents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {residents.map((resident) => (
              <div
                key={resident.id}
                className="bg-gray-700 p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <Link href={`/characters/${resident.id}`} key={resident.id}>
                  <img
                    src={resident.image}
                    alt={resident.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />

                  <h3 className="text-lg font-bold text-center">
                    {resident.name}
                  </h3>
                </Link>
                <p>
                  <span className="font-bold">Status:</span> {resident.status}
                </p>
                <p>
                  <span className="font-bold">Species:</span> {resident.species}
                </p>
                <p>
                  <span className="font-bold">Gender:</span> {resident.gender}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetailPage;

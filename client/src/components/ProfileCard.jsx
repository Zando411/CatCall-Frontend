const CAT_DB_URL = import.meta.env.VITE_CAT_DB_URL;

export default function ProfileCard({ cat }) {
  return (
    <>
      <div className="relative w-96 overflow-hidden rounded-lg bg-white text-black shadow-lg">
        {/* Cat Image */}
        <div className="relative" onClick={() => console.log("View more...")}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <img
            src={`${CAT_DB_URL}/api/catImage/${cat.owner}/${cat._id}`}
            alt={cat.name}
            className="h-96 w-full object-cover object-top"
          />
        </div>
        <div className="flex flex-col gap-1 p-4 text-left">
          <h2 className="text-black-cat text-2xl font-bold">
            {cat.name}{" "}
            <span className="text-gray-600">
              {cat.age}
              {cat.sex.charAt(0)}
            </span>
          </h2>
          <p className="text-black-cat">
            {cat.city}, {cat.state}
          </p>
          <p className="text-black-cat">Breed: {cat.breed}</p>
          <p className="text-black-cat">Color: {cat.color}</p>
          <p className="text-black-cat">
            Contact:{" "}
            <a
              className="text-blue-500 hover:underline"
              href={`mailto:${cat.owner}`}
            >
              {cat.owner}
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

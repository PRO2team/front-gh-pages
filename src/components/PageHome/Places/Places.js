import { useState } from "react";
import PlacesTitle from "./PlacesTitle";
import PlacesList from "./PlacesList";

const PLACES_DUMMY = [
  { id: 0, name: "Warszawa", source: "warsaw.jpg" },
  { id: 1, name: "Kraków", source: "krakow.jpg" },
  { id: 2, name: "Łódź", source: "lodz.jpg" },
  { id: 3, name: "Wrocław", source: "wroclaw.jpg" },
  { id: 4, name: "Poznań", source: "poznan.jpg" },
  { id: 5, name: "Gdańsk", source: "gdansk.jpg" },
  { id: 6, name: "Szczecin", source: "szczecin.jpg" },
  { id: 7, name: "Lublin", source: "lublin.jpg" },
  { id: 8, name: "Katowice", source: "katowice.jpg" },
  { id: 9, name: "Gdynia", source: "gdynia.jpg" },
];

const Places = () => {
  const [places, setPlaces] = useState(PLACES_DUMMY);

  return (
    <section className="places margin-bottom-big">
      <div>
        <PlacesTitle />
        <PlacesList items={places} />
      </div>
    </section>
  );
};

export default Places;

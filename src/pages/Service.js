import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import About from "../components/PageService/About";
import Facilities from "../components/PageService/Facilities";
import Information from "../components/PageService/Information";
import Reviews from "../components/PageService/Reviews";
import useAuth from "../components/hooks/useAuth";

import globalPaths from "../components/Utility/Urls";

const Service = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  console.log(id);
  console.log(auth?.user);

  const [service, setService] = useState("");

  console.log(service);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    getSalon(id);

    async function getSalon(id) {
      const userGetRequest = {
        method: "GET",
        headers: { "Content-type": "application/json" },
      };

      const response = await fetch(
        globalPaths.BASE_URL + "/api/Salons/" + id,
        userGetRequest
      );

      const data = await response.json();

      if (response.status === 200) {
        setService(data);
      }
    }
  }, []);

  return (
    <div className="container_container margin-top-big">
      {console.log(service)}

      {service.length != 0 ? (
        <p>
          <Information item={service} />
          <About item={service} />
          <Facilities item={service} />
          <Reviews item={service} />
        </p>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Service;

import { useEffect, useState, useRef } from "react";
import { useOutletContext, useParams, useLocation } from "react-router-dom";
import About from "../components/PageService/About";
import Facilities from "../components/PageService/Facilities";
import Information from "../components/PageService/Information";
import Reviews from "../components/PageService/Reviews";
import useAuth from "../components/hooks/useAuth";

const Service = () => {
  const serviceData = useLocation();
  const { auth } = useAuth();
  const { id } = useParams();
  console.log(id);
  console.log(auth?.user);

  const [service, setService] = useState("");
  let salon;


  console.log(service); 
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    //console.log(service);

    getSalon(id);  


async function getSalon(id) {
          
  const userGetRequest = {
    method: "GET",
    headers: { "Content-type": "application/json" }}

  const response = await fetch(
            "https://localhost:7229/api/Salons/" + id, userGetRequest);

  const data = await response.json();
  console.log(data);
  console.log(response.status)
 
  if (response.status === 200) {
      console.log(response.status);
      console.log(data);
      setService(data);
      }         
    }
  console.log(service)
  }, []);

  return (
    <div className="container_container margin-top-big">
       {console.log(service)}

       {(service.length!=0)?(
      <>
      <Information item={service} />
      <About item={service} />
      <Facilities item={service} />
      <Reviews item={service} /> 
      </>)

      :(  <p>Loading</p>)
      }

    </div>
  );
};

export default Service;

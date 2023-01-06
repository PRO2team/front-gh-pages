import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Service from "./Service";
import globalUrls from "../Utility/Urls";

const Wishlist = () => {
  const { auth, setAuth } = useAuth();

  let userId = auth?.user;
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

useEffect(() => {

  async function getWishlist (userId) {
        
    const userGetRequest = {
      method: "GET",
      headers: { "Content-type": "application/json" }}

    const response = await fetch(
              "https://localhost:7229/api/Accounts/" + userId + "/favourites");

    const data = await response.json();
    console.log(data);
    console.log(response.status)

    if (response.status === 200) {
        console.log(response.status);
        console.log(data);
        setServices(data);
        }       
    }   
getWishlist(userId);

}, []);

  const onBookHandle = (service) => {
    navigate("/service/" + service.salonID, { state: service });
  };

  const onDeleteHandle = (service) => {
    const id = services.findIndex((o) => o.salonID === service.salonID);

    if (id > -1) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: ""
      };

      const fetchPost = async () => {
        const response = await fetch(
          globalUrls.DELETE_FROM_WISHLIST_URL + userId + "/" + service.salonID,
          requestOptions
        );

       //const data = await response.json();

        if (response.status === 200) {
          const arr = services;

          arr.splice(id, 1);

          setServices([...arr]);
        }
      };

      fetchPost();
    }
  };

  return (
    <div className="wishlist">
      {services.map((service) => (
        <Service
          key={service.salonID}
          service={service}
          onDeleteHandle={(service) => onDeleteHandle(service)}
          onBookHandle={(service) => onBookHandle(service)}
        />
      ))}
    </div>
  );
};

export default Wishlist;
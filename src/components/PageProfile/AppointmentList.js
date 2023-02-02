import { useState } from "react";

import Appointment from "./Appointment";
import globalUrls from "../Utility/Urls";
import { useEffect } from "react";

const AppointmentList = (props) => {
  const [appointments, setAppointments] = useState(props.appointments);

  const cancelAppointmentHandle = (appointment) => {
    const id = appointment.appointmentID;

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    };

    const fetchPost = async () => {
      const response = await fetch(
        globalUrls.BASE_URL + "/api/Appointments/" + id,
        requestOptions
      );

      if (response.ok) {
        return response;
      } else {
        throw new Error("Data coud not be fetched!");
      }
    };

    fetchPost().then((res) => {
      const arr = appointments;

      arr.splice(id, 1);

      setAppointments([...arr]);

      window.location.reload();
    });
  };

  return (
    <div className="appointments">
      {appointments.map((appointment) => (
        <Appointment
          key={appointment.appointmentID}
          item={appointment}
          onCancelHandle={() => cancelAppointmentHandle(appointment)}
          isHistory={props.isHistory}
        />
      ))}
    </div>
  );
};

export default AppointmentList;

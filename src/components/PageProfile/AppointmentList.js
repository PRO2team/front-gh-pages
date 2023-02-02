import { useState } from "react";

import Appointment from "./Appointment";
import globalUrls from "../Utility/Urls";

const AppointmentList = (props) => {
  const [appointments, setAppointments] = useState(props.appointments);

  const cancelAppointmentHandle = (appointment) => {
    const id = appointment.appointmentID;

    if (id > -1) {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      };

      const fetchPost = async () => {
        const response = await fetch(
          globalUrls.BASE_URL + "/api/Appointments/" + id,
          requestOptions
        );

        if (response.status === 200) {
          const arr = appointments;

          arr.splice(id, 1);

          setAppointments([...arr]);
        }
      };

      fetchPost();
    }
  };

  return (
    <div className="appointments">
      {appointments.map((appointment) => (
        <Appointment
          key={appointment.id}
          item={appointment}
          onCancelHandle={() => cancelAppointmentHandle(appointment)}
          isHistory={props.isHistory}
        />
      ))}
    </div>
  );
};

export default AppointmentList;

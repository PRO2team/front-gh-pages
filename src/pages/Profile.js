import { useState, useEffect } from "react";
import useAuth from "../components/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import globalUrls from "../components/Utility/Urls";
import Tab from "../components/PageProfile/Tab";
import AppointmentList from "../components/PageProfile/AppointmentList";
import History from "../components/PageProfile/History";
import Wishlist from "../components/PageProfile/Wishlist";
import Image from "../components/Utility/Image";
import Support from "../components/PageProfile/Support";
import Settings from "../components/PageProfile/Settings";

import "../sass/components/profile.scss";

const TABS_DUMMY = [
  {
    id: 0,
    iconName: "person-outline",
    title: "Profile",
  },
  {
    id: 1,
    iconName: "time-outline",
    title: "Appointments",
  },

  {
    id: 2,
    iconName: "heart-outline",
    title: "Wishlist",
  },

  {
    id: 3,
    iconName: "help-circle-outline",
    title: "Support",
  },

  {
    id: 4,
    iconName: "settings-outline",
    title: "Settings",
  },
];

let AppointmentsActual = [];
let AppointmentsOld = [];

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  let userId = auth?.user;
  const [userData, setUserData] = useState({});
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function getUser(userId) {
      const userGetRequest = {
        method: "GET",
        headers: { "Content-type": "application/json" },
      };

      const response = await fetch(
        globalUrls.BASE_URL + "/api/Accounts/" + userId,
        userGetRequest
      );

      const data = await response.json();

      if (response.status === 200) {
        setUserData(data);
      }
    }
    getUser(userId);
  }, []);

  useEffect(() => {
    if (userData !== null) {
      setAppointments(userData.appointments);
    }
  }, [userData]);

  const logOut = async () => {
    setAuth({});
    localStorage.clear();
    navigate("/");
  };

  const [tabID, setTabID] = useState(0);

  const onClickHandle = (id) => {
    setTabID(id);
  };

  let profileComponent;

  const isToday = (o) => {
    const dateNow = new Date();

    let monthNow = dateNow.getMonth() + 1;
    if (monthNow < 10) {
      monthNow = "0" + monthNow.toString();
    } else {
      monthNow = monthNow.toString();
    }

    let dayNow = dateNow.getDay() + 1;
    if (dayNow < 10) {
      dayNow = "0" + dayNow.toString();
    } else {
      dayNow = dayNow.toString();
    }

    if (
      o.dateTo.split("-")[0] === dateNow.getFullYear().toString() &&
      o.dateTo.split("-")[1] === monthNow &&
      o.dateTo.split("-")[2] === dayNow
    ) {
      return true;
    }

    return false;
  };

  const isNotToday = (o) => {
    const dateNow = new Date();

    let monthNow = dateNow.getMonth() + 1;
    if (monthNow < 10) {
      monthNow = "0" + monthNow.toString();
    } else {
      monthNow = monthNow.toString();
    }

    let dayNow = dateNow.getDay() + 1;
    if (dayNow < 10) {
      dayNow = "0" + dayNow.toString();
    } else {
      dayNow = dayNow.toString();
    }

    if (
      o.dateTo.split("-")[0] !== dateNow.getFullYear().toString() ||
      o.dateTo.split("-")[1] !== monthNow ||
      o.dateTo.split("-")[2] !== dayNow
    ) {
      return true;
    }

    return false;
  };

  if (tabID === 0) {
    profileComponent = (
      <div className="profile__info">
        {userData.profilePicture !== undefined &&
        userData.profilePicture.bytes !== null ? (
          <>
            <Image
              data={userData.profilePicture.bytes}
              className="profile__img"
            />
          </>
        ) : (
          <p> Loading</p>
        )}

        <p className="profile__name">
          {userData.name} {userData.surname}
        </p>
        <p className="profile__phone">{userData.phoneNumber}</p>
        <button onClick={logOut} className="profile__button">
          Log out
        </button>
      </div>
    );
  } else if (tabID === 1) {
    AppointmentsActual = appointments.filter(isToday);
    AppointmentsOld = appointments.filter(isNotToday);

    let appointmentsActualComponent = <></>;
    if (AppointmentsActual.length === 0) {
      appointmentsActualComponent = (
        <div>
          <h2 className="profile__title">You don't have appointments!</h2>
        </div>
      );
    } else {
      appointmentsActualComponent = (
        <div>
          <h2 className="profile__title">Your appointments</h2>
          <AppointmentList
            appointments={AppointmentsActual}
            isHistory={false}
          />
        </div>
      );
    }

    let appointmentsOldComponent = <></>;
    if (AppointmentsOld.length === 0) {
      appointmentsOldComponent = (
        <div>
          <h2 className="profile__title">You have never made appointments!</h2>
        </div>
      );
    } else {
      appointmentsOldComponent = (
        <div>
          <h2 className="profile__title">Your appointments</h2>
          <AppointmentList
            appointments={AppointmentsActual}
            isHistory={false}
          />
        </div>
      );
    }

    profileComponent = (
      <div>
        {appointmentsActualComponent}
        {appointmentsOldComponent}
      </div>
    );
  } else if (tabID === 2) {
    profileComponent = <Wishlist />;
  } else if (tabID === 3) {
    profileComponent = <Support />;
  } else if (tabID === 4) {
    profileComponent = <Settings user={userData} />;
  }

  return (
    <div className="container margin-bottom-big">
      <div className="profile">
        <ul className="container__tabs">
          {TABS_DUMMY.map((tab) => (
            <li key={tab.id} onClick={() => onClickHandle(tab.id)}>
              <Tab tab={tab} />
            </li>
          ))}
        </ul>
        {profileComponent}
      </div>
    </div>
  );
};

export default Profile;

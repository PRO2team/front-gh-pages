import { useState, useEffect } from "react";
import useAuth from "../components/hooks/useAuth";
import { useNavigate } from "react-router-dom";

import Tab from "../components/PageProfile/Tab";
import AppointmentList from "../components/PageProfile/AppointmentList";
import History from "../components/PageProfile/History";
import Wishlist from "../components/PageProfile/Wishlist";

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

const appointments = [
  { id: 1, title: "Test", date: "2022-12-29", time: "12:30", cost: "300 zl" },
  { id: 2, title: "Test2", date: "2022-12-30", time: "10:00", cost: "200 zl" },
  { id: 3, title: "Test3", date: "2023-02-10", time: "10:00", cost: "200 zl" },
  { id: 4, title: "Test4", date: "2023-01-04", time: "10:00", cost: "200 zl" },
];

const servicesFavourites = [
  { id: 1, title: "Test", address: "Ul. Koszykowa 86", number: "+48510921253" },
  { id: 2, title: "Tes2", address: "Ul. Koszykowa 86", number: "+48510921253" },
];

let AppointmentsActual = [];
let AppointmentsOld = [];

const Profile = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  let userId = auth?.user;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function getUser(userId) {
      const userGetRequest = {
        method: "GET",
        headers: { "Content-type": "application/json" },
      };

      const response = await fetch(
        "https://localhost:7229/api/Accounts/" + userId
      );

      const data = await response.json();
      console.log(data);
      console.log(response.status);

      if (response.status === 200) {
        console.log(response.status);
        console.log(data);
        setUserData(data);
      }
    }
    getUser(userId);
  }, []);

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
      o.date.split("-")[0] === dateNow.getFullYear().toString() &&
      o.date.split("-")[1] === monthNow &&
      o.date.split("-")[2] === dayNow
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
      o.date.split("-")[0] !== dateNow.getFullYear().toString() ||
      o.date.split("-")[1] !== monthNow ||
      o.date.split("-")[2] !== dayNow
    ) {
      return true;
    }

    return false;
  };

  if (tabID === 0) {
    profileComponent = (
      <div className="profile__info">
        <img
          src={`${process.env.PUBLIC_URL}/user.jpg`}
          alt="user_photo"
          className="profile__img"
        ></img>
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

    profileComponent = (
      <div>
        <h2 className="profile__title">Your appointments</h2>
        <AppointmentList appointments={AppointmentsActual} isHistory={false} />
        <h2 className="profile__title">History of appointments</h2>
        <History appointments={AppointmentsOld} isHistory={true} />
      </div>
    );
  } else if (tabID === 2) {
    profileComponent = <Wishlist />;
  } else if (tabID === 3) {
    profileComponent = <div>Support</div>;
  } else if (tabID === 4) {
    profileComponent = <div>Settings</div>;
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

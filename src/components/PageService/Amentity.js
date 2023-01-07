import React from "react";
import style from "../../sass/components/service.module.scss";
import Image from "../Utility/Image";

const Amentity = (props) => {
  const data = props.amentity.icon.bytes;
  return (
    <div className={style.bonus}>
      <Image data={data}></Image>
      {/* <ion-icon name="wifi-outline" class={style.bonus__icon} /> */}
      <p className={style.bonus__text}>{props.amentity.name}</p>
    </div>
  );
};

export default Amentity;

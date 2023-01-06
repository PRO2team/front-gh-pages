const Service = (props) => {
  return (
    <div className="wishlist__container">
      <h4 className="wishlist__title">{props.service.name}</h4>
      <div className="wishlist__info">
        <p className="wishlist__address">{props.service.address.street}</p>
        <p className="wishlist__number">{props.service.ownerPhoneNumber}</p>
      </div>
      <div className="wishlist__buttons">
        <button
          className="wishlist__book"
          onClick={() => props.onBookHandle(props.service)}
        >
          Book
        </button>
        <button
          className="wishlist__delete"
          onClick={() => props.onDeleteHandle(props.service)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Service;

const Appointment = (props) => {
  let button;
  if (!props.isHistory) {
    button = (
      <button
        className="appointment__cancel"
        onClick={() => props.onCancelHandle(props.item)}
      >
        Cancel
      </button>
    );
  } else {
    button = (
      <button
        className="appointment__comment"
        onClick={() => props.onCommentHandle(props.item)}
      >
        Comment
      </button>
    );
  }

  return (
    <div className="appointment">
      <p className="appointment__title">{props.item.title}</p>
      <div className="appointment__time">
        <p>{props.item.date}</p>
        <p>{props.item.time}</p>
      </div>
      <p className="appointment__cost">{props.item.cost}</p>
      {button}
    </div>
  );
};

export default Appointment;

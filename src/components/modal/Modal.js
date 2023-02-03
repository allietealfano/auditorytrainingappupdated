import classes from "./modal.module.css";

const date = new Date().toLocaleString('en-GB',{timeZone: 'EST'});

function Modal(props) {
    function cancelHandler() {
      props.onCancel();
    }

    return (
      <div className={classes.modal}>
        <h3>Congratulations!</h3>
        <br></br>
        <p>Final Score: {props.score}/10</p>
        <p>Date: {date}</p>
        <button className="btn" onClick={cancelHandler}>
          Close
        </button>
      </div>
    );
  }
  
  export default Modal;
  
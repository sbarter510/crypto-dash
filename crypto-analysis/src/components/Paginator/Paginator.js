import React from "react";
import "./paginator.css";
export default function Paginator(props) {
  const pageUpClickedHandler = () => {
    props.setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const pageDownClickedHandler = () => {
    if (props.pageNumber > 1) {
      props.setPageNumber((prevPageNumber) => prevPageNumber - 1);
    } else {
      return null;
    }
  };
  return (
    <div className="paginator-flex">
      <i className="material-icons" onClick={pageDownClickedHandler}>
        chevron_left
      </i>
      <p>{props.pageNumber}</p>
      <i className="material-icons" onClick={pageUpClickedHandler}>
        chevron_right
      </i>
    </div>
  );
}

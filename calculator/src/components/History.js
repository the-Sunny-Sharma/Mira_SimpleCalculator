import React from "react";
import "../styles/History.css";

export default function History(props) {
  const { isVisible, toggleHistory } = props;

  return (
    <div
      className={`wrapper-history left-history ${isVisible ? "visible" : ""}`}
    >
      <div className="calc-history">
        <h2 className="heading-history">Calculation History</h2>
        <ul className="history-records">
          {props.ans.length > 0 ? (
            props.ans.map((calculation, index) => (
              <li className="record" key={index}>
                <span className="indexing">({index + 1})</span> {calculation}
              </li>
            ))
          ) : (
            <li className="no-records">No Records</li>
          )}
        </ul>
        <center>
          <button className="clear-history-btn" onClick={props.clearHistory}>
            Clear History
          </button>
        </center>
      </div>
    </div>
  );
}

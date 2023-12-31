import "../styles/Calci.css";
import logo from "../assets/backspace.svg";
import React, { useState, useEffect } from "react";
import * as math from "mathjs"; //npm install mathjs
import History from "../components/History.js";

export default function Calc() {
  const [result, setResult] = useState("");
  const [inputEq, setInputEq] = useState("");
  const [calcHistory, setCalcHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (/^[a-wyzA-WYZ]$/.test(inputEq)) {
      alert("Alphabets are not allowed! \nPlease enter a number.");
      setInputEq('');
      return;
    }
    try {
      const processedInput = inputEq.replace(/x/g, "*").replace(/÷/g, "/");
      setResult(math.evaluate(processedInput));
    } catch (error) {
      console.log(`Error: ${error}`);
      setResult("");
    }
  }, [inputEq]);

  const isOperator = (val) => {
    return ["+", "-", "x", "*", "÷", "/", "%"].includes(val);
  };

  const handleBtnClick = (val) => {
    if (val === "backspace") {
      setInputEq((prevInput) => prevInput.slice(0, -1)); // Delete the last character
    } else {
      const lastInput = inputEq ? inputEq.slice(-1) : ""; // Check if inputEq is defined
      // Check if the entered value is an alphabet
      if (/^[a-wyzA-WYZ]$/.test(val)) {
        alert("Alphabets are not allowed");
        return;
      }
      else if ((!inputEq || inputEq === "") && isOperator(val)) {
        // Prevent an operator from being inserted if the input is undefined or empty
        alert("Please enter any number first");
        return;
      }
      // Check if the last input was an opening bracket or if input is empty
      else if (lastInput === "(") {
        if (val !== "x" && val !== "*" && val !== "/" && val !== "%" && val !== "÷") {
          setInputEq((prevInput) => prevInput + val);
          return;
        } else {
          alert("Invalid Input");
          return;
        }
      } else if (isOperator(lastInput) && isOperator(val)) {
        // If the last input and the current input are operators, replace the last one
        setInputEq((prevInput) => prevInput.slice(0, -1) + val);
      } else if (val === "(") {
        const openBracketsCount = (inputEq.match(/\(/g) || []).length;
        const closedBracketsCount = (inputEq.match(/\)/g) || []).length;
        if (closedBracketsCount < openBracketsCount) {
          setInputEq((prevInput) => prevInput + ")");
        } else setInputEq((prevInput) => prevInput + val);
      } else if (isOperator(val) && lastInput !== "") {
        // If the current input is an operator and the last input is not empty, add it
        setInputEq((prevInput) => prevInput + val);
      } else {
        setInputEq((prevInput) => prevInput + val);
      }
    }
  };

  const handleClearAll = () => {
    setInputEq("");
    setResult("");
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleInputEquation = (event) => {
    const inputValue = event.target.value;
    setInputEq(inputValue);
  };

  const calculateResult = () => {
    try {
      // Replace 'x' with '*' for multiplication and '÷' with '/' for division
      const processedInput = inputEq.replace(/x/g, "*").replace(/÷/g, "/");
      setInputEq(math.evaluate(processedInput));
      const calculatedResult = math.evaluate(processedInput);
      setResult("");
      // Add current calculation to history
      const equation = `${inputEq} = ${calculatedResult}`;
      setCalcHistory((prevHistory) => [...prevHistory, equation]);
    } catch (error) {
      setResult("Error");
    }
  };

  const handleHistoryClick = () => {
    setShowHistory(!showHistory); // Toggle the visibility of the History component
  };

  const clearHistory = () => {
    // Reset the calculation history array
    setCalcHistory([]);
  };
  return (
    <>
      <h1 className="header">Simple Calculator</h1>
      <div className="main-div">
        <div className="calci-div">
          <div className="main-container">
            <div className="display">
              <input
                type="text"
                className="input-equation"
                value={inputEq}
                onChange={handleInputEquation}
              />
              <p className="result">{result}</p>
            </div>
            <div className="display backspace">
              <button
                className="back-btn"
                onClick={() => handleBtnClick("backspace")}
              >
                <img src={logo} alt="" className="back-btn" />
              </button>
            </div>
            <div className="btn-wrapper">
              <div className="row-1 row-flex">
                <button
                  className="btn clr-btn"
                  onClick={() => handleClearAll()}
                >
                  C
                </button>
                <button
                  className="btn funct-btn"
                  onClick={() => handleBtnClick("(")}
                >
                  ( )
                </button>
                <button
                  className="btn funct-btn"
                  onClick={() => handleBtnClick("%")}
                >
                  %
                </button>
                <button
                  className="btn funct-btn"
                  onClick={() => handleBtnClick("÷")}
                >
                  ÷
                </button>
              </div>
              <div className="row-2 row-flex">
                <button className="btn" onClick={() => handleBtnClick("7")}>
                  7
                </button>
                <button className="btn" onClick={() => handleBtnClick("8")}>
                  8
                </button>
                <button className="btn" onClick={() => handleBtnClick("9")}>
                  9
                </button>
                <button
                  className="btn funct-btn"
                  onClick={() => handleBtnClick("x")}
                >
                  ×
                </button>
              </div>
              <div className="row-3 row-flex">
                <button className="btn" onClick={() => handleBtnClick("4")}>
                  4
                </button>
                <button className="btn" onClick={() => handleBtnClick("5")}>
                  5
                </button>
                <button className="btn" onClick={() => handleBtnClick("6")}>
                  6
                </button>
                <button
                  className="btn funct-btn"
                  onClick={() => handleBtnClick("-")}
                >
                  -
                </button>
              </div>
              <div className="row-4 row-flex">
                <button className="btn" onClick={() => handleBtnClick("1")}>
                  1
                </button>
                <button className="btn" onClick={() => handleBtnClick("2")}>
                  2
                </button>
                <button className="btn" onClick={() => handleBtnClick("3")}>
                  3
                </button>
                <button
                  className="btn funct-btn"
                  onClick={() => handleBtnClick("+")}
                >
                  +
                </button>
              </div>
              <div className="row-5 row-flex">
                <button className="btn" onClick={() => handleBtnClick("00")}>
                  00
                </button>
                <button className="btn" onClick={() => handleBtnClick("0")}>
                  0
                </button>
                <button className="btn" onClick={() => handleBtnClick(".")}>
                  .
                </button>
                <button
                  className="btn eql-btn"
                  onClick={() => calculateResult()}
                >
                  =
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="option-div">
          <button className="history-icon" onClick={toggleHistory}>
            {showHistory ? (
              // close History
              <svg
                className="split"
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g id="style=fill">
                    {" "}
                    <g id="close-circle">
                      {" "}
                      <path
                        id="Subtract"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM8.46967 8.46967C8.76257 8.17678 9.23744 8.17678 9.53033 8.46967L12 10.9393L14.4697 8.46967C14.7626 8.17678 15.2374 8.17678 15.5303 8.46967C15.8232 8.76257 15.8232 9.23744 15.5303 9.53033L13.0606 12L15.5303 14.4697C15.8232 14.7626 15.8232 15.2374 15.5303 15.5303C15.2374 15.8232 14.7625 15.8232 14.4696 15.5303L12 13.0607L9.53033 15.5303C9.23743 15.8232 8.76256 15.8232 8.46967 15.5303C8.17678 15.2374 8.17678 14.7625 8.46967 14.4696L10.9393 12L8.46967 9.53033C8.17678 9.23743 8.17678 8.76256 8.46967 8.46967Z"
                        fill="#ffffff"
                      ></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            ) : (
              // Show History
              <svg
                className="split"
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.01112 11.5747L6.29288 10.2929C6.68341 9.90236 7.31657 9.90236 7.7071 10.2929C8.09762 10.6834 8.09762 11.3166 7.7071 11.7071L4.7071 14.7071C4.51956 14.8946 4.26521 15 3.99999 15C3.73477 15 3.48042 14.8946 3.29288 14.7071L0.292884 11.7071C-0.0976406 11.3166 -0.0976406 10.6834 0.292884 10.2929C0.683408 9.90236 1.31657 9.90236 1.7071 10.2929L3.0081 11.5939C3.22117 6.25933 7.61317 2 13 2C18.5229 2 23 6.47715 23 12C23 17.5228 18.5229 22 13 22C9.85817 22 7.05429 20.5499 5.22263 18.2864C4.87522 17.8571 4.94163 17.2274 5.37096 16.88C5.80028 16.5326 6.42996 16.599 6.77737 17.0283C8.24562 18.8427 10.4873 20 13 20C17.4183 20 21 16.4183 21 12C21 7.58172 17.4183 4 13 4C8.72441 4 5.23221 7.35412 5.01112 11.5747ZM13 5C13.5523 5 14 5.44772 14 6V11.5858L16.7071 14.2929C17.0976 14.6834 17.0976 15.3166 16.7071 15.7071C16.3166 16.0976 15.6834 16.0976 15.2929 15.7071L12.2929 12.7071C12.1054 12.5196 12 12.2652 12 12V6C12 5.44772 12.4477 5 13 5Z"
                    fill="#ffffff"
                  ></path>{" "}
                </g>
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Render History component if showHistory is true */}
      {showHistory && (
        <History
          isVisible={showHistory}
          toggleHistory={toggleHistory}
          ans={calcHistory}
          clearHistory={clearHistory}
        />
      )}
    </>
  );
}

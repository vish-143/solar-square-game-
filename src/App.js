import React, { useEffect, useState } from "react";
import '../src/style.css'

const App = () => {
    const [container, setContainer] = useState([]);
    const [showDesign, setShowDesign] = useState(false);

    const updateSolarSquare = (title, newRowData, newColData, num1 = 0, num2 = 0, reduceColData = 0, reduceRowData = 0) => {
        const initBox = []
        for (let i = 0; i < newRowData; i++) {
            initBox[i] = [];
            for (let j = 0; j < newColData; j++) {
                initBox[i][j] = title;
            }
        }
        for (let i = 1; i < newRowData - reduceRowData; i++) {
            for (let j = 1; j < newColData - reduceColData; j++) {
                initBox[i][j] = container[i - num1][j - num2];
            }
        }
        setContainer(initBox);
    }

    const handlerFunction = (val, rowIndex, colIndex) => {
        container[rowIndex][colIndex] = !val;
        setContainer(container);
        let lastRowIndex = container.length - 1,
            lastColIndex = container[0].length - 1, 
            title = false, newRowData = container.length + 1, 
            newColData = container[0].length + 1, rowNumber = 0, 
            columnNumber = 0, reduceColData = 0, reduceRowData = 0;

        if (rowIndex === 0) {
            if (colIndex === 0) {
                rowNumber = 1, columnNumber = 1;
            } else if (colIndex === lastColIndex) {
                rowNumber = 1, columnNumber = 0, reduceColData = 1;
            } else if (colIndex !== 0 && colIndex !== lastColIndex) {
                newColData = container[0].length, rowNumber = 1;
            }
        } else if (rowIndex === lastRowIndex) {
            if (colIndex === 0) {
                rowNumber = 0, columnNumber = 1, reduceColData = 0, reduceRowData = 1;
            } else if (colIndex === lastColIndex) {
                reduceColData = 1, reduceRowData = 1, rowNumber = 0, columnNumber = 0;
            } else if (colIndex !== 0 && colIndex !== lastColIndex) {
                reduceColData = 0, reduceRowData = 1, rowNumber = 0, columnNumber = 0,newColData = container[0].length;
            }
        } else if (rowIndex !== 0 && rowIndex !== lastRowIndex) {
            if (colIndex === lastColIndex) {
                reduceColData = 1, reduceRowData = 0, rowNumber = 0, columnNumber = 0, newRowData = container.length;
            } else if (colIndex === 0) {
                reduceColData = 0, reduceRowData = 0, rowNumber = 0, columnNumber = 1, newRowData = container.length;
            } else {
                newRowData = container.length, newColData = container[0].length;
            }
        }
        updateSolarSquare(title, newRowData, newColData, rowNumber, columnNumber, reduceColData, reduceRowData);
    }
    const resetAll = () => {
        let initBox = [], title = false;
        for (let i = 0; i < 4; i++) {
            initBox[i] = [];
            for (let j = 0; j < 4; j++) {
                initBox[i][j] = title;
            }
        }
        setContainer(initBox);
        window.removeEventListener('click', resetAll);
    }
    useEffect(() => {
        window.addEventListener('click', resetAll);
    }, []);

    return (
        <div>
            {container.length === 0 ? <h3 className="gameHeader">Click anywhere to construct initial panel..</h3> :
                <div>
                    {showDesign === false ?
                        <div className="gameContainer">
                            <button className="finalDesign gameButton" onClick={() => showDesign === false ? setShowDesign(true) : setShowDesign(false)}>Final Design</button>
                            <button className="gameButton" onClick={resetAll}>Reset</button>
                        </div>
                        : <div className="gameContainer">
                            <button className="finalDesign gameButton" onClick={() => showDesign === false ? setShowDesign(true) : setShowDesign(false)}>Back to design</button>
                        </div>
                    }
                    {container.map((item, rowIndex) => (
                        <div key={rowIndex} className="gameBoxSquare">
                            {item.map((data, colIndex) => (
                                <div key={colIndex}
                                    onClick={showDesign === false ? () => handlerFunction(data, rowIndex, colIndex) : () => setShowDesign(true)}
                                    className={`solarSquareBox squareBoxField ${data === true && "checkedSquareBox"} 
                        ${data === false ? `solarSquareBox  ${showDesign === false ? 'removeContainer ' : 'removeSquareBox'} ` : 'checkedSquareBox'}`}
                                ></div>
                            ))}
                        </div>
                    ))}
            </div>}
        </div>
    )
}
export default App;
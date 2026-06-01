import { useState, useRef } from "react";

export function Input({studyCase, setStudyCase}) {

    const [inputValue, setInputValue] = useState("");
    const idRef = useRef(1); // タスクのIDを管理するためのref

    function addItem() {
        if(!inputValue) return; // 空のタスクは追加しない

        // 新しいタスクをstudyCaseに追加
        setStudyCase([
            ...studyCase, 
            {
                id: idRef.current++, 
                name: inputValue,
                time: 0,
                isRunning: false 
            }
        ]);
        setInputValue(""); // 入力フィールドをクリア
    }
   
    return (
        <div className="input-container">

            <input  className="input-field" type="text" 
                    placeholder={studyCase.length >= 3 ? "最大3つのタスクまで" : "タスクの名前"} 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    disabled={studyCase.length >= 3} /> 

            <button className="add-btn" 
                    onClick={addItem} 
                    disabled={studyCase.length >= 3}>
                    加
            </button>
        </div>
    );
}
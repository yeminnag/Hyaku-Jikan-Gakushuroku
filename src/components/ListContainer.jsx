import  { useRef , useEffect } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);


export function ListContainer({studyCase , setStudyCase ,setHistory}) {
    
    const intervalRefs = useRef({}) // タイマーのIDを保存するためのref

    function startTimer(id) {
        if (intervalRefs.current[id]) return;  // すでにタイマーが動いている場合は何もしない

        const startTime = Date.now() - studyCase.find(item => item.id === id).time * 1000; // 経過時間を考慮して開始時間を計算

        // 1秒ごとに時間を更新するタイマーを開始
        intervalRefs.current[id] = setInterval(() => {
            // studyCaseの該当するタスクの時間を更新
            setStudyCase((prev) =>
                prev.map((item) =>{

                    // タスクが該当しない、または すでに停止している場合は何もしない
                    if(item.id !== id || !item.isRunning) return item;

                    // 経過時間を秒単位で計算
                    const elapsedTime = Math.floor((Date.now() - startTime) / 1000); 

                    // タイマーが360000秒に達したら自動的に停止する
                    if (elapsedTime >= 360000) {
                        clearInterval(intervalRefs.current[id]);
                        intervalRefs.current[id] = null;
                        return { ...item, time: 360000, isRunning: false };
                    }

                    // タイマーが360000秒に達していない場合は、経過時間を更新してタイマーを継続する
                    return { ...item, time: elapsedTime , isRunning: true };
                    
                })
            );
        }, 1000);
        
        // タイマーが開始されたことをstateに反映
        setStudyCase((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isRunning: true } : item
            )
        );
    }

    // コンポーネントがマウントされたときに、ブラウザをリフレッシュしても, studyCaseの中でisRunningがtrueのタスクに対してタイマーを開始する
    useEffect(() => {
        studyCase.forEach((item) => {
            if (item.isRunning) {
                startTimer(item.id);
            }
        }
    )}, []);


    // タイマーを停止する関数
    function endTimer(id) {
        clearInterval(intervalRefs.current[id]);
        intervalRefs.current[id] = null;

        setStudyCase((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isRunning: false } : item
            ));  
    }

    // タスクを削除する関数
    function clearItem(id) {
        clearInterval(intervalRefs.current[id]);
        intervalRefs.current[id] = null;

        // 削除されたタスクを履歴に追加
        setHistory((prev) => [
            ...prev,
            {
                ...studyCase.find(item => item.id === id),
                deletedAt: new Date().toLocaleString() // タスクが削除された日時を追加
            }
        ]);

        // studyCaseから該当するタスクを削除
        setStudyCase((prev) => 
            prev.filter((item) =>
                 item.id !== id
        ));
        
    }

    // 時間を hours:minutes:seconds 形式に変換する関数
    function formatTime(time) {
        return dayjs.duration(time, "seconds").format("HH:mm:ss");
    }

    return(
        <>
            <div className="list-container">
                <ul className="item-list">
                    {studyCase.map((item) => (
                        <li key={item.id} 
                            className={item.isRunning ? "item-container" : "item-container stopping"}>
                                
                            <span className="item-name">
                                    {item.name}
                                <span className="time-up">
                                    {item.time >= 360000 && " 時間になりました‼"}
                                </span>
                            </span>

                            <span className="item-time">
                                {formatTime(item.time)}
                            </span>

                            <span className="item-btns">

                                    {item.isRunning ? (
                                    <button className="end-btn btns" 
                                            onClick={() => endTimer(item.id)}>
                                            止
                                    </button>
                                    ) : (
                                    <button className="start-btn btns" 
                                            onClick={() => startTimer(item.id)}>
                                            始
                                    </button>
                                    )}

                                    <button className="clear-btn btns" 
                                            onClick={() => clearItem(item.id)}>
                                            削
                                    </button>
                            </span>

                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
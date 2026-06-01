export function History({ history, setHistory }) {

  // 履歴をクリアする関数
    function clearHistory() {
        setHistory([]);
    }

    if (history.length === 0) return null;

    return (
        <div className="history-container">
            <div className="history-header">
                <h3>recent</h3>
                <button onClick={clearHistory}>クリア</button>
            </div>
            <ul className="history-list">
                {history.map((item, index) => (
                    <li key={index} className="history-item">
                        <span className="history-item-name">{item.name}</span>
                        <div className="history-item-info">
                            <span><small>終了</small></span>
                            <span><small>{item.deletedAt}</small></span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
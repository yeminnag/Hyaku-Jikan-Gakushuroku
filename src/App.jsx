import './App.css'
import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { Input } from './components/Input'
import { History } from './components/History'
import { ListContainer } from './components/ListContainer'

function App() {

  // ブラウザを閉じても、リフレッシュしても、履歴が消えないようにするため
  // ローカルストレージから履歴を取得
    const [history, setHistory] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem('history')) || []
      }
      catch{
        return []
      }
    })
    useEffect(() => {
      localStorage.setItem('history', JSON.stringify(history))
    }, [history])

   // ローカルストレージからタスクを取得
    const [studyCase, setStudyCase] = useState(() => {
        try { 
            return JSON.parse(localStorage.getItem('studyCase')) || []
        } catch {
            return []
        }
    })
    useEffect(() => {
        localStorage.setItem('studyCase', JSON.stringify(studyCase))
    }, [studyCase])

  return(
    <>
      <Header />
      <div className="main-container">
        <div className="content-container">
          <Input studyCase={studyCase} setStudyCase={setStudyCase} />
          <ListContainer studyCase={studyCase} setStudyCase={setStudyCase} setHistory={setHistory} />
        </div>
        <History history={history} setHistory={setHistory} />
      </div>

    </>
  )
}

export default App
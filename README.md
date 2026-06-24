# 百時間学習録 (Hyaku Jikan Gakushūroku)

A Japanese study case timer app built with React. Track multiple tasks simultaneously, monitor elapsed time, and review your history — all in one place.

URL - https://100-hours-study-timer.vercel.app/

## Features

- **Multiple timers** — run several study cases at the same time, each independently controlled
- **Start / Stop / Delete** — full control over each task with simple one-click buttons
- **Auto-complete** — tasks automatically stop and move to history when the time limit is reached
- **History log** — every completed or deleted task is recorded with a timestamp and status

## Tech Stack

- React (Hooks — `useState`, `useRef`, `useEffect`)
- Day.js (time formatting)
- CSS

## Getting Started

```bash
git clone https://github.com/your-username/百時間学習録.git
cd 百時間学習録
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── ListContainer.jsx   # timer list with start/stop/delete logic
│   └── ...
├── App.jsx
└── main.jsx
```

## Name

**百時間学習録** means *"100-hour study record"* — a nod to the idea of logging focused study time toward a long-term goal.

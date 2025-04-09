import './App.css'
import Quiz from './components/quiz/Quiz'
import MyTimer from './components/timer/Timer'

function App() {
  // const time = new Date();
  // time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

  return (
    <>
      {/* <MyTimer expiryTimestamp={time} /> */}
      <Quiz />
    </>
  )
}

export default App

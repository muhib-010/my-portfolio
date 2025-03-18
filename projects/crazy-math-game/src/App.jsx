import { useState, useEffect } from 'react';
import './App.css';
import MathDisplay from './components/MathDisplay';
import ButtonContainer from './components/ButtonContainer';
import ScoreBoard from './components/ScoreBoard';
import ProgressBar from './components/ProgressBar';
import Result from './components/Result';
import ModeSelector from './components/ModeSelector';

function App() {
  const [rightAns, setRightAns] = useState(null);
  const [score, setScore] = useState(0);
  const [key, setKey] = useState(0);
  const [isLost, setIsLost] = useState(false);
  const [mode, setMode] = useState(0.75)
  const updateMath = () => {
    setKey(prevKey => prevKey + 1);
  };

  function scoreUpdater(isCorrect) {
    if (isCorrect === rightAns) {
      console.log('right');
      setScore(prevScore => prevScore + 1);
    } else {
      console.log('wrong');
      setIsLost(true);
    }
    updateMath();
  }

  function restart() {
    setScore(0);
    setIsLost(false);
    console.log(key)
    setKey(0)
    console.log(key)
  }

  // ✅ Handle key events
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!isLost) {
        if (event.key === 'a') {
          scoreUpdater(false);
        } else if (event.key === 'd') {
          scoreUpdater(true);
        }
      } else {
        if (event.code === 'Space') {
          restart();
        }
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyPress);
    // Cleanup function removes event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isLost, rightAns]); // ✅ Re-run only when `isLost` or `rightAns` changes

  return (
    <div className='main-div h-dvh'>
      {key < 1  && <div className="bg-gray-800 text-white text-sm p-2 rounded-lg w-fit mx-auto opacity-75 my-auto mt-8 z-40">
        <h1 className='text-white font-bold text-lg'>Keybinds</h1>
        <p><span className="text-red-400">A</span> → False</p>
        <p><span className="text-green-400">D</span> → True</p>
      </div>}

      {key < 1 && <ModeSelector setMode={setMode} mode={mode}/>}
      {!isLost && key > 0 && <ProgressBar key={key+1} setIsLost={setIsLost} mode={mode}/>}
      {!isLost && <ScoreBoard score={score} />}
      {!isLost && <MathDisplay setRightAns={setRightAns} key={key} mode={mode}/>}
      {!isLost && <ButtonContainer rightAns={rightAns} scoreUpdater={scoreUpdater} />}
      {isLost && <Result restart={restart} score={score} setKey={setKey}/>}
    </div>
  );
}

export default App;

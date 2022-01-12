import { useState, useEffect } from 'react';
import * as Realm from 'realm-web'
import ClipLoader from "react-spinners/ClipLoader";
import ModalEnd from './ModalEnd';

import './sass/App.scss'

function App() {
  //const [rerender, setRerender] = useState(false);
  const [moves, setMoves] = useState(0); // all the moves taken during the game
  const [nums, setNums] = useState([]);
  const [error, setError] = useState(null);
  const [fetchStatus, setFetchStatus] = useState('idle')
  const [flippedCards, setFlippedCards] = useState([]) // temp array of numbers using data-, max 2 elements
  const [tempCards, setTempCards] = useState([]) // temp array of dom elements, max 2 elements
  const [count, setCounter] = useState(0) // to determine when game ends (when count === length of array divided by 2)
  const [isOpen, setIsOpen] = useState(false) // closing and opening the ModalEnd dialog
  const [inProgress, setInProgress] = useState(false)
  const [timerCount, setTimerCount] = useState(0)
 // const [gameStarted, setGameStarted] = useState(false)
  //const [timeoutGame, setTimeoutGame] = useState(false)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [intervalId, setIntervalId] = useState(0);

  // clearInterval(intervalId)

  const fetchData = async () => {
    setFetchStatus("loading")
    const REALM_APP_ID = "memory-game-qxhym"
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allNumbers = await user.functions.getAllNumbers()
      //setNums(allNumbers.sort(() => Math.random() - 0.5))
      setNums(shuffle(allNumbers))
      setFetchStatus("success")
      //  console.log(nums)
    } catch (err) {
      setError(err)
      setFetchStatus("error")
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    endGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  useEffect(() => {
    if (flippedCards.length === 2) {
      matchCards()
      setMoves(moves + 1) // count each and every move
      setFlippedCards([])
      setTempCards([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flippedCards, moves])

  useEffect(() => {
    setSeconds(timerCount % 60)
    setMinutes(Math.floor(timerCount / 60))
  }, [timerCount])

  /*
  useEffect(() => {
    const btns = document.querySelectorAll(".memory-card")
    if (!inProgress) {
      btns.forEach(btn => {
        btn.classList.add("inactive")
      })
    } else {
      btns.forEach(btn => {
        btn.classList.remove("inactive")
      })
    }
  }, [inProgress])
*/

  /* ---------------------------------------------------------------------------------------
 --              Shuffle Function                                                        --
 --    Shuffle function from http://stackoverflow.com/a/2450976                          --
 --    Credit and inspiration drawn from                                                 --
 --    https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle                        --
 ----------------------------------------------------------------------------------------*/

  function shuffle(array) {
    let currentIndex = array.length,
      temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  /* ------------------------------------------------------------------
    --  STARTTIMER  FUNCTION - START THE TIMER WHEN GAME IS NOT IN   --
    --  PROGRESS OTHERWISE DO NOTHING. FUNCTION FOR SINGLE PLAYER    --
    --                                                               --
    -----------------------------------------------------------------*/

  function handlePlay() {
    setInProgress(!inProgress)
    // if (inProgress === true) {
    //   return;
    // } else {
    startTimer()
    // }

  }

  function startTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
      return;
    }

    const newIntervalId = setInterval(() => {
      setTimerCount(prevCount => prevCount + 1);
    }, 1000);
    setIntervalId(newIntervalId);

  }

  function flipCard(e) {
    const parent = e.target.closest("button")
    //  console.log(flippedCards.concat(parent.dataset.cardnum))
    //  console.log(tempCards.concat(parent))

    if (parent.classList.contains("flip")) {
      return
    } else {
      parent.classList.add("flip")
      setTempCards(tempCards.concat(parent))
      setFlippedCards(flippedCards.concat(parent.dataset.cardnum))
    }
  }

  function matchCards() {
    let [first, second] = flippedCards
    let [openCard1, openCard2] = tempCards
    if (first !== second) {

      setTimeout(() => {
        openCard1.classList.remove("flip")
        openCard2.classList.remove("flip")
      }, 500)
    } else {
      setCounter(count + 1)
    }

  }

  function endGame() {
    if (count === nums.length / 2) {
      setIsOpen(!isOpen);
      setInProgress(false)
      clearInterval(intervalId)

    }
  }

  function modalEndControl() {
    setIsOpen(!isOpen)
    resetGame()
    startTimer()
  }

  function resetGame() {
    const btns = document.querySelectorAll(".memory-card")
    setCounter(0)
    setMoves(0)
    // setInProgress(false)
    setTimerCount(0)
    btns.forEach(btn => btn.classList.remove('flip'))
    setNums(shuffle(nums))

  }

  if (fetchStatus === 'idle' || fetchStatus === 'loading') {
    return <div className='loading'>
      <h2 className='loading-title'>Loading...</h2>
      <ClipLoader />
    </div>
  }

  if (fetchStatus === error) {
    return <div className='loading-error'>
      <h2 className='loading-error-title'>Something went wrong!!</h2>
    </div>
  }




  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='heading-title'>Memory game</h1>
        <div className="display-center">
          <p className='main-moves-stats'>
            <span>Moves</span>
            <span>{moves}</span>
          </p>
          <p className='main-time-stats'>
            <span>Time</span>
            <span>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</span>
          </p>
        </div>

      </header>

      <main className='main'>
        <div className='memory-game'>
          {nums && nums.map(num => {
            return <button key={num._id} className='memory-card' onClick={flipCard} data-cardnum={num.num}>
              <span className="front-face">{num.num} </span>
              <span className="back-face"></span>
            </button>
          })}
        </div>

        <button className='play-game-btn' onClick={handlePlay}>{inProgress ? "Pause Game" : "Play Game"}</button>

      </main>
      <ModalEnd openModal={isOpen} click={modalEndControl} moves={moves} time={`${minutes}:${seconds}`} />
    </div>
  );
}

export default App;

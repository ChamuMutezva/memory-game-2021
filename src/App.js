import { useState, useEffect } from 'react';
import * as Realm from 'realm-web'


import './App.css';
//import CardButton from './CardButton';
//import ModalStart from './ModalStart';

function App() {
  const [rerender, setRerender] = useState(false);
  const [nums, setNums] = useState([]) 
  const [error, setError] = useState(null)
  const [fetchStatus, setFetchStatus] = useState('idle')
  const fetchData = async () => {
    setFetchStatus("loading")
    const REALM_APP_ID = "memory-game-qxhym"
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allNumbers = await user.functions.getAllNumbers()
      setNums(allNumbers.sort(() => Math.random() - 0.5))     
      setRerender(!rerender)
      setFetchStatus("success")
      console.log(nums)
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
    
   handleClick()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  if (fetchStatus === "idle" || fetchStatus === "loading") {
    return <div><h2>Loading...</h2></div>
  }

  if (fetchStatus === error) {
    return <div><h1>Something went wrong!!</h1></div>
  }

  function handleClick() {    
    setRerender(!rerender)
    setNums(nums.sort(() => Math.random() - 0.5))
    console.log(nums)
  }

  

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='heading-title'>memory game</h1>
                
      </header>
     
      <main className='main'>
        <div className='container'>
          {/*
          {nums && nums.map(num => <CardButton key={num.id} num={num.num} />)}
          */}
          {nums && nums.map(num => {
            return <button key={num._id} className='num-btn'>
              <span className="card-front">{num.num}</span>
              <span className="card-back"></span>
              </button>
          })}
        
        </div>
        <button onClick={handleClick}>Shuffle Cards</button>
      </main>

    </div>
  );
}

export default App;

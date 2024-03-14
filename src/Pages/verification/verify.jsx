import { useState, useEffect } from 'react';

import VerifyBox from '../../Components/VerifyBox/verifyBox';

import './verify.css'

const steps = [
  {
    question: "What is your name?"
  },
  {
    question: "What is your Date Of Birth?"
  },
  {
    question: "What is your Address?"
  },
]

const answers = []

const Verify = () => {


  const [count, setCount] = useState(0)

  useEffect(()=>{
    const speak = () => {
        const text = new SpeechSynthesisUtterance(steps[count].question);
        window.speechSynthesis.speak(text);
    }
    speak();
  },[count])

  const getData = (data) => {
    answers[count] = data;
  }

  const nextButton = () => {
    setCount(count+1);
  }

  const previousButton = () => {
    setCount(count-1);
  }


  return(
    <main>
      <VerifyBox question={steps[count].question} dataSubmit={getData}/>
      <div className='pagination'>
        <button onClick={previousButton}>Previous</button>
        <button onClick={nextButton}>Next</button>
      </div>
      <button onClick={()=>console.log(answers)}>View data</button>
    </main>

  )
}

export default Verify

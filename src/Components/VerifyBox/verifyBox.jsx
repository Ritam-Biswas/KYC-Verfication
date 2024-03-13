import { useEffect, useState } from 'react'
import 'regenerator-runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VerifyBox = ({question, dataSubmit}) => {
  
    const [inputValue, setInputValue] = useState('')

    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
  
    const changeHandler = (event) => {
      const value = event.target.value;
      setInputValue(value);
    }
  
    const submitHandler = (event) => {
      event.preventDefault();
      setInputValue(transcript)
      resetTranscript();
      dataSubmit(inputValue);
    }
  
    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
  
    const resetHandler = () => {
      resetTranscript();
      setInputValue('');
    }
  
    const stopListening = () => {
      SpeechRecognition.stopListening();
      console.log(transcript)
      setInputValue(transcript);
    }

    const repeatQuestion = () => {
        const text = new SpeechSynthesisUtterance(question);
        window.speechSynthesis.speak(text);
    }
  
  
  
    return (
      <main className='verify-main-container'>
  
          <div className='text-content'>
            <h1>Verification</h1>
            <p>Please answer or fill in the following details to get your KYC verified</p>
          </div>
  
          <div className='details-container'>
  
            <p>{question}</p>

            <button onClick={repeatQuestion}>Repeat</button>
  
            <form onSubmit={submitHandler}>
  
              <input type="textarea" name='answer' value={inputValue} onChange={changeHandler}/>
  
              <div className='buttons-container'>
                <button onClick={startListening}>Start Listening</button>
                <button onClick={stopListening}>Stop Listening</button>
                {/* <button type='sumbit' onClick={submitHandler}>Submit</button> */}
                <button onClick={resetHandler}>Reset</button>
              </div>
  
              {(!browserSupportsSpeechRecognition)?<p>Speech Not Supported</p>:null}
  
            </form>
  
          </div>
      </main>
    )

}

export default VerifyBox

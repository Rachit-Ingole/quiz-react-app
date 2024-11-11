import { useState } from 'react'
import HomePage from './components/HomePage'
import QuizPage from './components/QuizPage'

function App() {
  const [questionArray , setQuestionArray] = useState([])
  function handleStart(){
    console.log("here")
    async function getQuestions() {
      try{
        const url = "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple";
        
        const res = await fetch(url);
        const apiData = await res.json();
        if(apiData.results == undefined){
          console.log("API ERROR")
          return
        }
        setQuestionArray(apiData.results);
        console.log(apiData.results)
      }catch{
        console.log("API ERROR")
      }
    }
    getQuestions();
  }


  return (
    
    <>
      {questionArray.length != 0 ? <QuizPage questionArray={questionArray} handleStart={handleStart}/> : <HomePage handleStart={handleStart}/> }
    </>
  )
}

export default App
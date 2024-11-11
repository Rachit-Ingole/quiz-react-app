import { useEffect, useState } from 'react'
import HomePage from './components/HomePage'
import QuizPage from './components/QuizPage'
import SelectionPage from './components/SelectionPage'

function App() {
  const [questionArray , setQuestionArray] = useState([])
  const [selectPage , setSelectPage] = useState(false)

  function handleStart(url){
    console.log("here")
    if(!url){
      if(localStorage.getItem("selectionData")){
        let formData = JSON.parse(localStorage.getItem("selectionData"))
        let categoryData = {"genk":9,"books":10,"film":11,"music":12,"videogame":15,"boardgame":16,"comp":18,"math":19,"sport":21,"geo":22,"his":23,"politics":24,"art":25,"vehicle":28,"anime":31,"cartoon":32}
        var url = "https://opentdb.com/api.php?" + `amount=${formData.quantity}` + (formData.category == "any" ? "" : `&category=${categoryData[formData.category]}`) + (formData.difficulty == "any" ? "" : `&difficulty=${formData.difficulty}`) + (formData.type =="any" ? "" : `&type=${formData.type}`) 
      }else{
        console.log("how did this happen?")
        return
      }
    }
    
    async function getQuestions() {
        console.log(url)      
        const res = await fetch(url);
        const apiData = await res.json();
        if(apiData.results == undefined){
          throw "error";
        }
        setQuestionArray(apiData.results);
        console.log(apiData.results)
      
    }
    getQuestions();
  }

  useEffect(()=>{
    if (localStorage.getItem("data-QA&SO")){
      setQuestionArray(JSON.parse(localStorage.getItem("data-QA&SO")).questionArray)
    }
  },[])

  function handleGoToSelection(){
    setSelectPage(true)
  }

  return (
    
    <>
      {selectPage || questionArray.length != 0 ? 
        questionArray != 0 ?  <QuizPage questionArray={questionArray} setQuestionArray={setQuestionArray} handleStart={handleStart}/>: <SelectionPage handleStart={handleStart}/> 
        : <HomePage handleGoToSelection = {handleGoToSelection}/> }
    </>
  )
}

export default App

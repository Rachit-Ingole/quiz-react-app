import React, { useEffect, useState } from 'react'

export default function QuizPage(props) {
    const {setQuestionArray,questionArray,handleStart,setSelectPage} = props;
    const [selectedOptions , setSelectedOptions] = useState(()=>{
        if (localStorage.getItem("data-QA&SO")){
            return JSON.parse(localStorage.getItem("data-QA&SO")).selectedOptions
        }
        return [-1,-1,-1,-1,-1]})
    const [submitted,setSubmitted] = useState(()=>{
        if (localStorage.getItem("data-QA&SO")){
            return JSON.parse(localStorage.getItem("data-QA&SO")).submitted
        }
        return false})
    const [answers,setAnswers] = useState(()=>{
        let op = []
        questionArray.map((questionValue,questionIndex)=>{
            let answer = questionValue.correct_answer
            op.push(answer)
        })
        return op
    })
    const [myDic,setMyDic] = useState(()=>{
        var my_dic = {};
        questionArray.map((questionValue,questionIndex)=>{
            let op = [...questionValue.incorrect_answers]
            let answer = questionValue.correct_answer
            op = op.toSpliced(Math.floor(Math.random() * 4),0,answer)
            my_dic[questionValue.question] = op
            
        })
        return my_dic
    })


    useEffect(()=>{
        setMyDic(()=>{
            var my_dic = {};
            questionArray.map((questionValue,questionIndex)=>{
                let op = [...questionValue.incorrect_answers]
                let answer = questionValue.correct_answer
                op = op.toSpliced(Math.floor(Math.random() * 4),0,answer)
                op = shuffleArray(op)
                my_dic[questionValue.question] = op
                
            })
            return my_dic
        })
        setAnswers(()=>{
            let op = []
            questionArray.map((questionValue,questionIndex)=>{
                let answer = questionValue.correct_answer
                op.push(answer)
            })
            return op
        })

    

    },questionArray)

    
    useEffect(()=>{
        localStorage.setItem("data-QA&SO", JSON.stringify({"questionArray":questionArray,"selectedOptions":selectedOptions,"submitted":submitted}))
    },[questionArray,selectedOptions,submitted])


    function shuffleArray(array) {
        for (var i = array.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }


    function decodeHTMLEntities(text) {
        const textarea = document.createElement('textarea'); 
        textarea.innerHTML = text; 
        return textarea.value;
    }
    function handleGoHome(){
        localStorage.setItem("data-QA&SO", JSON.stringify({"questionArray":[],"selectedOptions":[-1,-1,-1,-1,-1],"submitted":false}))
        setSelectPage(false)
        setQuestionArray([])
    }
    function handleSelectedOptions(event,questionIndex){
        if(submitted){return}
        let options = Array.from(selectedOptions);
        options[questionIndex] = event.target.innerText;
        setSelectedOptions(options);
    }
    
    function handleSubmit(){
        if(!submitted){
            setSubmitted(true)
        }else{
            handleStart()
            setSubmitted(false)
            setSelectedOptions([-1,-1,-1,-1,-1])
        }
    }

    function calculateScore(){
        let s = 0
            for(let i=0;i<answers.length;i++){
                if(answers[i] == selectedOptions[i]){
                    s+=1
                }
            }
        return s
    }

    function checkStatus(index,option){
        if(answers[index] == option){
            return "correctOption"
        }else if(selectedOptions[index] == option){
            return "incorrectOption"
        }else{
            return "reduceOpacity"
        }
    }
    
    return (
    <div className="quizPage">
        <div className='questionContainer'>
            {Object.entries(myDic).map(([question,options],questionIndex)=>{
                return (
                <div key={questionIndex}>
                    <h2>{decodeHTMLEntities(question)}</h2>
                    <div className='optionContainer'>
                        {options.map((option,optionIndex)=>{
                            return (<button onClick={(event)=>handleSelectedOptions(event,questionIndex)} key={optionIndex} questionindex={questionIndex} className={"option " + (decodeHTMLEntities(`${selectedOptions[questionIndex]}`.trim()) == decodeHTMLEntities(`${option}`.trim()) && !submitted ? "selectedOption ":"" + (submitted ? checkStatus(questionIndex,option) : "notSub "))} >{decodeHTMLEntities(option)}</button>)
                        })}
                    </div>
                <hr/>    
                </div>
                
            )
            })}
        </div>
        <div className='info-bar'>
            {submitted && <h3>You scored {calculateScore()}/{answers.length} in the quiz</h3>}
            <button className='submitButton homeButton' onClick={handleGoHome}>Go to Home</button>
            <button className='submitButton' onClick={handleSubmit}>{submitted ? "Play Again" : "Check Answers"}</button>
        </div>
        
    </div>
    
  )
}

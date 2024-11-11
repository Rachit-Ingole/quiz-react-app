import React, { useEffect, useState } from 'react'

export default function QuizPage(props) {
    const {questionArray,handleStart} = props;
    const [selectedOptions , setSelectedOptions] = useState([-1,-1,-1,-1,-1])
    const [submitted,setSubmitted] = useState(false)
    const [score,setScore] = useState(0)
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
        setSelectedOptions([-1,-1,-1,-1,-1])
        setSubmitted(false)
        setScore(0)
        setMyDic(()=>{
            var my_dic = {};
            questionArray.map((questionValue,questionIndex)=>{
                let op = [...questionValue.incorrect_answers]
                let answer = questionValue.correct_answer
                op = op.toSpliced(Math.floor(Math.random() * 4),0,answer)
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

        console.log(questionArray)

    },questionArray)

    function decodeHTMLEntities(text) {
        const textarea = document.createElement('textarea'); 
        textarea.innerHTML = text; 
        return textarea.value;
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
            let s = 0
            for(let i=0;i<answers.length;i++){
                if(answers[i] == selectedOptions[i]){
                    s+=1
                }
            }
            setScore(s)
        }else{
            handleStart()

        }
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
                            return (<button onClick={(event)=>handleSelectedOptions(event,questionIndex)} key={optionIndex} questionindex={questionIndex} className={"option " + (selectedOptions[questionIndex] === option && !submitted ? "selectedOption ":"" + (submitted ? checkStatus(questionIndex,option) : "notSub "))} >{decodeHTMLEntities(option)}</button>)
                        })}
                    </div>
                <hr/>    
                </div>
                
            )
            })}
        </div>
        <div className='info-bar'>
            {submitted && <h3>You scored {score}/{answers.length} in the quiz</h3>}
            <button className='submitButton' onClick={handleSubmit}>{submitted ? "Play Again" : "Check Answers"}</button>
        </div>
        
    </div>
    
  )
}

import React from 'react'

export default function HomePage(props) {
    const {handleStart} = props;
    return (
    <div className='homePage'>
        <h1><span>Quizz</span>ical</h1>
        <h5>Welcome to Quizzical<br/>Get <span>ready</span> for the challenge ahead</h5>
        <button onClick={handleStart}>Start Quiz</button>
    </div>
  )
}

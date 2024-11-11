import React,{ useEffect, useState } from 'react'



export default function SelectionPage(props) {
    const {handleStart} = props
    const [formData,setFormData] = useState(()=>{
        if(localStorage.getItem("selectionData")){
            return JSON.parse(localStorage.getItem("selectionData"))
        }else{return {quantity:5,category:"any",difficulty:"any",type:"any"}
        }
    })


    function handleChange(event){
        localStorage.setItem("selectionData",JSON.stringify({...formData,[event.target.name]:event.target.value}))
        setFormData({...formData,[event.target.name]:event.target.value})
        
    }

    function handleFormSubmit(event){
        if(formData.quantity<1 || formData.quantity>25){
            alert("number of questions must be less than 25 and greater than 0")
            return
        }
        event.preventDefault()
        let categoryData = {"genk":9,"books":10,"film":11,"music":12,"videogame":15,"boardgame":16,"comp":18,"math":19,"sport":21,"geo":22,"his":23,"politics":24,"art":25,"vehicle":28,"anime":31,"cartoon":32}
        
        const url = "https://opentdb.com/api.php?" + `amount=${formData.quantity}` + (formData.category == "any" ? "" : `&category=${categoryData[formData.category]}`) + (formData.difficulty == "any" ? "" : `&difficulty=${formData.difficulty}`) + (formData.type =="any" ? "" : `&type=${formData.type}`) 

        handleStart(url)
    }

    return (
    <div className='selectionPage'>
        <form onSubmit={handleFormSubmit}>
        <h2>Select your <span>Challenge</span></h2>
        <div>
        <h5>Choose number of Questions</h5>
        <input name="quantity" onChange={handleChange} type='number' max="25" min="1" value={formData.quantity} required></input>
        </div>
        <div>
        <h5>Choose Category</h5>
        <select name="category" onChange={handleChange} value={formData.category}>
            <option  value='any'>Any Category</option>
            <option value='genk'>General Knowledge</option>
            <option value='books'>Books</option>
            <option value='film'>Film</option>
            <option value='music'>Music</option>
            <option value='videogame'>Video Games</option>
            <option value='boardgame'>Board Games</option>
            <option value='comp'>Computers</option>
            <option value='math'>Mathematics</option>
            <option value='sport'>Sport</option>
            <option value='geo'>Geography</option>
            <option value='hist'>History</option>
            <option value='politics'>Politics</option>
            <option value='art'>Art</option>
            <option value='vehicle'>Vehicles</option>
            <option value='anime'>Anime and Manga</option>
            <option value='cartoon'>Cartoons and Animation</option>
        </select>
        </div>
        <div>
        <h5>Select Difficulty</h5>
        <select name="difficulty" onChange={handleChange} value={formData.difficulty}>
            <option value="any">Any Difficulty</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
        </select>
        </div>
        <div>
        <h5>Type</h5>
        <select name="type" onChange={handleChange} value={formData.type}>
            <option value='any'>Any Type</option>
            <option value='multiple'>Multiple Choice</option>
            <option value='boolean'>True/False</option>
        </select>
        </div>
        
        <button onClick={handleFormSubmit}>Submit</button>
        </form>
    </div>
  )
}

import { useState, useEffect } from 'react'

function Navbar ({currentDC, setCurrentDC}) {
    const handleClick = () => {
        setCurrentDC({});
    }

    const handlePostClick = () => {
        setCurrentDC('loading');//trigger Display rerender while loading results of post request
        console.log("before fetch", currentDC)

        const inputTitle = document.getElementById('input-title').value;
        const inputDesc = document.getElementById('input-desc').value;
        const url = 'https://react-mvp-ec68.onrender.com/datacards';

        if (inputTitle === '') {
            alert('Title is empty')
            setCurrentDC({});
        } else {
            const dataToSend = {
                dc_title: inputTitle,
                dc_desc: inputDesc
            };
            console.log(dataToSend);
    
            const options = {//define options for POST request
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, //set content type to JSON
                body: JSON.stringify(dataToSend) // Convert the data object to JSON string,
            };
            //make POST request via fetch to server
            fetch(url, options)
            .then((response) => {
                return response.json();//convert json response into js object we can use
            })
            .then((data) => {//take the resulting js data (object) and
                //handle that js data
                console.log("successfully posted: ", data);
                setCurrentDC({});//set currentDC back to empty to rerender display all with posted data
            })
            .catch((err) => {//catch fetch errors
                console.error(err);
            })
        }
    }

    return (
        <div className='box post'>
            <div >
                <input id='input-title' placeholder='title'></input>
                <input id='input-desc' placeholder='desc'></input>
                <button className='btn' onClick={handlePostClick}>post</button>
            </div>
            <button className='btn' onClick={handleClick}>display all datacards</button>
            
        </div>
    )
}
    
export default Navbar
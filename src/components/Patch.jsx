import {useState} from 'react';

function Patch(props) {
    const { currentDC, setCurrentDC } = props;
    const handleClick = () => {

        
        const url = `http://localhost:8000/datacards/${currentDC.dc_id}`;
        
        const inputTitle = document.getElementById('input-title').value;
        const inputDesc = document.getElementById('input-desc').value;
        
        const dataToSend = {//send the values in the input fields as title and desc
            dc_title: inputTitle,
            dc_desc: inputDesc
        };

        console.log(dataToSend);

        const options = {//define options for PATCH request
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, //set content type to JSON
            body: JSON.stringify(dataToSend) // Convert the data object to JSON string,
        };

        fetch(url, options)//make the fetch call
        .then(res => res.json())//parse json res into js object we can use here and return
        .then((data) => {
            console.log("successfully patched: ", data);

            setCurrentDC({});//update display to display all with patched dc
            //TODO display only edited datacard
        })
        .catch(err => console.error(err))
    };
    

    return (
        <div className='patch'>
                <input id='input-title' placeholder={currentDC.dc_title}></input>
                <input id='input-desc' placeholder={currentDC.dc_desc}></input>
                <button className='btn' onClick={handleClick}>patch</button>
            </div>
    )
}

export default Patch
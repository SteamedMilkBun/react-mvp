import { useState } from 'react'

function Navbar ({setCurrentDC}) {
    const handleClick = () => {
        setCurrentDC({});
    }

    return (
        <div>
            <h3>Navbar</h3>
            <div className='post'>
                <input placeholder='input field for post'></input>
                <button>post</button>
            </div>
            
            <button onClick={handleClick}>display all datacards</button>
        </div>
    )
}
    
export default Navbar
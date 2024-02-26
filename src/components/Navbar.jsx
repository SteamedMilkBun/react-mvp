import { useState } from 'react'

function Navbar () {
    return (
        <div>
            <h3>Navbar</h3>
            <div className='post'>
                <input placeholder='input field for post'></input>
                <button>post</button>
            </div>
            
            <button>display all datacards</button>
        </div>
    )
}
    
export default Navbar
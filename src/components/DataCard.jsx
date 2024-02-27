import { useState } from 'react'

function Datacard({ currentDC, setCurrentDC, dc, title }) {
    //console.log(dc);

    const handleClick = () => {
        setCurrentDC(dc);
    }

    return (
        <>
            <div className='dc' onClick={handleClick}>
                <h3>{title}</h3>
            </div>
        </>
    )
}

export default Datacard
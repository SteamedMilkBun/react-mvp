import { useState } from 'react'

function Datacard({ displayAll, setDisplayAll, currentDC, setCurrentDC, dc, title, desc }) {
    console.log(dc);

    const handleClick = () => {
        setCurrentDC(dc);
        setDisplayAll(!displayAll);
    }

    return (
        <div className='dc' onClick={handleClick}>
            <h3>{title}</h3>
        </div>
    )
}

export default Datacard
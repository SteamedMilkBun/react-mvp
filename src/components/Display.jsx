import { useEffect, useState } from 'react'
import Datacard from './DataCard'

function Display ({ currentDC, setCurrentDC }) {
    const [data, setData] = useState([]);
    const [patchData, setPatchData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://react-mvp-ec68.onrender.com/datacards`);
                const data = await res.json();
                setData(data);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [currentDC]);

    const handleDeleteClick = () => {
        setCurrentDC('loading');
        const id = currentDC.dc_id;
        const url = `https://react-mvp-ec68.onrender.com/datacards/${id}`;
        const options = {
            method: 'DELETE',
        };
        
        fetch(url, options)       
        .then(() => {
            console.log("successful delete");
            setCurrentDC({});
        })
        .catch((err) => {
            console.error(err);
        })
    };

    const handlePatchClick = () => {
        const url = `https://react-mvp-ec68.onrender.com/datacards/${currentDC.dc_id}`;
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patchData)
        };
        
        fetch(url, options)
        .then(res => res.json())
        .then((data) => {
            console.log("successfully patched: ", data);
            setCurrentDC({});
            setPatchData({});
        })
        .catch(err => console.error(err))
    }

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setPatchData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    useEffect(() => {
        console.log('currentDC, ran on every currentDC change: ', currentDC);
    }, [currentDC]);

    if (Object.keys(currentDC).length === 0) {
        return (
            <div className='box display'>
                <h3>Result of Get All</h3>
                {data.map((element) => (
                    <Datacard
                        dc={element}
                        key={element.dc_id}
                        title={element.dc_title}
                        currentDC={currentDC}
                        setCurrentDC={setCurrentDC}
                    />
                ))}
            </div>
        )
    } else if (currentDC === 'loading') {
        return <h1>LOADING</h1>
    } else {
        return (
            <div className='box'>
                <h3>Patch or Delete</h3>
                <input id='dc_title' placeholder={currentDC.dc_title} value={patchData.dc_title} onChange={handleInputChange}></input>
                <input id='dc_desc' placeholder={currentDC.dc_desc} value={patchData.dc_desc} onChange={handleInputChange}></input>
                <button id='patch' onClick={handlePatchClick}>Patch</button>
                <button id='delete' onClick={handleDeleteClick}>Delete</button>
            </div>
        )
    } 
}

export default Display

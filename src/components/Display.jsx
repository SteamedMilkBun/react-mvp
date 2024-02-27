import { useEffect, useState } from 'react'
import Datacard from './DataCard'

function Display ({ currentDC, setCurrentDC }) {
    const [data, setData] = useState([]);
    const [patchData, setPatchData] = useState({ dc_title: '', dc_desc: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:8000/datacards`);
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
        const url = `http://localhost:8000/datacards/${id}`;
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
        const url = `http://localhost:8000/datacards/${currentDC.dc_id}`;
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

    if (Object.keys(currentDC).length === 0) {
        return (
            <div>
                <h3>Display all</h3>
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
            <>
                <h3>Display Card: {currentDC.dc_id}</h3>
                <input id='dc_title' placeholder={currentDC.dc_title} value={patchData.title} onChange={handleInputChange}></input>
                <input id='dc_desc' placeholder={currentDC.dc_desc} value={patchData.desc} onChange={handleInputChange}></input>
                <button id='patch' onClick={handlePatchClick}>Patch</button>
                <button id='delete' onClick={handleDeleteClick}>Delete</button>
            </>
        )
    } 
}

export default Display

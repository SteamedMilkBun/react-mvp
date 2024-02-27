import { useEffect, useState } from 'react'
import Datacard from './DataCard'

function Display ({currentDC, setCurrentDC}) {
    const [data, setData] = useState([]);

    console.log("currentDC: ", currentDC);

    useEffect(() => {
        //define function to fetch all datacards
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:8000/datacards`);

                // Parse the JSON response
                const data = await res.json();
                console.log(data);
                // Update state with fetched data
                setData(data);//data becomes jsonData, which is an array of objects
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [currentDC]);

    if(Object.keys(currentDC).length === 0){
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
    }
    else if (currentDC === 'loading') {
        return <h1>LOADING</h1>
    }
    else {
        return (
            <>
                <h3>Display Card: {currentDC.dc_id}</h3>
                <p>{currentDC.dc_title}</p>
                <p>{currentDC.dc_desc}</p>
            </>
        )
    }
        
    
}

export default Display
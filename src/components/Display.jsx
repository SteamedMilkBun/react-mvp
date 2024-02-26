import { useEffect, useState } from 'react'
import Datacard from './DataCard'

function Display (display, setDisplay) {
    const [data, setData] = useState(null);

    useEffect(() => {
        //define function to fetch all datacards
        const fetchData = async () => {
            try {
                const res = fetch(`http://localhost:8000/datacards`);

                // Check if the response is successful
                if (!res.ok) {
                    throw new Error('Failed to fetch data from http://localhost:8000/datacards');
                }

                // Parse the JSON response
                const jsonData = await res.json();
                // Update state with fetched data
                setData(jsonData);
            }
            catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    //if display is display all, show all datacards
    if (display === 'display all') {
        return (
                <div>
                    <h3>Display</h3>
                    <p>{data}</p>
                </div>
            )
    }
    //otherwise display selected datacard
    else {
        return (
            <div>
                <Datacard />
            </div>
        )
    }
    
}

export default Display
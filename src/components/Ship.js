import React, { useState, useEffect } from 'react'

function Ship() {
    const [ship, setShip] = useState([]);
    const [shipName, setShipName] = useState("");

    useEffect(() => {
        const getShip = async () => {
            try{
                let fetchData = await fetch('https://api.spacexdata.com/v3/ships');
                let resData = await fetchData.json();
                setShip(resData);
            }
            catch(err){
                alert(err);
            }
        }
        getShip();
    },[])

    const searchShipName = (shipName) => 
        ship.filter((data) => {
            return shipName === "" || data.ship_name.toLowerCase().includes(shipName.toLowerCase()) || data.ship_type.toLowerCase().includes(shipName.toLowerCase())? data : null
        }).map((data) => {
            let name = data.ship_name;
            let image = data.image;
            let id = data.ship_id;
            let type = data.ship_type;
            let weight = data.weight_kg;
            return <tr key={id}>
                <td>{image == null ? "NO IMAGE IN API": <img src={image} width="150" height="150" alt="" />}</td>
                <td>{name}</td>
                <td>{type}</td>
                <td>{weight == null ? "NO WEIGHT IN API": weight + " KG"}</td>
            </tr>
        });

    return (
        <div className="mainContainer">
            <div className="searchContainer">
                <input className="searchBox" type="text" placeholder="SEARCH SHIP NAME OR SHIP TYPE" value={shipName} onChange={(e) => {
                    setShipName(e.target.value);
                }} />
            </div>  
            <div className="tableContainer">
                <table>
                    <thead>
                    <tr>
                        <th>Ship Image</th>
                        <th>Ship Name</th>
                        <th>Ship Type</th>
                        <th>Ship Weight</th>
                    </tr>
                    </thead>
                    <tbody>
                        {searchShipName(shipName)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Ship;

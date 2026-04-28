import "./styles/HouseCardStyle.css";
import "./styles/RoomCardStyle.css";

import "./styles/CardStyle.css";

import {houseIcons, houseLabels, type HouseType} from "../types.ts";
interface HousesPageProps {
    house: HouseType;
    onClick: (house: HouseType) => void;
}

export const Card = ({house, onClick}: HousesPageProps) => {
    const name = houseLabels[house];
    const imageUrl = houseIcons[house];
    
    return (
        <button className="card" onClick={() => onClick(house)}>
            <div className="room">
                <img src={imageUrl} alt={`${name} crest`} className="image-position" />
                <div>
                    <h3>{name}</h3>
                </div>
            </div>
        </button>        
    )
} 
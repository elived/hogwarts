import "./styles/HouseCardStyle.css";
interface HousesPageProps {
    name: string;
    imageUrl: string;
    onClick: () => void;
}

export const Card = ({name, imageUrl, onClick}: HousesPageProps) => {
    return (
        <button className="card" onClick={onClick}>
            <div className="house">
                <img src={imageUrl} alt={`${name} crest`} className="image-position" />
                <div>
                    <h3>{name}</h3>
                </div>
            </div>
        </button>        
    )
}
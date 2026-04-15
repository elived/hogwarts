import {Card} from "../components/HouseCard.tsx";
import { useNavigate} from "react-router-dom";
import {HouseType} from "../types.ts";
import "../components/styles/CardStyle.css";


function HousesPage() {
    const navigate = useNavigate();
    
    return(
        <>
            <main className="main">
                <section className="houses">
                    <h2>The Houses of Hogwarts</h2>
                    <div>

                        <Card
                            house={HouseType.Gryffindor}
                            onClick={(house) => 
                                navigate(`/houses/${HouseType[house].toLowerCase()}`)}
                        />

                        <Card
                            house={HouseType.Hufflepuff}
                            onClick={(house) =>
                                navigate(`/houses/${HouseType[house].toLowerCase()}`)}
                        />

                        <Card
                            house={HouseType.Ravenclaw}
                            onClick={(house) =>
                                navigate(`/houses/${HouseType[house].toLowerCase()}`)}
                        />

                        <Card
                            house={HouseType.Slytherin}
                            onClick={(house) =>
                                navigate(`/houses/${HouseType[house].toLowerCase()}`)}
                        />

                    </div>
                </section>
            </main>
        </>
    )
}

export default HousesPage

import {Card} from "../components/HouseCard.tsx";
import { useNavigate} from "react-router-dom";

function HousesPage() {
    const navigate = useNavigate();
    
    return(
        <>
            <main className="main">
                <section className="houses">
                    <h2>The Houses of Hogwarts</h2>
                    <div>

                        <Card
                            name="Gryffindor"
                            imageUrl="/images/gryffindor.png"
                            onClick={() => 
                                navigate(`/houses/gryffindor`)
                            }
                        />

                        <Card
                            name="Hufflepuff"
                            imageUrl="/images/hufflepuff.png"
                            onClick={() =>  navigate(`/houses/hufflepuff`) }
                        />

                        <Card
                            name="Ravenclaw"
                            imageUrl="/images/ravenclaw.png"
                            onClick={() =>
                                navigate(`/houses/ravenclaw`)
                            }
                        />

                        <Card
                            name="Slytherin"
                            imageUrl="/images/slytherin.png"
                            onClick={() =>
                                navigate(`/houses/slytherin`)
                            }
                        />

                    </div>
                </section>
            </main>
        </>
    )
}

export default HousesPage

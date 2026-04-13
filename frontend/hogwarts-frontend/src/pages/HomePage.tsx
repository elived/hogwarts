//import { useState } from 'react'

import "../styles/HomePageStyle.css";
import {houses} from "../types.ts";

function HomePage()  {
    

    return(
        <>
            <main className="main">
                <section className="intro">
                    <h2>About Hogwarts</h2>
                    <p>
                        Hogwarts is a magical school located in Scotland, where young witches and wizards receive
                        their education in the magical arts. The school is divided into four houses: 
                    </p>
                    <ul className="custom-list">
                        {houses.map((house) => (
                            <li 
                                key={house.name}>
                                <img src={house.icon} alt={`${house.name} icon`} className="custom-list-img"/>
                                {house.name}
                            </li>
                        ))}
                    </ul>
                    <p>
                        Each house has its own unique characteristics and values,
                        and students are sorted into their respective houses upon arrival at Hogwarts. 
                        <br/>
                        <br/> The school offers a wide range of magical subjects, including Potions, Transfiguration, 
                        Charms, Defense Against the Dark Arts, and more. Hogwarts is also home to many magical
                        creatures and has a rich history filled with legendary wizards and witches.
                    </p>
                </section>
            </main>
        </>
    )
}

export default HomePage

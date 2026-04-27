//import { useState } from 'react'

import "../styles/HomePageStyle.css";
import {houseIcons, houseLabels, HouseType} from "../types.ts";

function AboutPage()  {
    const houseValues = Object.values(HouseType).filter(
        v => typeof v === "number"
    ) as HouseType[];


    return(
        <>
            <main className="main">
                <section className="intro">
                    <h2>About Hogwarts</h2>

                    <p>
                        Hogwarts School of Witchcraft and Wizardry is a legendary magical institution
                        located deep in the Scottish Highlands. For centuries, it has been the place
                        where young witches and wizards learn to master their magical abilities and
                        discover who they truly are.
                    </p>

                    <p>
                        Upon arrival, students are sorted into one of four houses, each representing
                        different values, strengths, and traditions:
                    </p>

                    <ul className="custom-list">
                        {houseValues.map((house) => (
                            <li 
                                key={house}>
                                <img src={houseIcons[house]} alt={`${houseLabels[house]} icon`} className="custom-list-img"/>
                                {houseLabels[house]}
                            </li>
                        ))}
                    </ul>
                    <p>
                        Each house has its own unique characteristics and values,
                        and students are sorted into their respective houses upon arrival at Hogwarts. 
                        
                    </p>
                </section>

                <section className="intro">
                    <h2>Life at Hogwarts</h2>
                    <p>
                        Life at Hogwarts is more than just lessons and exams. Students live in
                        their house dormitories, share meals in the Great Hall, and form friendships
                        that last a lifetime.
                    </p>
                    <p>
                        Outside the classroom, students can explore the castle, visit the library,
                        attend magical feasts, and participate in house competitions that strengthen
                        house pride and camaraderie.
                    </p>
                </section>

                <section className="intro">
                    <h2>Magical Education</h2>
                    <p>
                        Hogwarts offers a broad range of magical subjects designed to prepare students
                        for life in the wizarding world. Each subject teaches practical skills as well
                        as discipline and responsibility.
                    </p>
                    <p>
                        Popular subjects include Potions, Transfiguration, Charms, Defense Against the
                        Dark Arts, Herbology, and Care of Magical Creatures.
                    </p>
                </section>

            </main>
        </>
    )
}

export default AboutPage

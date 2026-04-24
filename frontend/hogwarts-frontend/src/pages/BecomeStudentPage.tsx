import { type CreateStudentRequest, HouseType, PetType } from "../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {becomeStudent} from "../api/fetchStudentApi.ts";


type Question = {
    question: string;
    options: { label: string; house: HouseType }[];
};

const questions: Question[] = [
    {
        question: "Which trait describes you best?",
        options: [
            { label: "Brave", house: HouseType.Gryffindor },
            { label: "Ambitious", house: HouseType.Slytherin },
            { label: "Wise", house: HouseType.Ravenclaw },
            { label: "Loyal", house: HouseType.Hufflepuff }
        ]
    },
    {
        question: "What would you do if faced with a challenge?",
        options: [
            { label: "Charge forward", house: HouseType.Gryffindor },
            { label: "Find a clever advantage", house: HouseType.Slytherin },
            { label: "Analyze all possibilities", house: HouseType.Ravenclaw },
            { label: "Ask for help and support others", house: HouseType.Hufflepuff }
        ]
    },
    {
        question: "What matters most to you?",
        options: [
            { label: "Courage", house: HouseType.Gryffindor },
            { label: "Success", house: HouseType.Slytherin },
            { label: "Knowledge", house: HouseType.Ravenclaw },
            { label: "Friendship", house: HouseType.Hufflepuff }
        ]
    },
    {
        question: "Which class would you enjoy the most?",
        options: [
            { label: "Defense Against the Dark Arts", house: HouseType.Gryffindor },
            { label: "Potions", house: HouseType.Slytherin },
            { label: "Charms", house: HouseType.Ravenclaw },
            { label: "Care of Magical Creatures", house: HouseType.Hufflepuff }
        ]
    },
    {
        question: "How do you handle conflict?",
        options: [
            { label: "Face it head‑on", house: HouseType.Gryffindor },
            { label: "Outsmart opponents", house: HouseType.Slytherin },
            { label: "Reason calmly", house: HouseType.Ravenclaw },
            { label: "Seek peace", house: HouseType.Hufflepuff }
        ]
    },
    {
        question: "Your friends would describe you as:",
        options: [
            { label: "Bold", house: HouseType.Gryffindor },
            { label: "Cunning", house: HouseType.Slytherin },
            { label: "Thoughtful", house: HouseType.Ravenclaw },
            { label: "Dependable", house: HouseType.Hufflepuff }
        ]
    },
    {
        question: "What motivates you most?",
        options: [
            { label: "Doing what’s right", house: HouseType.Gryffindor },
            { label: "Achieving greatness", house: HouseType.Slytherin },
            { label: "Learning something new", house: HouseType.Ravenclaw },
            { label: "Helping others", house: HouseType.Hufflepuff }
        ]
    },
    {
        question: "How do you prefer to work?",
        options: [
            { label: "Take the lead", house: HouseType.Gryffindor },
            { label: "Strategically", house: HouseType.Slytherin },
            { label: "Independently", house: HouseType.Ravenclaw },
            { label: "As a team", house: HouseType.Hufflepuff }
        ]
    },
    {
        question: "Which magical object attracts you most?",
        options: [
            { label: "Sword", house: HouseType.Gryffindor },
            { label: "Amulet", house: HouseType.Slytherin },
            { label: "Ancient book", house: HouseType.Ravenclaw },
            { label: "Protective charm", house: HouseType.Hufflepuff }
        ]
    },
    {
        question: "What is your biggest strength?",
        options: [
            { label: "Fearlessness", house: HouseType.Gryffindor },
            { label: "Determination", house: HouseType.Slytherin },
            { label: "Intelligence", house: HouseType.Ravenclaw },
            { label: "Patience", house: HouseType.Hufflepuff }
        ]
    },
    {
        question: "How do you react under pressure?",
        options: [
            { label: "Act immediately", house: HouseType.Gryffindor },
            { label: "Manipulate the situation", house: HouseType.Slytherin },
            { label: "Think it through", house: HouseType.Ravenclaw },
            { label: "Stay calm and supportive", house: HouseType.Hufflepuff }
        ]
    },
    {
        question: "Which quality do you value most in others?",
        options: [
            { label: "Bravery", house: HouseType.Gryffindor },
            { label: "Ambition", house: HouseType.Slytherin },
            { label: "Curiosity", house: HouseType.Ravenclaw },
            { label: "Kindness", house: HouseType.Hufflepuff }
        ]
    },
    {
        question: "If rules stand in your way, you:",
        options: [
            { label: "Break them for a good cause", house: HouseType.Gryffindor },
            { label: "Bend them to your advantage", house: HouseType.Slytherin },
            { label: "Question them", house: HouseType.Ravenclaw },
            { label: "Respect them", house: HouseType.Hufflepuff }
        ]
    },
    {
        question: "What would you do with great power?",
        options: [
            { label: "Protect others", house: HouseType.Gryffindor },
            { label: "Climb to the top", house: HouseType.Slytherin },
            { label: "Study it", house: HouseType.Ravenclaw },
            { label: "Use it responsibly", house: HouseType.Hufflepuff }
        ]
    },
    {
        question: "Which word resonates with you most?",
        options: [
            { label: "Valor", house: HouseType.Gryffindor },
            { label: "Legacy", house: HouseType.Slytherin },
            { label: "Wisdom", house: HouseType.Ravenclaw },
            { label: "Loyalty", house: HouseType.Hufflepuff }
        ]
    }
];


export default function BecomeStudentPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [pet, setPet] = useState<PetType>(PetType.None);
    const [answers, setAnswers] = useState<HouseType[]>([]);

    const answerQuestion = (house: HouseType) => {
        setAnswers(prev => [...prev, house]);
    };

    const submit = async () => {
        if (answers.length !== questions.length) {
            alert("Please answer all questions!");
            return;
        }

        const defaultNames = [
            "Unnamed Wizard",
            "Mysterious Witch",
            "The Chosen One",
            "First-Year Student"
        ];

        const randomName =
            defaultNames[Math.floor(Math.random() * defaultNames.length)];

        const payload: CreateStudentRequest = {
            name: name.trim() || randomName,
            pet,
            answers: answers.map(h => ({ house: h }))
        };


        try {
            await becomeStudent(payload);
            navigate("/student-dashboard");
        } catch (err: any) {
            alert(err.message ?? "Unauthorized");
        }

    };

    return (
        <div>
            <h1>Become a Hogwarts Student</h1>

            <h3>Choose your student's name:</h3>
            <input
                placeholder="Student name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <hr />
            <h2>The Sorting Hat</h2>
            <h3>The quiz below will help the sorting hat choose which house you will belong to, so choose wisely</h3>
            {questions.map((q, index) => (
                <div key={index}>
                    <p> {q.question}</p>

                    {q.options.map(opt => (
                        <button
                            key={opt.label}
                            onClick={() => answerQuestion(opt.house)}
                            disabled={answers.length > index}
                        >
                            {opt.label}
                        </button>
                        
                    ))}
                    <p> <br/> </p>
                </div>
            ))}

            <hr />
            
            <h2>Choose a pet</h2>
            <select
                value={pet}
                onChange={e => setPet(Number(e.target.value))}
            >
                <option value={PetType.None}>None</option>
                <option value={PetType.Cat}>Cat</option>
                <option value={PetType.Owl}>Owl</option>
                <option value={PetType.Rat}>Rat</option>
            </select>
            
            <div>
                <p><br/></p>
                <button onClick={submit}>
                    Finish Sorting 🎩
                </button>
            </div>
            
        </div>
    );
}

import {useNavigate} from "react-router-dom";

export default function NewUserPage() {
    const navigator = useNavigate();
    
    return (
        <main className="main">
            <h1>Hello there!</h1>
            <h2>Are you a new user?</h2>
            <button onClick={() => navigator("/become-student")}>Yes, and i want to become a student</button>
            <button onClick={() => navigator("/student-dashboard")}>No</button>
            <button onClick={() => navigator("/")}>Yes, but i want to browse</button>
        </main>

    )
}
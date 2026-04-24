import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {hasStudentRelation} from "../api/authApi.ts";

export default function NewUserPage() {
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const checkStudent = async () => {
            try {
                const response = await hasStudentRelation();
                
                if (!response) {
                    navigate("/become-student");
                } else {
                    navigate("/profile");
                }
            } catch (err: any) {
                setError(err.message ?? "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        
        checkStudent();
    }, [navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    return null
}
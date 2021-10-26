import { useEffect, useState } from 'react';

const Test = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionId, setCurrentQuestionId] = useState(1);
    useEffect(async () => {
        let data = await fetch('http://localhost:8080/question');
        let results = await data.json();
        setQuestions(results);
    }, []);
    return (
        <>
            <p>Hello Hello Testing Testing Quiz Time</p>
        </>
    );
};

export default Test;

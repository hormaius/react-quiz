import {createContext, useContext, useEffect, useReducer} from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 30;
const initialState = {
    secondsRemaining: null,
    status: "loading",
    questions: [],
    highScore: 0,
    answer: null,
    points: 0,
    index: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready",
            };
        case "dataFailed":
            return {
                ...state,
                status: "error",
            };
        case "start":
            return {
                ...state,
                status: "active",
                secondsRemaining: state.questions.length * SECS_PER_QUESTION,
            };
        case "newAnswer":
            const question = state.questions.at(state.index);
            return {
                ...state,
                answer: action.payload,
                points:
                    action.payload === question.correctOption
                        ? state.points + question.points
                        : state.points,
            };
        case "nextQuestion":
            return {...state, index: state.index + 1, answer: null};
        case "finish":
            return {
                ...state,
                status: "finished",
                highscore:
                    state.points > state.highscore ? state.points : state.highscore,
            };
        case "reset":
            return {
                ...initialState,
                questions: state.questions,
                status: "ready",
            };
        case "tick":
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? "finished" : state.status,
            };

        default:
            throw new Error("Action unknown");
    }
}

function QuizProvider({children}) {
    const [
        {questions, status, index, answer, points, highScore, secondsRemaining},
        dispatch
    ] = useReducer(reducer, initialState);
    const question = questions[index];

    const numQuestions = questions.length;
    const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

    /* useEffects */
    useEffect(function () {
        fetch("http://localhost:8000/questions")
            .then((res) => res.json())
            .then((data) => dispatch({type: "dataReceived", payload: data}))
            .catch((err) => dispatch({type: "dataFailed"}));
    }, []);
    /* useEffects END */

    return <QuizContext.Provider value={{
        questions,
        question,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        maxPoints,
        dispatch
    }}>{children}</QuizContext.Provider>
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined)
        throw new Error("QuizContext was used outside of QuizProvider")
    return context
}

export {QuizProvider, useQuiz};
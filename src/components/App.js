import {useQuiz} from "./contexts/QuizContext";
import FinishScreen from "./FinishScreen";
import StartScreen from "./StartScreen";
import NextButton from "./NextButton";
import Question from "./Question";
import Progress from "./Progress";
import Footer from "./Footer";
import Loader from "./Loader";
import Header from "./Header";
import Error from "./Error";
import Timer from "./Timer";
import Main from "./Main";

function App() {
  const { status } = useQuiz()
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen />
        )}
        {status === "active" && (
          <>
            <Progress/>
            <Question/>
            <Footer>
              <NextButton/>
              <Timer/>
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen/>
        )}
      </Main>
    </div>
  );
}

export default App;

"use client";
import Header from "./components/Header";
import Question from "./components/Question";
import Answer from "./components/Answer";
import { useEffect } from "react";
import { useCourse } from "@/store";
import { useAudio } from "react-use";
import WordList from "./components/WordList";

export default function Page() {

    const { currentMode, fetchCourse, currentCourse, statementIndex, changeStatement} = useCourse();
    const { playSound, audio } = usePlaySound();

    function handleToAnswer() {
        useCourse.setState({ currentMode: "answer" });
    }

    useEffect(() => {
        fetchCourse();
    }, []);

    return (
        <>
            <Header />
            <div className="container mx-auto flex h-full flex-1 flex-col items-center justify-center pb-10 mt-40">
                <div className="flex flex-col items-center justify-center pb-1 pt-4">
                    {currentMode === "question" ? (
                        <Question />
                    ) : (
                        <Answer onPlaySound={playSound}></Answer>
                    )}
                    <div>
                        <Tips
                            text="tab"
                            description="show answer"
                            keyboardKey="Tab"
                            handler={handleToAnswer}
                        ></Tips>
                        <Tips
                            text="control"
                            description="play soundmark"
                            keyboardKey="Control"
                            handler={playSound}
                        ></Tips>
                    </div>
                    {audio}
                </div>
            </div>
            {currentCourse&&(
                <WordList 
                    currentCourse={currentCourse} 
                    statementIndex={statementIndex}
                    changeStatement={changeStatement}
                ></WordList>
            )}
        </>
    );
}

function Tips({
    text,
    description,
    keyboardKey,
    handler,
}: {
    text: string;
    description: string;
    keyboardKey: string;
    handler: () => void;
}) {
    useEffect(() => {
        function handleKeyDown(event: any) {
            if (event.key === keyboardKey) {
                handler();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="flex gap-x-2 text-sm mt-3">
            {" "}
            <button
                className="rounded-sm px-2 bg-gray-600 text-white dark:text-gray-900"
                onClick={handler}
            >
                {text}
            </button>
            <div className=" text-gray-600"> - {description}</div>
        </div>
    );
}

// function useFetchCourse() {
//   const router = useRouter();
//   const searchParams = useSearchParams()!;
//   const courseId = searchParams.get("courseId");


// }

function usePlaySound() {
    const { currentStatement: getCurrentStatement } = useCourse();
    const word = getCurrentStatement()?.english;
    const [audio, state, controls, ref] = useAudio({
        src: `https://dict.youdao.com/dictvoice?audio=${word}&type=1`,
        autoPlay: false,
    });

    return {
        audio,
        playSound: () => controls.play(),
    };
}

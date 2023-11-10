import { create } from "zustand";

interface Statement {
  chinese: string;
  english: string;
  soundmark: string;
}

interface CourseData {
  id: string;
  title: string;
  statements: Statement[];
}

interface State {
  currentMode: "question" | "answer";
  statementIndex: number;
  currentCourse?: CourseData;
  toNextStatement: () => void;
  fetchCourse: () => void;
  currentStatement: () => Statement | undefined;
  checkCorrect: (input: string) => boolean;
}

export const useCourse = create<State>((set, get, api) => ({
  statementIndex: 0,
  currentCourse: undefined,
  currentMode: "question",

  async fetchCourse() {
    const response = await fetch("/api/main");
    const data = await response.json();
    console.log("-=-=",data)
    set({ currentCourse: data.data });
    set({ statementIndex: Number(localStorage.getItem("statementIndex"))||0 });
  },


  
  toNextStatement() {
    set((state) => {
      const nextStatementIndex = state.statementIndex + 1;
      const cId = state.currentCourse?.id!;
      const statementIndexListStringify =
        localStorage.getItem("statementIndexList") || "{}";

      const statementIndexList = JSON.parse(statementIndexListStringify);

      Reflect.set(statementIndexList, cId, nextStatementIndex);

      localStorage.setItem(
        "statementIndexList",
        JSON.stringify(statementIndexList),
      );

      localStorage.setItem(
        "statementIndex",
        JSON.stringify(state.statementIndex),
      );

      return { statementIndex: nextStatementIndex };
    });
  },
  currentStatement() {
    const { currentCourse, statementIndex } = get();
    console.log("当前的单词-=-=",currentCourse?.statements[statementIndex])
    return currentCourse?.statements[statementIndex];
  },
  checkCorrect(input: string) {
    const currentStatement = get().currentStatement();
    return (
      input.toLocaleLowerCase() ===
      currentStatement?.english.toLocaleLowerCase()
    );
  },
}));

import { create } from "zustand";

interface Statement {
  chinese: string;
  english: string;
  soundMark: string;
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
    
    console.log("-=-=get",get())
  },


  
  toNextStatement() {
    set((state) => {
      const nextStatementIndex = state.statementIndex + 1;
      console.log("第几个单词-=-=",state.currentCourse?.statements.length      )
      if(state.currentCourse &&(nextStatementIndex >= state.currentCourse.statements.length )){
        // 本节课的单词背完了
        console.log("最后一个单词---",localStorage.getItem("statementIndex"))
        alert("最后一个单词")
        return {}
      }
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
    const _currentWord:any = {
      ...currentCourse?.statements[statementIndex],
      english: currentCourse?.statements[statementIndex]?.english.trim() ||''
    }
    // console.log("当前的单词-=-=",_currentWord)
    return _currentWord;
  },
  checkCorrect(input: string) {
    const currentStatement = get().currentStatement();
    return (
      input.toLocaleLowerCase() ===
      currentStatement?.english.toLocaleLowerCase()
    );
  },
}));

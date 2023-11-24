import { create } from "zustand";

interface Statement {
  chinese: string;
  english: string;
  soundmark: string;
}

interface CourseData {
  id: string;
  title: string;
  name: string;
  statements: Statement[];
}

interface State {
  currentMode: "question" | "answer";
  statementIndex: number;//第几个单词
  currentCourseIndex: number;//第几课 0是第一课
  currentCourseOver: boolean;// 当前课程是否完成
  courseList:Array<CourseData>
  currentCourse?: CourseData;
  toNextStatement: () => void;
  fetchCourse: () => void;
  currentStatement: () => Statement | undefined;
  checkCorrect: (input: string) => boolean;
  changeCourse: (course:any,index:number) => void;
  
}

export const useCourse = create<State>((set, get, api) => ({
  statementIndex: 0,
  currentCourse: undefined,
  currentMode: "question",
  currentCourseIndex: 0,
  currentCourseOver: false,
  courseList:[],

  async fetchCourse() {
    const response = await fetch("/api/main");
    const data = await response.json();
    set({ courseList: data.courseList });
    console.log("-=-=",data)
    const catch_progress = JSON.parse(localStorage.getItem("catch_progress")||"{}");
    console.log("-=-=get---",get(),catch_progress)
    if(catch_progress&&Object.keys(catch_progress).length != 0){
      console.log("从缓存中获取---")
      set({ currentCourse: data.courseList[catch_progress.currentCourseIndex] });
      set({ statementIndex: catch_progress.statementIndex });
    }else{
      console.log("没有缓存中获取+++++")
      set({ currentCourse: data.courseList[0] });
      set({ statementIndex: 0});
    }
    
  },

  changeCourse(course:any,index:number){
    set({ currentCourse: course });
    set({ currentCourseIndex: index});
    set({ statementIndex: 0});
    console.log("-=-=get---course",course,index)
    localStorage.setItem(
      "catch_progress",
      JSON.stringify({
        currentCourseIndex: index,
        statementIndex: 0
      }),
    );
  },
  
  toNextStatement() {
    set((state) => {
      const nextStatementIndex = state.statementIndex + 1;
      if(state.currentCourse &&(nextStatementIndex >= state.currentCourse.statements.length )){
        // 本节课的单词背完了
        console.log("最后一个单词---",localStorage.getItem("catch_progress"))
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
        "catch_progress",
        JSON.stringify({
          currentCourseIndex: state.currentCourseIndex,
          statementIndex: nextStatementIndex
        }),
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

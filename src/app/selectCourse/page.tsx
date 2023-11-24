"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useCourse } from "@/store";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const {  fetchCourse,courseList,changeCourse } = useCourse();
    const selectClick = (course:any,index:number)=>{
        console.log("selectClick===",course,index)
        changeCourse(course,index)
        router.push('/sentencePractice');
    }

    useEffect(() => {
        console.log("选择课程执行了----")
        fetchCourse();
    }, []);

  return (
    <>
      <div className=" p-16 relative  h-screen flex flex-col ">
        <div>
          <Link href="/sentencePractice">
            <svg
              viewBox="0 0 24 24"
              width="1.2em"
              height="1.2em"
              className="absolute right-20 top-5 mr-2 h-7 w-7 cursor-pointer 
         text-gray-400 dark:text-indigo-500"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 6L6 18M6 6l12 12"
              ></path>
            </svg>
          </Link>
          <h1 className="m-4 text-3xl text-indigo-500 ml-0 ">
            {" "}
            select course{" "}
          </h1>
        </div>
        <div className="overflow-y-auto scrollbar-hide h-full">
          <ul className="flex gap-14  flex-wrap p-1 overflow-y-auto md:justify-start justify-center">
            {courseList&&courseList.map((course,index) => {
              return (
                <li key={index} 
                >
                  <Card 
                    index={index}
                    course={course} 
                    selectClick={selectClick}
                  ></Card>
                </li>
              );
            })}
          </ul>{" "}
        </div>
      </div>
    </>
  );
}

function Card({ index,course,selectClick }: { index:number,course: any,selectClick:(course:any,index:number)=>void}) {

  return (
    <>
      <div
        className="w-52 h-24 bg-indigo-500   rounded-md p-1 
    shadow-lg hover:bg-indigo-700  cursor-pointer 
  flex justify-center items-center transition-colors"
  onClick={()=>selectClick(course,index)}
      >
        <div>{course.name}</div>
      </div>
    </>
  );
}

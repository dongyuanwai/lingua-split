import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { useCourse } from "@/store";

const WordList = ({ currentCourse }: { currentCourse: any }) => {
  const [open, setOpen] = useState(false);
  const openDrawer = () => {
    setOpen(() => true)
  }
  return (
    <>
      <div >
        <div className="fixed left-0 top-[50%]">
          <button type="button" onClick={openDrawer} className="fixed left-0 top-[50%] z-20 rounded-lg rounded-l-none bg-indigo-50 px-2 py-3 text-lg hover:bg-indigo-200 focus:outline-none dark:bg-indigo-900 dark:hover:bg-indigo-800"><svg viewBox="0 0 24 24" width="1.2em" height="1.2em" className="h-6 w-6 text-lg text-indigo-500 dark:text-white"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01"></path></svg></button>
        </div>
        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
        >
          <div className="w-[40vw] px-2">
            <div className="w-full h-10 mb-2 flex items-center">{currentCourse.name}</div>
            <div className="">
              <Card currentCourse={currentCourse}></Card>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
};
function Card({ currentCourse }: { currentCourse: any }) {
  return (
    <>
      <div className="">
        {currentCourse.statements.map((item: any, index: number) => (
          <div key={index} className="mb-2 flex cursor-pointer select-text items-center rounded-xl p-4 shadow
        focus:outline-none bg-white dark:bg-gray-700 dark:bg-opacity-20   ">
            <div className="flex-1">
              <p className="select-all font-mono text-xl font-normal leading-6 dark:text-gray-50">
                {item.english}
              </p>
              <div className="mt-2 max-w-sm font-sans text-sm text-gray-400">
                {item.chinese}
              </div>
            </div>
            <button
              type="button"
              className="focus:outline-none dark:fill-gray-400 dark:opacity-80 cursor-pointer text-gray-600 h-8 w-8"
            >
              <svg
                className="prefix__icon undefined"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="M417.28 164.198c-12.646 0-25.293 5.325-37.683 15.821L169.779 358.35H76.8c-42.342 0-76.8 34.457-76.8 76.8v204.8c0 42.342 34.458 76.8 76.8 76.8h92.98l209.817 178.33c12.339 10.495 25.037 15.82 37.683 15.82a40.755 40.755 0 0034.304-18.534c6.093-9.165 9.216-20.89 9.216-34.816v-640c0-36.864-21.862-53.402-43.52-53.402zM51.2 640V435.2a25.6 25.6 0 0125.6-25.6h76.8v256H76.8A25.6 25.6 0 0151.2 640zm358.4 213.453l-204.8-174.08V395.827l204.8-174.08v631.706z"></path>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default WordList;

"use client"
import { Button } from "@mui/material"
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/selectCourse')
  }
  return (
    <>
      <div className={'w-full h-[100vh] flex justify-center items-center'}>
        <Button variant="contained" onClick={handleClick}>{'去选择课程 -> 开始学习'}</Button>
      </div>
    </>
  )
}

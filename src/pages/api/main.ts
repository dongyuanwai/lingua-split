import type { NextApiRequest, NextApiResponse } from "next";
import course01 from "@/data/01.json";
import course02 from "@/data/02.json";
import course03 from "@/data/03.json";
import course04 from "@/data/04.json";

const numMap = ['一','二','三','四',]

export default function GET(req: NextApiRequest, res: NextApiResponse) {
  const courseList = [course01, course02, course03, course04].map((item,index)=>{
    return {
      name : `第${numMap[index]}课`,
      statements: item,
    }
  });
  const data = courseList[0];
  res.status(200).json({ status: 1,  courseList });
}

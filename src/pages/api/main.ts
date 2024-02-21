import type { NextApiRequest, NextApiResponse } from "next";
import course01 from "@/data/01.json";
import course02 from "@/data/02.json";
import course03 from "@/data/03.json";
import course04 from "@/data/04.json";
import course05 from "@/data/05.json";
import course06 from "@/data/06.json";
import course07 from "@/data/07.json";
import course08 from "@/data/08.json";
import course09 from "@/data/09.json";
import course10 from "@/data/10.json";

const numMap = ['一','二','三','四','五','六','七','八','九','十']

export default function GET(req: NextApiRequest, res: NextApiResponse) {
  const courseList = [course01, course02, course03, course04,course06,course07,course08,course09,course10].map((item,index)=>{
    return {
      name : `第${numMap[index]}课`,
      statements: item,
    }
  });
  const data = courseList[0];
  res.status(200).json({ status: 1,  courseList });
}

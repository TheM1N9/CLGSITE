import React from "react"
import Back from "../common/back/Back"
import CoursesCard from "./CoursesCard"
import PriceCard from "./PriceCard"

const CourseHome = () => {
  return (
    <>
      <Back title='Academic Details' />
      <CoursesCard />
      <PriceCard></PriceCard>
    </>
  )
}

export default CourseHome

import Publication from '@/components/about/Publication'
import TeamSection from '@/components/about/TeamSection'
import Footer from '@/components/HomePage/Footer'
import { Navbar } from '@/components/HomePage/Navbar'
import React from 'react'

export const metadata = {
  title: "About Us - Kanta Publication",
  description: "Learn more about Kanta Publication and its dedication to preserving ancient manuscript systems.",
};
// export const dynamic = "force-dynamic"
const page = () => {
  return (
   <>
   <Publication/>
   <TeamSection/>
    
   </>
  )
}

export default page
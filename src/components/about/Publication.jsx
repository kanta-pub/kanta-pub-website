'use client';

import { BookOpen, Users, Globe, Lightbulb } from 'lucide-react';
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
export default function Publication() {
  return (
    <div className="min-h-screen bg-white   border-b-2 border-black                    ">
      {/* Orange Banner */}
      <div className="w-full bg-[#F7A034] py-16 mb-8">
        <h1 className="text-center text-[3.5rem] font-serif text-black">About Us</h1>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-serif mb-8">Kanta Publication</h2>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <p className={` ${roboto.className}`}>
              Kanta Publication house is there with a passion for preserving Indian culture and traditions through writings.
              </p>
              <p className={` ${roboto.className}`}>
               
               <ul>
                <li className="before:content-['🔹'] before:mr-2">First, our objective is to <strong>encourage elder people to write their traditional experiences and knowledge.</strong> Making sure that their values and experiences can live for many years and reach young generations.
                </li>
                <li className="before:content-['🔹'] before:mr-2">Secondly, we wish to <strong>focus on topics that can explain themes with help of traditional manuscripts and ancient treaties and can solve recent problems</strong> with their help. </li>
               </ul>
              </p>
            </div>
            <div className="space-y-4">
              <p className={` ${roboto.className}`}>
                Our first book that we published is about , <span className="font-semibold">Maanoopkarnam (Hindu Manuscript)"Units of Measurement through Ancient Treaties"</span>,
                in which how ancients temples, wells, musical instrument or any other object or building was measured for construction, showing upmost precision in result. How our ancestors created full-proof methods for all the problems that we are facing currently or will in future.
              </p>
              <p className={` ${roboto.className}`}>
              We wish to be a part of India's journey in becoming <strong>"Vishwa Guru"</strong>. 1000s years ago our ancestors travelled the world to spread our traditional knowledge with every human being. Because, when all the people will be educated and full of knowledge then there will be total peace around the world
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 mb-4">
            {[
              { icon: <BookOpen className="w-8 h-8 text-gray-700 shrink-0" />, text: "Bringing alive the knowledge of our senior citizens" },
              { icon: <Users className="w-8 h-8 text-gray-700 shrink-0" />, text: "Connecting the young generation with ancient wisdom" },
              { icon: <Globe className="w-8 h-8 text-gray-700 shrink-0" />, text: "Dreaming of India as Vishwa-Guru" },
              { icon: <Lightbulb className="w-8 h-8 text-gray-700 shrink-0" />, text: "Using ancient knowledge to innovate and create" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                {item.icon}
                <p className="text-gray-800 m-0">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import Contact from '@/components/Contact/Contact';
import Footer from '@/components/HomePage/Footer';
import { Navbar } from '@/components/HomePage/Navbar';
import React from 'react';

export const metadata = {
  title: "Contact Us - Kanta Publication",
  description: "Get in touch with Kanta Publication for inquiries about ancient manuscript systems.",
};

async function Page() {


  return (
    <div>
     <Contact/>
    </div>
  );
}

// export const dynamic = "force-dynamic"
export default Page;
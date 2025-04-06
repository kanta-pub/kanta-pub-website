import Dashboard from '@/components/dashboard/Homepage/Homepage';
import { AppSidebar } from '@/components/dashboard/Sidebar';
import Footer from '@/components/HomePage/Footer';
import { Navbar } from '@/components/HomePage/Navbar';
import { getTotalCounts } from '@/utils/Book';
import React from 'react';

async function Page({ searchParams }) {
  const alldetails= await getTotalCounts()
  console.log(alldetails)
  return (
    <div className="lg:px-6 lg:pt-6 lg:pb-4">
      {/* Main content: Sidebar + Dashboard */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar (Fixed Width on Large Screens, Full Width on Mobile) */}
        <div className="w-full md:w-64">
          <AppSidebar />
        </div>

        {/* Dashboard (Takes Remaining Space) */}
        <div className="flex-1 p-4">
          <Dashboard data={alldetails}/>
        </div>
      </div>

    </div>
  );
}

export default Page;

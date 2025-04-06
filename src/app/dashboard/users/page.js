import BooksHomepage from '@/components/dashboard/books';
import { AppSidebar } from '@/components/dashboard/Sidebar';
import Users from '@/components/dashboard/users';
import React from 'react';

async function Page({ searchParams }) {
  const {query,page}=await searchParams
  return (
    <div className="lg:px-6 lg:pt-6 lg:pb-4">
      {/* Navbar */}
      

      {/* Main content: Sidebar + Dashboard */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar (Fixed Width on Large Screens, Full Width on Mobile) */}
        <div className="w-full md:w-64">
          <AppSidebar />
        </div>

        {/* Dashboard (Takes Remaining Space) */}
        <div className="flex-1 p-4 text-white">
            <Users pageNo={page} query={query}/>
        </div>
      </div>
    </div>
  );
}

export default Page;
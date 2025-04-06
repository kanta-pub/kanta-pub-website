import Shopping from '@/components/Shopping/Shopping';
import { getAllBooks } from '@/utils/Book';
import React from 'react';


export const metadata = {
  title: "Shopping - Kanta Publication",
  description: "Explore our collection of ancient manuscript systems and related publications.",
}

async function Page() {
  const products = await getAllBooks();
  // console.log(products.data);

  return (
    <div>
       <Shopping products={products.data}/>
    </div>
  );
}

// export const dynamic = "force-dynamic"
export default Page;
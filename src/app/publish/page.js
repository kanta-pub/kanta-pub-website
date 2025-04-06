import WriteandPublish from '@/components/WriteandPublish/WriteandPublish';
import { getAllWritePublishes } from '@/utils/WriteandPublish';
import React from 'react';

export const metadata = {
  title: "Write and publish - Kanta Publication",
    description: "Explore the process of creating and preserving ancient manuscript systems."
};
async function Page() { 
  const data=await getAllWritePublishes();
  return (
    <div>
       <WriteandPublish writePublishes={data.data}/>
    </div>
  );
}

// export const dynamic = "force-dynamic"
export default Page;
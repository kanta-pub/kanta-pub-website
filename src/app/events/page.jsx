import EventHomepage from '@/components/events';
import WriteandPublish from '@/components/WriteandPublish/WriteandPublish';
import React from 'react';


async function Page() {
  return (
    <div>
       <EventHomepage/>
    </div>
  );
}

// export const dynamic = "force-dynamic"
export default Page;
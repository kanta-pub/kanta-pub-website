import EventHomepage from '@/components/events';
import WriteandPublish from '@/components/WriteandPublish/WriteandPublish';
import React from 'react';

export const metadata = ({ params }) => {
  const { slug } = params;

  return {
    title: `${slug.replace(/-/g, " ")} - Shop Now | YourShopName`,
    description: `Buy the best ${slug.replace(/-/g, " ")} at unbeatable prices. Shop now for great deals and fast delivery!`,
  };
};

async function Page() {
  return (
    <div>
       <EventHomepage/>
    </div>
  );
}

// export const dynamic = "force-dynamic"
export default Page;
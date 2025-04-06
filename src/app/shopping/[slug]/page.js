import BookDetails from "@/components/BookDetails";
import { getBookBySlug } from "@/utils/Book";

// pages/book/[slug].js 

async function page({ params }) { // Get all params (like { customerId: 'someId' })
// 
const customerId = params.slug;
const data=await getBookBySlug(customerId);
console.log(data)
  return (
    <div>
      <BookDetails book={data.data} />
    </div>
  );
}

export default page;
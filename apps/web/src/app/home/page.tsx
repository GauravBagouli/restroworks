// import RenderBlocks from "@/components/RenderBlocks";
// import RichTextRenderer from "@/components/RichText";
// import { DEFAULT_LOCALE } from "@/i18n/config";

// export default async function Page({ params }: { params: { slug: string } }) {
//   const { slug } = params;
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_CMS_URL}/api/pages?where[slug][equals]=${params.slug}&locale=${DEFAULT_LOCALE}&depth=2`,
//     { cache: "no-store" }
//   );
//   const data = await res.json();
//   const page = data.docs?.[0];

//   if (!page) return <h1 className="py-16 text-center text-gray-800">404 - Page Not Found</h1>;

//   return (
//     <main>
//       {/* Page Intro Section */}
//       <section className="bg-gray-50 py-16 text-center">
//         <div className="max-w-3xl mx-auto px-6">
//           <h1 className="text-4xl font-bold text-gray-900">{page.title}</h1>
//           {page.content && (
//             <div className="mt-4 text-lg text-gray-600">
//               <RichTextRenderer content={page.content} />
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Modular Blocks */}
//       <RenderBlocks layout={page.layout} />
//     </main>
//   );
// }


import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/i18n/config";

export default function HomeRedirect() {
  return redirect(`/home/${DEFAULT_LOCALE}`);
}

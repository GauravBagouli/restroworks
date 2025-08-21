import "./globals.css";
 
export const metadata = {
  title: "Restroworks",
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">{children}</body>
    </html>
  );
}
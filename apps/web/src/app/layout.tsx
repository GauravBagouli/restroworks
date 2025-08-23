import "./globals.css";
import { Toaster } from "react-hot-toast";
 
export const metadata = {
  title: "Restroworks",
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col text-gray-900">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "14px",
            },
            success: {
              style: {
                background: "#16a34a", // green
                color: "#fff",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#16a34a",
              },
            },
            error: {
              style: {
                background: "#dc2626", // red
                color: "#fff",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#dc2626",
              },
            },
            loading: {
              style: {
                background: "#2563eb", // blue
                color: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
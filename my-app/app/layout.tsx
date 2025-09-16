import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Anass Portfolio",
  description: "Persoonlijke portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className="flex flex-col min-h-screen bg-gray-950 text-gray-100 font-sans">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1 px-6 md:px-12 lg:px-20 py-12">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}

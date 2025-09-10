// app/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Mijn Portfolio",
  description: "Persoonlijke portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body className="flex flex-col min-h-screen bg-gray-900 text-cyan-400 font-sans">
        {/* Navbar */}
        <Navbar />

        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}

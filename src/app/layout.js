import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import "./globals.css";

export const metadata = {
  title: "PH Newspaper",
  description: "A map-driven interactive news portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="font-sans antialiased bg-base-100 text-base-content">
        <Navbar />
        
        {children}
        
        <Footer />
      </body>
    </html>
  );
}
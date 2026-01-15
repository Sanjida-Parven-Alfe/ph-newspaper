import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PH Newspaper",
  description: "The most reliable news portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning> 
      <body className={inter.className}>
        <ThemeProvider> 
          <div className="min-h-screen flex flex-col justify-between">
             <div>
               <Navbar />
               {children}
             </div>
             <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
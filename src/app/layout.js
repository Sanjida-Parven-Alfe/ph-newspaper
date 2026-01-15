import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  title: {
    default: "PH Newspaper - The Most Reliable News Portal",
    template: "%s | PH Newspaper",
  },
  description: "Stay updated with breaking news, in-depth analysis, and reports from every district of Bangladesh.",
  openGraph: {
    title: "PH Newspaper",
    description: "The most reliable news portal for latest updates.",
    url: '/',
    siteName: 'PH Newspaper',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: "/logo.png", 
  },
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
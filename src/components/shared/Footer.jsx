import Link from "next/link";
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content pt-16  mt-10 border-t border-neutral-content/10">
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="text-3xl font-black tracking-tighter block">
              PH <span className="text-red-500">Newspaper</span>
            </Link>
            <p className="text-neutral-content/70 leading-relaxed text-sm">
              Connecting you with the truth. We provide the latest breaking news, 
              in-depth analysis, and updates from every district of Bangladesh.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="btn btn-sm btn-circle btn-outline text-white hover:bg-blue-600 hover:border-blue-600 transition-all">
                <FaFacebookF />
              </a>
              <a href="#" className="btn btn-sm btn-circle btn-outline text-white hover:bg-sky-400 hover:border-sky-400 transition-all">
                <FaTwitter />
              </a>
              <a href="#" className="btn btn-sm btn-circle btn-outline text-white hover:bg-red-600 hover:border-red-600 transition-all">
                <FaYoutube />
              </a>
              <a href="#" className="btn btn-sm btn-circle btn-outline text-white hover:bg-blue-700 hover:border-blue-700 transition-all">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b-2 border-red-500 w-fit pb-1">Categories</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/news/Tech News" className="hover:text-red-500 hover:pl-2 transition-all block">Tech News</Link></li>
              <li><Link href="/news/Startups" className="hover:text-red-500 hover:pl-2 transition-all block">Startups</Link></li>
              <li><Link href="/news/AI & Future" className="hover:text-red-500 hover:pl-2 transition-all block">AI & Future</Link></li>
              <li><Link href="/news/Web Dev" className="hover:text-red-500 hover:pl-2 transition-all block">Web Dev</Link></li>
              <li><Link href="/news/Career" className="hover:text-red-500 hover:pl-2 transition-all block">Career</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b-2 border-red-500 w-fit pb-1">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-red-500 hover:pl-2 transition-all block">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-red-500 hover:pl-2 transition-all block">Contact Support</Link></li>
              <li><Link href="/jobs" className="hover:text-red-500 hover:pl-2 transition-all block">Careers</Link></li>
              <li><Link href="/terms" className="hover:text-red-500 hover:pl-2 transition-all block">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-red-500 hover:pl-2 transition-all block">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider border-b-2 border-red-500 w-fit pb-1">Newsletter</h3>
            <p className="text-neutral-content/70 text-sm mb-4">
              Subscribe to our newsletter for the latest updates directly in your inbox.
            </p>
            <div className="join w-full shadow-lg">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="input input-bordered join-item w-full text-black focus:outline-none" 
              />
              <button className="btn btn-primary join-item rounded-r-lg text-white">
                <FaPaperPlane />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-neutral-content/10 bg-neutral-900/50">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-content/50">
          <p>&copy; {new Date().getFullYear()} PH Newspaper Ltd. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
            <span>•</span>
            <Link href="#" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
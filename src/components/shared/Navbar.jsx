import Link from "next/link";
import Image from "next/image";

const Navbar = () => {

const navLinks = (
  <>
    <li><Link href="/">Home</Link></li>
    <li><Link href="/news">All News</Link></li>
    
    {/* Updated Categories for Tech Theme */}
    <li><Link href="/news/Tech News">Tech News</Link></li>
    <li><Link href="/news/Startups">Startups</Link></li>
    <li><Link href="/news/AI & Future">AI & Future</Link></li>
    <li><Link href="/news/Web Dev">Web Dev</Link></li>
    <li><Link href="/news/Career">Career</Link></li>
    <li><Link href="/saradesh" className="font-bold text-red-500"> Sara Desh </Link> </li>
  </>
);

  return (
    <div className="bg-base-100 border-b border-base-300 sticky top-0 z-50">
      <div className="navbar container mx-auto">
        
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navLinks}
            </ul>
          </div>
          <Link href="/" className="flex items-center gap-2 px-2">
            <Image src="/logo.png" alt="PH Logo" width={40} height={40} className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold hidden sm:block text-base-content">PH Newspaper</span>
          </Link>
        </div>

        {/* Navbar Center - Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-semibold text-base-content">
            {navLinks}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end gap-2">
          <button className="btn btn-ghost btn-circle text-base-content">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <label className="swap swap-rotate btn btn-ghost btn-circle text-base-content">
            <input type="checkbox" className="theme-controller" value="dark" />
            <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,4.93l.71.71A1,1,0,0,0,5.64,7.05Zm12,1.41a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,17.66,4.93l.71.71A1,1,0,0,0,17.66,8.46ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
            <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
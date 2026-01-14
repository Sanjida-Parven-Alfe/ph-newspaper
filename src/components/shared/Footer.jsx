import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content mt-10">
      <div className="footer p-10 container mx-auto">
        <aside>
          <p className="font-bold text-2xl">
            PH Newspaper
          </p>
          <p>
            Providing reliable news since 2024.
            <br />
            Dhaka, Bangladesh
          </p>
        </aside> 
        <nav>
          <header className="footer-title">Categories</header> 
          <Link href="/news/Politics" className="link link-hover">Politics</Link>
          <Link href="/news/Technology" className="link link-hover">Technology</Link>
          <Link href="/news/Sports" className="link link-hover">Sports</Link>
          <Link href="/news/International" className="link link-hover">International</Link>
        </nav> 
        <nav>
          <header className="footer-title">Company</header> 
          <Link href="/about" className="link link-hover">About us</Link>
          <Link href="/contact" className="link link-hover">Contact</Link>
          <Link href="/jobs" className="link link-hover">Jobs</Link>
        </nav> 
        <nav>
          <header className="footer-title">Legal</header> 
          <Link href="/terms" className="link link-hover">Terms of use</Link>
          <Link href="/privacy" className="link link-hover">Privacy policy</Link>
          <Link href="/cookie" className="link link-hover">Cookie policy</Link>
        </nav>
      </div>
      <div className="footer footer-center p-4 bg-neutral-900 text-neutral-content">
        <aside>
          <p>Copyright © 2024 - All right reserved by PH Newspaper Ltd</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
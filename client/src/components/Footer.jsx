import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-topline">Adopt with care • Adopt with trust • Adopt for life</div>
      <div className="container footer-grid">
        <div>
          <p className="footer-kicker">Pet Adoption Platform</p>
          <h3>PetNest Adoption</h3>
          <p>Trusted pet adoption for responsible families and caring communities.</p>
          <p>Email: support@petnest.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/pets">All Pets</Link>
          <Link to="/dashboard/my-requests">My Requests</Link>
          <Link to="/dashboard/add-pet">Add Pet</Link>
        </div>

        <div>
          <h4>Social Links</h4>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>

        <div>
          <h4>Working Hours</h4>
          <p>Mon - Fri: 9:00 AM - 7:00 PM</p>
          <p>Sat - Sun: 10:00 AM - 5:00 PM</p>
        </div>

      </div>
      <p className="copyright">Copyright {new Date().getFullYear()} PetNest. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

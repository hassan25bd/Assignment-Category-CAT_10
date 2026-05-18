const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>PetNest Adoption</h3>
          <p>Email: support@petnest.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>

        <div>
          <h4>Social Links</h4>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>LinkedIn</p>
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

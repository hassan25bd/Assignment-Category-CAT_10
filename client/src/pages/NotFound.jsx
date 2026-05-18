import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="section container" style={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
      <div className="not-found">
        <div style={{ fontSize: "120px", marginBottom: "12px" }}>🔍</div>
        <h1 style={{ fontSize: "72px", color: "var(--brand)", marginBottom: "12px" }}>404</h1>
        <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>Page Not Found</h2>
        <p style={{ fontSize: "16px", color: "var(--muted)", maxWidth: "40ch", margin: "0 auto 24px" }}>
          We couldn't find the page you're looking for. It might have been moved or deleted. Let's get you back on track!
        </p>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" className="btn btn-primary" style={{ fontSize: "16px", padding: "12px 20px" }}>
            🏠 Back to Home
          </Link>
          <Link to="/all-pets" className="btn btn-outline" style={{ fontSize: "16px", padding: "12px 20px" }}>
            🐾 Browse Pets
          </Link>
        </div>

        {/* Decorative Elements */}
        <div
          style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
            gap: "10px",
            maxWidth: "300px",
            margin: "40px auto 0",
          }}
        >
          {["🐕", "🐈", "🐦", "🐰"].map((emoji, i) => (
            <div
              key={i}
              style={{
                fontSize: "32px",
                textAlign: "center",
                opacity: 0.5,
                animation: `bounce ${2 + i * 0.2}s ease-in-out infinite`,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>

        <style>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default NotFound;

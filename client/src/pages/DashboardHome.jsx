import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import Spinner from "../components/Spinner";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalPets: 0,
    availablePets: 0,
    adoptedPets: 0,
    pendingRequests: 0,
    approvedRequests: 0,
    rejectedRequests: 0,
  });
  const [recentPets, setRecentPets] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch owner's pet listings
        const petsRes = await api.get("/pets/owner/listings");
        const pets = petsRes.data || [];

        // Fetch adoption requests
        const requestsRes = await api.get("/adoption/my-requests");
        const requests = requestsRes.data || [];

        // Calculate stats
        const totalPets = pets.length;
        const availablePets = pets.filter((p) => p.status === "available").length;
        const adoptedPets = pets.filter((p) => p.status === "adopted").length;

        const pendingRequests = requests.filter((r) => r.status === "pending").length;
        const approvedRequests = requests.filter((r) => r.status === "approved").length;
        const rejectedRequests = requests.filter((r) => r.status === "rejected").length;

        setStats({
          totalPets,
          availablePets,
          adoptedPets,
          pendingRequests,
          approvedRequests,
          rejectedRequests,
        });

        // Get recent pets (last 3)
        setRecentPets(pets.slice(0, 3));

        // Get recent requests (last 3)
        setRecentRequests(requests.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Spinner isFullPage={true} />;

  return (
    <div className="dashboard-premium-shell">
      {/* Welcome Header */}
      <div
        className="dashboard-premium-head requests-head"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 167, 182, 0.65), rgba(30, 167, 182, 0.78)), 
            url('https://images.unsplash.com/photo-1552053831-71594a27c62d?auto=format&fit=crop&w=1400&q=80')`,
        }}
      >
        <h2>Welcome Back! 🎉</h2>
        <p>Here's your adoption management hub. Track your pets and adoption requests at a glance.</p>
      </div>

      {/* Main Stats Grid */}
      <div className="stats-grid">
        <article>
          <span style={{ fontSize: "24px" }}>📋</span>
          <h4>Total Pets</h4>
          <p>{stats.totalPets}</p>
          <small>Pets in your care</small>
        </article>

        <article>
          <span style={{ fontSize: "24px" }}>✅</span>
          <h4>Available</h4>
          <p>{stats.availablePets}</p>
          <small>Ready for adoption</small>
        </article>

        <article>
          <span style={{ fontSize: "24px" }}>❤️</span>
          <h4>Adopted</h4>
          <p>{stats.adoptedPets}</p>
          <small>Successfully adopted</small>
        </article>

        <article>
          <span style={{ fontSize: "24px" }}>⏳</span>
          <h4>Pending</h4>
          <p>{stats.pendingRequests}</p>
          <small>Requests waiting</small>
        </article>

        <article>
          <span style={{ fontSize: "24px" }}>✔️</span>
          <h4>Approved</h4>
          <p>{stats.approvedRequests}</p>
          <small>Approved adoptions</small>
        </article>

        <article>
          <span style={{ fontSize: "24px" }}>❌</span>
          <h4>Rejected</h4>
          <p>{stats.rejectedRequests}</p>
          <small>Declined requests</small>
        </article>
      </div>

      {/* Quick Action Section */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--line)",
          borderRadius: "18px",
          padding: "20px",
          display: "grid",
          gap: "12px",
        }}
      >
        <h3>Quick Actions</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link to="/dashboard/add-pet" className="btn btn-primary">
            ➕ Add New Pet
          </Link>
          <Link to="/dashboard/my-listings" className="btn btn-outline">
            📦 View My Listings
          </Link>
          <Link to="/dashboard/my-requests" className="btn btn-outline">
            📨 My Requests
          </Link>
          <Link to="/all-pets" className="btn btn-outline">
            🔍 Browse All Pets
          </Link>
        </div>
      </div>

      {/* Recent Pets Section */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--line)",
          borderRadius: "18px",
          padding: "20px",
          display: "grid",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>Recent Pets</h3>
          <Link to="/dashboard/my-listings" className="btn btn-sm btn-outline">
            View All →
          </Link>
        </div>

        {recentPets.length > 0 ? (
          <div className="pet-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
            {recentPets.map((pet) => (
              <div key={pet._id} className="pet-card">
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  className="pet-image"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80";
                  }}
                />
                <div className="pet-card-body">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h4>{pet.name}</h4>
                    <span
                      className="status-ribbon"
                      style={{
                        position: "relative",
                        top: "0",
                        right: "0",
                        fontSize: "12px",
                        padding: "4px 8px",
                      }}
                    >
                      {pet.status === "available" ? "✅ Available" : "❌ Adopted"}
                    </span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--muted)" }}>
                    {pet.breed} • {pet.age}
                  </p>
                  <p style={{ fontSize: "13px", color: "var(--muted)" }}>📍 {pet.location}</p>
                  <Link to={`/dashboard/my-listings`} className="btn btn-sm btn-primary" style={{ marginTop: "8px", width: "100%" }}>
                    Manage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px", color: "var(--muted)" }}>
            <p>No pets added yet. Start by adding your first pet! 🐾</p>
            <Link to="/dashboard/add-pet" className="btn btn-primary" style={{ marginTop: "10px" }}>
              Add Pet
            </Link>
          </div>
        )}
      </div>

      {/* Recent Requests Section */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--line)",
          borderRadius: "18px",
          padding: "20px",
          display: "grid",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3>Recent Adoption Requests</h3>
          <Link to="/dashboard/my-requests" className="btn btn-sm btn-outline">
            View All →
          </Link>
        </div>

        {recentRequests.length > 0 ? (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Pet Name</th>
                  <th>Requester</th>
                  <th>Status</th>
                  <th>Pickup Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req._id}>
                    <td style={{ fontWeight: "600" }}>{req.petId?.name || "N/A"}</td>
                    <td>{req.userId?.name || "Unknown"}</td>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "600",
                          background:
                            req.status === "pending"
                              ? "rgba(247, 200, 67, 0.2)"
                              : req.status === "approved"
                                ? "rgba(16, 185, 129, 0.2)"
                                : "rgba(190, 24, 93, 0.2)",
                          color:
                            req.status === "pending"
                              ? "#d97706"
                              : req.status === "approved"
                                ? "#059669"
                                : "#dc2626",
                        }}
                      >
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    </td>
                    <td>{new Date(req.pickupDate).toLocaleDateString()}</td>
                    <td>
                      <Link to="/dashboard/my-requests" className="btn btn-sm btn-outline">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px", color: "var(--muted)" }}>
            <p>No adoption requests yet. Share your pet to get started! 🐕</p>
          </div>
        )}
      </div>

      {/* Tips & Info Section */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(30, 167, 182, 0.12), rgba(247, 200, 67, 0.08))",
          border: "1px dashed rgba(30, 167, 182, 0.3)",
          borderRadius: "18px",
          padding: "20px",
          display: "grid",
          gap: "12px",
        }}
      >
        <h3>💡 Pro Tips</h3>
        <ul style={{ margin: "0", paddingLeft: "20px", color: "var(--muted)", display: "grid", gap: "8px" }}>
          <li>Add high-quality pet photos to increase adoption chances</li>
          <li>Keep pet information up-to-date and detailed</li>
          <li>Respond quickly to adoption requests</li>
          <li>Check pending requests regularly for updates</li>
          <li>Mark pets as adopted once they find a home</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;

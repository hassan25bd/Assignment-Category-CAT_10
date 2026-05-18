import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api";
import Spinner from "../components/Spinner";

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequests = async () => {
    try {
      const { data } = await api.get("/adoptions/my-requests");
      setRequests(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const cancelRequest = async (id) => {
    try {
      await api.delete(`/adoptions/${id}`);
      toast.success("Request canceled");
      loadRequests();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel request");
    }
  };

  if (loading) return <Spinner />;

  return (
    <section className="dashboard-premium-shell">
      <div className="dashboard-premium-head requests-head">
        <h2>My Requests</h2>
        <p>Track pending, approved, and rejected requests in one place.</p>
      </div>

      <div className="table-wrap dashboard-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Pet Name</th>
              <th>Request Date</th>
              <th>Pickup Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-cell">
                  No requests yet.
                </td>
              </tr>
            ) : (
              requests.map((item) => (
                <tr key={item._id}>
                  <td>{item.petName}</td>
                  <td>{new Date(item.requestDate).toLocaleDateString()}</td>
                  <td>{item.pickupDate}</td>
                  <td>{item.status}</td>
                  <td className="action-cell">
                    <Link to={`/pets/${item.petId}`} className="btn btn-outline btn-sm">
                      View
                    </Link>
                    <button className="btn btn-danger btn-sm" onClick={() => cancelRequest(item._id)}>
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyRequests;

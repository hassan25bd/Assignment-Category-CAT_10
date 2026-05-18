import { Link } from "react-router-dom";
import { FiShoppingCart, FiImage, FiBriefcase } from "react-icons/fi";

const QuickActionRail = () => {
  return (
    <aside className="quick-rail" aria-label="Quick actions">
      <Link to="/pets" title="Browse Pets">
        <FiShoppingCart />
      </Link>
      <Link to="/" title="View Gallery">
        <FiImage />
      </Link>
      <Link to="/dashboard" title="Dashboard">
        <FiBriefcase />
      </Link>
    </aside>
  );
};

export default QuickActionRail;

const Spinner = ({ fullPage = false }) => {
  return (
    <div className={fullPage ? "spinner-wrap full-page" : "spinner-wrap"}>
      <div style={{ textAlign: "center", display: "grid", gap: "16px", alignItems: "center" }}>
        <div className="spinner" />
        <div>
          <p style={{ color: "var(--ink)", fontWeight: "600", margin: "0" }}>Loading...</p>
          <p style={{ color: "var(--muted)", fontSize: "13px", margin: "4px 0 0 0" }}>
            Finding the perfect pets for you
          </p>
        </div>
      </div>
    </div>
  );
};

export default Spinner;

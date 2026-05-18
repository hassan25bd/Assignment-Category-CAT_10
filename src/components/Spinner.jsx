const Spinner = ({ fullPage = false }) => {
  return (
    <div className={fullPage ? "spinner-wrap full-page" : "spinner-wrap"}>
      <div className="spinner" />
    </div>
  );
};

export default Spinner;

import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
          <div style={{ textAlign: "center", maxWidth: "500px" }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>⚠️</div>
            <h2 style={{ fontSize: "28px", marginBottom: "8px" }}>Something went wrong</h2>
            <p style={{ color: "var(--muted)", marginBottom: "20px" }}>
              We encountered an unexpected error. Please try refreshing the page or contact support if the issue persists.
            </p>
            {process.env.NODE_ENV === "development" && (
              <details style={{ marginBottom: "20px", textAlign: "left" }}>
                <summary style={{ cursor: "pointer", fontWeight: "600", marginBottom: "10px" }}>
                  Error details (Development only)
                </summary>
                <pre
                  style={{
                    background: "var(--card)",
                    padding: "10px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    overflow: "auto",
                  }}
                >
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
              style={{ marginRight: "10px" }}
            >
              Refresh Page
            </button>
            <a href="/" className="btn btn-outline">
              Go to Home
            </a>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

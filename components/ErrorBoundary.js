import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary] Component crash caught:", error.message);
    console.error("[ErrorBoundary] Stack:", error.stack);
    console.error("[ErrorBoundary] Component stack:", info?.componentStack);
    this.setState({ info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#020617",
            color: "#F8FAFC",
            fontFamily: "Inter, sans-serif",
            padding: "2rem",
            textAlign: "center",
            gap: "1rem"
          }}
        >
          <div style={{ fontSize: "2rem" }}>⚠</div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#F8FAFC" }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#64748b", maxWidth: "420px" }}>
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null, info: null });
              window.location.reload();
            }}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1.5rem",
              borderRadius: "9999px",
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.35)",
              color: "#c4b5fd",
              fontSize: "0.8rem",
              cursor: "pointer"
            }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

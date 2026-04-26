export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold" style={{
          background: "linear-gradient(135deg, #60a5fa 0%, #818cf8 50%, #a78bfa 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>404</h1>
        <p style={{ color: "hsl(215 20% 55%)" }} className="mt-2">Page not found</p>
        <a href="/" style={{
          display: "inline-flex",
          marginTop: "1.5rem",
          padding: "12px 24px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
          color: "white",
          fontWeight: 600,
          textDecoration: "none"
        }}>Go Home</a>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";

type UrlData = {
  id: number;
  originalUrl: string;
  shortUrl: string;
  alias: string;
  createdAt: string;
  validUntil: string | null;
  clicks: number;
};

function StatisticsPage() {
  const [urls, setUrls] = useState<UrlData[]>([]);

  const fetchStatistics = async () => {
    const res = await fetch("http://localhost:5000/history");
    const data = await res.json();
    setUrls(data);
  };

  const deleteUrl = async (id: number) => {
    await fetch(`http://localhost:5000/history/${id}`, { method: "DELETE" });
    fetchStatistics();
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div className="card">
      <h2>URL Statistics</h2>
      <div className="stats-grid">
        {urls.length === 0 && (
          <div className="empty-state">
            <h3>No URLs shortened yet</h3>
            <p>Start shortening URLs to see them here!</p>
          </div>
        )}

        {urls.map((url) => {
          const isExpired = url.validUntil && new Date(url.validUntil) < new Date();
          return (
            <div key={url.id} className={`stat-card ${isExpired ? "expired" : ""}`}>
              <div className="stat-header">
                <a href={url.shortUrl} target="_blank" rel="noreferrer" className="stat-code">
                  {url.alias}
                </a>
                <span className="stat-clicks">{url.clicks} clicks</span>
              </div>
              <div className="stat-url">{url.originalUrl}</div>
              <div className="stat-meta">
                <div className="stat-meta-item">
                  <span className="stat-meta-label">Created</span>
                  <span>{new Date(url.createdAt).toLocaleString()}</span>
                </div>
                <div className="stat-meta-item">
                  <span className="stat-meta-label">Valid Until</span>
                  <span>{url.validUntil ? new Date(url.validUntil).toLocaleString() : "Forever"}</span>
                </div>
              </div>
              <div className="stat-actions">
                <button
                  className="action-button copy-action"
                  onClick={() => navigator.clipboard.writeText(url.shortUrl)}
                >
                  Copy
                </button>
                <button
                  className="action-button delete-action"
                  onClick={() => deleteUrl(url.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StatisticsPage;

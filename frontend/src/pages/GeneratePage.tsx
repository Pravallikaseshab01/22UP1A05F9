import { useState } from "react";

function GeneratePage() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [minutes, setMinutes] = useState("30"); // default 30
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl) return;

    const durationMinutes = minutes && Number(minutes) > 0 ? Number(minutes) : 30;
    const validUntil = new Date(Date.now() + durationMinutes * 60 * 1000).toISOString();

    const res = await fetch("http://localhost:5000/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl, customAlias, validUntil }),
    });

    const data = await res.json();
    setShortUrl(data.shortUrl);
    setOriginalUrl("");
    setCustomAlias("");
    setMinutes("30");
  };

  return (
    <div className="card">
      <h2>Shorten your URL</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Original URL</label>
          <input
            type="url"
            className="form-input"
            placeholder="https://example.com"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Custom Alias (Optional)</label>
          <input
            type="text"
            className="form-input"
            placeholder="e.g. my-link"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Validity (in minutes)</label>
          <input
            type="number"
            min="1"
            className="form-input"
            placeholder="Default: 30"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">Shorten URL</button>
      </form>

      {shortUrl && (
        <div className="result show">
          <div className="result-label">Your shortened URL:</div>
          <div className="result-url">
            <a href={shortUrl} target="_blank" rel="noreferrer" className="result-link">
              {shortUrl}
            </a>
            <button
              className="copy-button"
              onClick={() => navigator.clipboard.writeText(shortUrl)}
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GeneratePage;

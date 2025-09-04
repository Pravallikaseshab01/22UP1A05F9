type HeaderProps = {
  activeTab: string
  setActiveTab: (tab: string) => void
}

function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="logo">ShortLink</div>
          <div className="nav-buttons">
            <button onClick={() => setActiveTab("generate")} className={`nav-button ${activeTab === "generate" ? "active" : ""}`}>Generate</button>
            <button onClick={() => setActiveTab("history")} className={`nav-button ${activeTab === "history" ? "active" : ""}`}>History</button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header

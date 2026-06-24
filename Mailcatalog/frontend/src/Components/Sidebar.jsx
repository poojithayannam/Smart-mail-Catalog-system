export default function Sidebar({ categories, activeCategory, onSelect, unreadCount, onCompose }) {
  return (
    <aside className="sidebar">
      <button className="compose-btn" onClick={onCompose}>
        ✏️ Compose
      </button>
      <div className="sidebar-label">Catalogs</div>
      {categories.map((cat) => {
        const count = unreadCount(cat.id);
        return (
          <div
            key={cat.id}
            className={`cat-item ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => onSelect(cat.id)}
          >
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-label">{cat.label}</span>
            {count > 0 && <span className="cat-badge">{count}</span>}
          </div>
        );
      })}
    </aside>
  );
}
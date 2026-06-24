const AVATAR_COLORS = ["#6366f1","#8b5cf6","#0ea5e9","#f59e0b","#10b981","#ec4899","#f97316","#6b7280"];
const CAT_COLORS = { study:"#8b5cf6", business:"#0ea5e9", social:"#f59e0b", shopping:"#10b981", personal:"#ec4899", news:"#f97316", other:"#6b7280" };

function getColor(str) {
  let hash = 0;
  for (let c of str) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function EmailDetail({ email, categories, onCategoryChange, onClose }) {
  if (!email) {
    return (
      <div className="email-detail">
        <div className="detail-empty">
          <div className="big-icon">📬</div>
          <p>Select an email to read</p>
        </div>
      </div>
    );
  }

  return (
    <div className="email-detail">
      <div className="detail-header">
        <div className="detail-avatar" style={{ background: getColor(email.from) }}>
          {email.avatar}
        </div>
        <div className="detail-meta">
          <div className="detail-subject">{email.subject}</div>
          <div className="detail-from">
            From: <span>{email.from}</span> &nbsp;·&nbsp; {email.time}
          </div>
        </div>
        <div className="detail-actions">
          <button className="action-btn">↩ Reply</button>
          <button className="action-btn">→ Forward</button>
          <button className="action-btn" onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="cat-selector">
        <span className="cat-selector-label">Move to catalog:</span>
        {categories.filter(c => c.id !== "all").map(cat => (
          <span
            key={cat.id}
            className={`cat-chip ${email.category === cat.id ? "active-chip" : ""}`}
            style={{ color: CAT_COLORS[cat.id] || "#6b7280", background: (CAT_COLORS[cat.id] || "#6b7280") + "18" }}
            onClick={() => onCategoryChange(email, cat.id)}
          >
            {cat.icon} {cat.label}
          </span>
        ))}
      </div>

      <div className="detail-body">
        {email.body}
      </div>
    </div>
  );
}
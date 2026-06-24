const AVATAR_COLORS = ["#6366f1","#8b5cf6","#0ea5e9","#f59e0b","#10b981","#ec4899","#f97316","#6b7280"];
const CAT_COLORS = { study:"#8b5cf6", business:"#0ea5e9", social:"#f59e0b", shopping:"#10b981", personal:"#ec4899", news:"#f97316", other:"#6b7280" };

function getColor(str) {
  let hash = 0;
  for (let c of str) hash = c.charCodeAt(0) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function EmailList({ emails, selectedEmail, onSelect, activeCategory, categories }) {
  const catName = categories.find(c => c.id === activeCategory)?.label || "All Mail";
  const catIcon = categories.find(c => c.id === activeCategory)?.icon || "📬";

  return (
    <section className="email-list">
      <div className="list-header">
        <span className="list-title">{catIcon} {catName}</span>
        <span className="list-count">{emails.length} emails</span>
      </div>
      <div className="email-items">
        {emails.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p>No emails in this catalog</p>
          </div>
        ) : (
          emails.map(email => (
            <div
              key={email.id}
              className={`email-item ${!email.read ? "unread" : ""} ${selectedEmail?.id === email.id ? "selected" : ""}`}
              onClick={() => onSelect(email)}
            >
              {!email.read && <div className="unread-dot" />}
              <div className="email-item-top">
                <div className="email-avatar" style={{ background: getColor(email.from) }}>
                  {email.avatar}
                </div>
                <span className="email-from">{email.from.split("@")[0]}</span>
                <span className="email-time">{email.time}</span>
              </div>
              <div className="email-subject">{email.subject}</div>
              <div className="email-preview">{email.body}</div>
              {activeCategory === "all" && (
                <span
                  className="cat-pill"
                  style={{ background: CAT_COLORS[email.category] + "22", color: CAT_COLORS[email.category] }}
                >
                  {email.category}
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
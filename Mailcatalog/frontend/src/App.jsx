import { useState } from "react";
import EmailDetail from "./Components/EmailDetail";
import EmailList from "./Components/EmailList";
import Sidebar from "./Components/Sidebar";
import "./App.css";

const CATEGORIES = [
  { id: "all", label: "All Mail", icon: "📬", color: "#6366f1" },
  { id: "study", label: "Study", icon: "📚", color: "#8b5cf6" },
  { id: "business", label: "Business", icon: "💼", color: "#0ea5e9" },
  { id: "social", label: "Social Media", icon: "📱", color: "#f59e0b" },
  { id: "shopping", label: "Shopping", icon: "🛍️", color: "#10b981" },
  { id: "personal", label: "Personal", icon: "👤", color: "#ec4899" },
  { id: "news", label: "News", icon: "📰", color: "#f97316" },
  { id: "other", label: "Other", icon: "📂", color: "#6b7280" },
];

const MOCK_EMAILS = [
  { id: 1, from: "coursera@coursera.org", subject: "Your React course is ready!", body: "Continue your learning journey with our new React advanced module.", category: "study", time: "10:30 AM", read: false, avatar: "C" },
  { id: 2, from: "hr@techcorp.com", subject: "Interview Invitation - Full Stack Developer", body: "We would like to invite you for a technical interview next Monday.", category: "business", time: "9:15 AM", read: false, avatar: "T" },
  { id: 3, from: "linkedin@linkedin.com", subject: "You have 5 new connection requests", body: "5 people want to connect with you on LinkedIn!", category: "social", time: "8:45 AM", read: true, avatar: "L" },
  { id: 4, from: "flipkart@flipkart.com", subject: "Your order has been shipped! 🚚", body: "Your order #FL4829301 will arrive by tomorrow.", category: "shopping", time: "Yesterday", read: true, avatar: "F" },
  { id: 5, from: "mom@gmail.com", subject: "Come home this weekend?", body: "Hi dear, we are planning a small family get-together this Sunday.", category: "personal", time: "Yesterday", read: false, avatar: "M" },
  { id: 6, from: "udemy@udemy.com", subject: "Your certificate is ready 🎓", body: "Congratulations! You completed the Node.js Bootcamp.", category: "study", time: "Mon", read: true, avatar: "U" },
  { id: 7, from: "newsletter@techcrunch.com", subject: "Top AI News This Week", body: "OpenAI launches new model, Google announces Gemini updates.", category: "news", time: "Mon", read: true, avatar: "N" },
  { id: 8, from: "amazon@amazon.in", subject: "Deal of the Day - 70% OFF Electronics", body: "Limited time offer! Huge discounts on laptops and phones.", category: "shopping", time: "Sun", read: true, avatar: "A" },
  { id: 9, from: "instagram@mail.instagram.com", subject: "Someone liked your post", body: "Your recent post got 42 new likes!", category: "social", time: "Sun", read: true, avatar: "I" },
  { id: 10, from: "infosys@infosys.com", subject: "Internship Completion Certificate", body: "Please find attached your internship completion certificate.", category: "business", time: "Sat", read: true, avatar: "IN" },
];

export default function App() {
  const [emails, setEmails] = useState(MOCK_EMAILS);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [composing, setComposing] = useState(false);

  const filteredEmails = emails.filter((e) => {
    const matchCat = activeCategory === "all" || e.category === activeCategory;
    const matchSearch = search === "" ||
      e.subject.toLowerCase().includes(search.toLowerCase()) ||
      e.from.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const unreadCount = (cat) =>
    emails.filter(e => (cat === "all" || e.category === cat) && !e.read).length;

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
    setEmails(prev => prev.map(e => e.id === email.id ? { ...e, read: true } : e));
  };

  const handleCategoryChange = (email, newCat) => {
    setEmails(prev => prev.map(e => e.id === email.id ? { ...e, category: newCat } : e));
    if (selectedEmail?.id === email.id) setSelectedEmail({ ...selectedEmail, category: newCat });
  };

  return (
    <div className="app">
      {/* Top Bar */}
      <header className="topbar">
        <div className="topbar-left">
          <button className="menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <div className="logo">
            <span className="logo-icon">📬</span>
            <span className="logo-text">Mail<span className="logo-accent">Catalog</span></span>
          </div>
        </div>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search emails..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="topbar-right">
          <div className="avatar">P</div>
        </div>
      </header>

      <div className="main-layout">
        {sidebarOpen && (
          <Sidebar
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
            unreadCount={unreadCount}
            onCompose={() => setComposing(true)}
          />
        )}
        <EmailList
          emails={filteredEmails}
          selectedEmail={selectedEmail}
          onSelect={handleSelectEmail}
          activeCategory={activeCategory}
          categories={CATEGORIES}
        />
        <EmailDetail
          email={selectedEmail}
          categories={CATEGORIES}
          onCategoryChange={handleCategoryChange}
          onClose={() => setSelectedEmail(null)}
        />
      </div>

      {composing && (
        <div className="compose-overlay">
          <div className="compose-modal">
            <div className="compose-header">
              <span>New Message</span>
              <button onClick={() => setComposing(false)}>✕</button>
            </div>
            <input className="compose-input" placeholder="To" />
            <input className="compose-input" placeholder="Subject" />
            <textarea className="compose-body" placeholder="Write your message..." />
            <div className="compose-actions">
              <button className="send-btn">Send ✉️</button>
              <button className="discard-btn" onClick={() => setComposing(false)}>Discard</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/axios";
import type { BookResponse } from "../../types";

/* ═══════════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════════ */
interface FormState {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  edition: string;
  publication_year: string;
  price: string;
  discount_percentage: string;
  stock_quantity: string;
  cover_image_url: string;
  description: string;
  category: string[];
}

const INITIAL_FORM: FormState = {
  isbn: "",
  title: "",
  author: "",
  publisher: "",
  edition: "",
  publication_year: "",
  price: "",
  discount_percentage: "0",
  stock_quantity: "0",
  cover_image_url: "",
  description: "",
  category: [],
};

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════ */

/** Neo-brutalist card section with a colored header band */
const SectionCard = ({
  num,
  title,
  headerColor,
  children,
}: {
  num: string;
  title: string;
  headerColor: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      border: "3px solid #000",
      boxShadow: "5px 5px 0px #000",
      background: "#fff",
    }}
  >
    {/* Header band */}
    <div
      style={{
        background: headerColor,
        borderBottom: "3px solid #000",
        padding: "10px 18px",
      }}
    >
      <span
        style={{
          fontFamily: "'Big Shoulders Display', 'Impact', sans-serif",
          fontWeight: 900,
          fontSize: "1.15rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          color: "#000",
        }}
      >
        {num}. {title}
      </span>
    </div>
    {/* Body */}
    <div style={{ padding: "20px" }}>{children}</div>
  </div>
);

/** Brutalist input field */
const BrutalInput = ({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
    <label
      htmlFor={id}
      style={{
        fontFamily: "'Big Shoulders Display', 'Impact', sans-serif",
        fontWeight: 700,
        fontSize: "0.72rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#222",
      }}
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      style={{
        border: "2.5px solid #000",
        borderRadius: "2px",
        padding: "10px 12px",
        fontSize: "1rem",
        fontFamily: "inherit",
        background: "#f5f5f5",
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
        transition: "box-shadow 0.15s",
      }}
      onFocus={(e) => (e.target.style.boxShadow = "3px 3px 0 #000")}
      onBlur={(e) => (e.target.style.boxShadow = "none")}
    />
  </div>
);

/** Category tag pill */
const CategoryTag = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      background: "#a5f3fc",
      border: "2px solid #000",
      padding: "3px 8px",
      fontSize: "0.75rem",
      fontWeight: 700,
      fontFamily: "'Big Shoulders Display', 'Impact', sans-serif",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      borderRadius: "2px",
    }}
  >
    {label}
    <button
      type="button"
      onClick={onRemove}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontWeight: 900,
        fontSize: "0.85rem",
        lineHeight: 1,
        padding: "0 0 1px 2px",
      }}
      aria-label={`Remove ${label}`}
    >
      ×
    </button>
  </span>
);

/* ═══════════════════════════════════════════════════════════
   PREVIEW MODAL
═══════════════════════════════════════════════════════════ */
const PreviewModal = ({
  form,
  onClose,
}: {
  form: FormState;
  onClose: () => void;
}) => {
  const imgSrc = form.cover_image_url || "https://via.placeholder.com/300x400?text=No+Cover";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.65)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FAFFC7",
          border: "4px solid #000",
          boxShadow: "10px 10px 0 #000",
          padding: "30px",
          maxWidth: "680px",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "14px",
            background: "#FF6D60",
            border: "2px solid #000",
            width: "32px",
            height: "32px",
            cursor: "pointer",
            fontWeight: 900,
            fontSize: "1.1rem",
            lineHeight: "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Close preview"
        >
          ×
        </button>

        <h2
          style={{
            fontFamily: "'Big Shoulders Display', 'Impact', sans-serif",
            fontWeight: 900,
            fontSize: "2rem",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Preview
        </h2>

        <div style={{ display: "flex", gap: "24px" }}>
          <img
            src={imgSrc}
            alt="Book cover"
            style={{
              width: "150px",
              height: "200px",
              objectFit: "cover",
              border: "3px solid #000",
              flexShrink: 0,
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/150x200?text=No+Cover";
            }}
          />
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontFamily: "'Big Shoulders Display', 'Impact', sans-serif",
                fontWeight: 900,
                fontSize: "1.5rem",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              {form.title || "Untitled"}
            </h3>
            <p style={{ fontStyle: "italic", marginBottom: "4px", fontWeight: 600 }}>
              {form.author || "—"}
            </p>
            <p style={{ fontSize: "0.88rem", marginBottom: "4px" }}>
              <b>ISBN:</b> {form.isbn || "—"}
            </p>
            <p style={{ fontSize: "0.88rem", marginBottom: "4px" }}>
              <b>Publisher:</b> {form.publisher || "—"}
            </p>
            <p style={{ fontSize: "0.88rem", marginBottom: "4px" }}>
              <b>Edition:</b> {form.edition || "—"}
            </p>
            <p style={{ fontSize: "0.88rem", marginBottom: "4px" }}>
              <b>Year:</b> {form.publication_year || "—"}
            </p>
            <p style={{ fontSize: "0.88rem", marginBottom: "4px" }}>
              <b>Price:</b> ${form.price || "0"}{" "}
              {form.discount_percentage !== "0" && form.discount_percentage
                ? `(${form.discount_percentage}% off)`
                : ""}
            </p>
            <p style={{ fontSize: "0.88rem", marginBottom: "4px" }}>
              <b>Stock:</b> {form.stock_quantity || "0"}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
              {form.category.map((c) => (
                <span
                  key={c}
                  style={{
                    background: "#a5f3fc",
                    border: "1.5px solid #000",
                    padding: "2px 7px",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {form.description && (
          <div
            style={{
              marginTop: "18px",
              background: "#f5f5f5",
              border: "2px solid #000",
              padding: "12px",
              fontSize: "0.9rem",
              lineHeight: 1.6,
            }}
          >
            {form.description}
          </div>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editBook: BookResponse | undefined = (location.state as any)?.editBook;
  const isEditMode = !!editBook;

  useEffect(() => {
    document.title = isEditMode ? "Edit Book | BookStore" : "Sell Book | BookStore";
  }, [isEditMode]);

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const tagInputRef = useRef<HTMLInputElement>(null);

  /* ─── Pre-populate form when in edit mode ─────────────── */
  useEffect(() => {
    if (editBook) {
      setForm({
        isbn: editBook.isbn ?? "",
        title: editBook.title ?? "",
        author: editBook.author ?? "",
        publisher: editBook.publisher ?? "",
        edition: editBook.edition ?? "",
        publication_year: editBook.publication_year?.toString() ?? "",
        price: editBook.price?.toString() ?? "",
        discount_percentage: editBook.discount_percentage?.toString() ?? "0",
        stock_quantity: editBook.stock_quantity?.toString() ?? "0",
        cover_image_url: editBook.cover_image_url ?? "",
        description: editBook.description ?? "",
        category: editBook.category ?? [],
      });
    }
  }, [editBook?.id]);

  /* ─── Helpers ─────────────────────────────────────────── */
  const setField = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase();
    if (!tag) return;
    if (form.category.includes(tag)) {
      setTagInput("");
      return;
    }
    setForm((prev) => ({ ...prev, category: [...prev.category, tag] }));
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    setForm((prev) => ({
      ...prev,
      category: prev.category.filter((c) => c !== tag),
    }));

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === "Backspace" && !tagInput && form.category.length > 0) {
      setForm((prev) => ({ ...prev, category: prev.category.slice(0, -1) }));
    }
  };

  const handleDiscard = () => {
    if (
      window.confirm("Discard all changes? This cannot be undone.")
    ) {
      setForm(INITIAL_FORM);
      setTagInput("");
      setError(null);
      setSuccess(null);
    }
  };

  /* ─── Submit ──────────────────────────────────────────── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation
    if (form.category.length === 0) {
      setError("Please add at least one category tag.");
      return;
    }

    const payload = {
      isbn: form.isbn.trim(),
      title: form.title.trim(),
      author: form.author.trim(),
      publisher: form.publisher.trim(),
      edition: form.edition.trim() || undefined,
      publication_year: form.publication_year ? parseInt(form.publication_year) : undefined,
      price: parseFloat(form.price),
      discount_percentage: parseFloat(form.discount_percentage) || 0,
      stock_quantity: parseInt(form.stock_quantity) || 0,
      cover_image_url: form.cover_image_url.trim() || undefined,
      description: form.description.trim() || undefined,
      category: form.category,
    };

    try {
      setLoading(true);
      let res: { data: BookResponse };

      if (isEditMode && editBook) {
        // PUT / update existing book
        res = await api.put<BookResponse>(`/books/${editBook.id}`, payload);
        setSuccess(`✓ Book "${res.data.title}" updated successfully!`);
      } else {
        // POST / create new book
        res = await api.post<BookResponse>("/books/", payload);
        setSuccess(`✓ Book "${res.data.title}" added successfully! (ID: ${res.data.id})`);
        setForm(INITIAL_FORM);
        setTagInput("");
      }

      // Navigate to the book after a short delay
      setTimeout(() => navigate(`/product/${res.data.id}`), 1800);
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      if (Array.isArray(detail)) {
        setError(detail.map((d: any) => d.msg).join(". "));
      } else {
        setError(
          detail ||
            (isEditMode ? "Failed to update book. Please try again." : "Failed to add book. Please try again.")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* ─── Inline styles (neo-brutalism palette) ──────────── */
  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#FAFFC7",
    padding: "48px 60px",
    fontFamily: "'Outfit', 'Inter', sans-serif",
    boxSizing: "border-box",
  };

  const headingStyle: React.CSSProperties = {
    fontWeight: 900,
    fontSize: "3rem",
    textTransform: "uppercase",
    textAlign: "center",
    letterSpacing: "0.02em",
    color: "#000",
    marginBottom: "10px",
  };

  const subTextStyle: React.CSSProperties = {
    borderLeft: "4px solid #000",
    paddingLeft: "12px",
    color: "#333",
    fontSize: "0.95rem",
    lineHeight: 1.5,
    marginBottom: "32px",
    maxWidth: "520px",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    alignItems: "start",
  };

  const btnBase: React.CSSProperties = {
    border: "3px solid #000",
    cursor: "pointer",
    fontFamily: "'Big Shoulders Display', 'Impact', sans-serif",
    fontWeight: 900,
    fontSize: "1.1rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "14px 24px",
    transition: "all 0.12s ease",
    display: "inline-block",
  };

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;900&family=Outfit:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div style={pageStyle}>
        {/* ── Page Title ───────────────────────────────────── */}
        <h1 style={headingStyle}>{isEditMode ? "Edit Book" : "Add New Book"}</h1>

        <p style={subTextStyle}>
          Populate the global archive with raw data. All fields must be
          verified against the physical specimen.
        </p>

        {/* ── Feedback banners ─────────────────────────────── */}
        {error && (
          <div
            style={{
              background: "#FF6D60",
              border: "3px solid #000",
              boxShadow: "4px 4px 0 #000",
              padding: "12px 18px",
              marginBottom: "20px",
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "#000",
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              background: "#86efac",
              border: "3px solid #000",
              boxShadow: "4px 4px 0 #000",
              padding: "12px 18px",
              marginBottom: "20px",
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "#000",
            }}
          >
            {success}
          </div>
        )}

        {/* ── Form ─────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} noValidate>
          <div style={gridStyle}>
            {/* ══ LEFT column ══════════════════════════════ */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

              {/* 01. Identity Matrix */}
              <SectionCard num="01" title="Identity Matrix" headerColor="#A5B4FB">
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <BrutalInput
                    id="isbn"
                    label="ISBN Code"
                    placeholder="978-3-16-148410-0"
                    value={form.isbn}
                    onChange={(e) => setField("isbn", e.target.value)}
                    required
                  />
                  <BrutalInput
                    id="title"
                    label="Title"
                    placeholder="Industrial Design 101"
                    value={form.title}
                    onChange={(e) => setField("title", e.target.value)}
                    required
                  />
                  <div style={{ gridColumn: "1 / -1" }}>
                    <BrutalInput
                      id="author"
                      label="Author / Creator"
                      placeholder="Raw Architect & Co."
                      value={form.author}
                      onChange={(e) => setField("author", e.target.value)}
                      required
                    />
                  </div>
                  <BrutalInput
                    id="publisher"
                    label="Publisher"
                    placeholder="NeoPress International"
                    value={form.publisher}
                    onChange={(e) => setField("publisher", e.target.value)}
                    required
                  />
                  <BrutalInput
                    id="edition"
                    label="Edition / Version"
                    placeholder="First Print Rev-A"
                    value={form.edition}
                    onChange={(e) => setField("edition", e.target.value)}
                  />
                </div>
              </SectionCard>

              {/* 02. Market Metrics */}
              <SectionCard num="02" title="Market Metrics" headerColor="#FFC567">
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {/* Row 1 */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "12px",
                    }}
                  >
                    <BrutalInput
                      id="pub_year"
                      label="Pub Year"
                      type="number"
                      placeholder="2024"
                      value={form.publication_year}
                      onChange={(e) => setField("publication_year", e.target.value)}
                    />
                    <BrutalInput
                      id="price"
                      label="List Price ($)"
                      type="number"
                      placeholder="49.99"
                      value={form.price}
                      onChange={(e) => setField("price", e.target.value)}
                      required
                    />
                    <BrutalInput
                      id="discount"
                      label="Discount (%)"
                      type="number"
                      placeholder="15"
                      value={form.discount_percentage}
                      onChange={(e) => setField("discount_percentage", e.target.value)}
                    />
                  </div>

                  {/* Row 2 — categories + stock */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 130px",
                      gap: "12px",
                      alignItems: "start",
                    }}
                  >
                    {/* Categories / Tags */}
                    <div>
                      <label
                        htmlFor="tag-input"
                        style={{
                          fontFamily: "'Big Shoulders Display', 'Impact', sans-serif",
                          fontWeight: 700,
                          fontSize: "0.72rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Categories / Tags
                      </label>
                      <div
                        onClick={() => tagInputRef.current?.focus()}
                        style={{
                          border: "2.5px solid #000",
                          background: "#f5f5f5",
                          padding: "8px 10px",
                          minHeight: "48px",
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "5px",
                          alignItems: "center",
                          cursor: "text",
                        }}
                      >
                        {form.category.map((c) => (
                          <CategoryTag key={c} label={c} onRemove={() => removeTag(c)} />
                        ))}
                        <input
                          ref={tagInputRef}
                          id="tag-input"
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={handleTagKeyDown}
                          onBlur={() => addTag(tagInput)}
                          placeholder={form.category.length === 0 ? "+ Add tag" : ""}
                          style={{
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            fontSize: "0.85rem",
                            flex: 1,
                            minWidth: "70px",
                          }}
                        />
                      </div>
                      <p
                        style={{
                          fontSize: "0.68rem",
                          color: "#555",
                          marginTop: "3px",
                        }}
                      >
                        Press Enter or comma to add a tag
                      </p>
                    </div>

                    {/* Stock Qty */}
                    <BrutalInput
                      id="stock"
                      label="Stock Qty"
                      type="number"
                      placeholder="250"
                      value={form.stock_quantity}
                      onChange={(e) => setField("stock_quantity", e.target.value)}
                    />
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* ══ RIGHT column ═════════════════════════════ */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

              {/* 04. Cover Image URL */}
              <SectionCard num="03" title="Cover Image URL" headerColor="#00995E">
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label
                    htmlFor="cover_url"
                    style={{
                      fontFamily: "'Big Shoulders Display', 'Impact', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      display: "none", // hidden — the section header acts as label
                    }}
                  >
                    Cover Image URL
                  </label>
                  <input
                    id="cover_url"
                    type="url"
                    placeholder="https://cdn.archive.io/assets/cover_001.jpg"
                    value={form.cover_image_url}
                    onChange={(e) => setField("cover_image_url", e.target.value)}
                    style={{
                      border: "2.5px solid #000",
                      borderRadius: "2px",
                      padding: "10px 12px",
                      fontSize: "0.9rem",
                      fontFamily: "inherit",
                      background: "#f5f5f5",
                      outline: "none",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => (e.target.style.boxShadow = "3px 3px 0 #000")}
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                  {/* Tiny preview */}
                  {form.cover_image_url && (
                    <img
                      src={form.cover_image_url}
                      alt="Cover preview"
                      style={{
                        width: "80px",
                        height: "110px",
                        objectFit: "cover",
                        border: "2px solid #000",
                        marginTop: "6px",
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  )}
                </div>
              </SectionCard>

              {/* 03. Abstract Content */}
              <SectionCard num="04" title="Abstract Content" headerColor="#058CD7">
                <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
                  <label
                    htmlFor="description"
                    style={{
                      fontFamily: "'Big Shoulders Display', 'Impact', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.72rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "#222",
                    }}
                  >
                    Full Description
                  </label>
                  <textarea
                    id="description"
                    rows={7}
                    placeholder="Provide a detailed mechanical breakdown of the book's narrative and intent..."
                    value={form.description}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    style={{
                      border: "2.5px solid #000",
                      borderRadius: "2px",
                      padding: "10px 12px",
                      fontSize: "0.92rem",
                      fontFamily: "inherit",
                      background: "#f5f5f5",
                      outline: "none",
                      resize: "vertical",
                      lineHeight: 1.55,
                      boxSizing: "border-box",
                      width: "100%",
                    }}
                    onFocus={(e) => (e.target.style.boxShadow = "3px 3px 0 #000")}
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                  />
                </div>
              </SectionCard>

              {/* ── Action Buttons ──────────────────────── */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* SAVE ENTRY (primary) */}
                <button
                  id="save-entry-btn"
                  type="submit"
                  disabled={loading}
                  style={{
                    ...btnBase,
                    background: "#F075AA",
                    boxShadow: loading ? "none" : "5px 5px 0 #000",
                    width: "100%",
                    fontSize: "1.35rem",
                    padding: "18px",
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      const el = e.currentTarget;
                      el.style.transform = "translate(3px,3px)";
                      el.style.boxShadow = "2px 2px 0 #000";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "";
                    el.style.boxShadow = loading ? "none" : "5px 5px 0 #000";
                  }}
                >
                  {loading ? (isEditMode ? "Updating…" : "Saving…") : (isEditMode ? "Update Entry" : "Save Entry")}
                </button>

                {/* PREVIEW + DISCARD row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <button
                    id="preview-btn"
                    type="button"
                    onClick={() => setShowPreview(true)}
                    style={{
                      ...btnBase,
                      background: "#F3B664",
                      boxShadow: "4px 4px 0 #000",
                      width: "100%",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translate(2px,2px)";
                      e.currentTarget.style.boxShadow = "2px 2px 0 #000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.boxShadow = "4px 4px 0 #000";
                    }}
                  >
                    Preview
                  </button>
                  <button
                    id="discard-btn"
                    type="button"
                    onClick={handleDiscard}
                    style={{
                      ...btnBase,
                      background: "#FF6D60",
                      boxShadow: "4px 4px 0 #000",
                      width: "100%",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translate(2px,2px)";
                      e.currentTarget.style.boxShadow = "2px 2px 0 #000";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.boxShadow = "4px 4px 0 #000";
                    }}
                  >
                    Discard
                  </button>
                </div>
              </div>

            </div>
          </div>
        </form>
      </div>

      {/* ── Preview Modal ─────────────────────────────────── */}
      {showPreview && (
        <PreviewModal form={form} onClose={() => setShowPreview(false)} />
      )}
    </>
  );
};

export default AddProduct;

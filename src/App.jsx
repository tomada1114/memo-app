import { useState, useEffect } from 'react'

const CATEGORIES = ['仕事', '個人', 'アイデア']
const STORAGE_KEY = 'memo-app-memos'

function loadMemos() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    return parsed.map((m) => ({ ...m, createdAt: new Date(m.createdAt) }))
  } catch {
    return []
  }
}

function formatDate(date) {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

function App() {
  const [input, setInput] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])
  const [activeFilter, setActiveFilter] = useState('all')
  const [memos, setMemos] = useState(loadMemos)
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [editingCategory, setEditingCategory] = useState(CATEGORIES[0])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos))
  }, [memos])

  const filteredMemos =
    activeFilter === 'all'
      ? memos
      : memos.filter((m) => m.category === activeFilter)

  function handleAdd() {
    const text = input.trim()
    if (!text) return

    setMemos([
      ...memos,
      {
        id: crypto.randomUUID(),
        text,
        category: selectedCategory,
        createdAt: new Date(),
      },
    ])
    setInput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAdd()
    }
  }

  function handleEditStart(memo) {
    setEditingId(memo.id)
    setEditingText(memo.text)
    setEditingCategory(memo.category)
  }

  function handleEditSave(id) {
    const text = editingText.trim()
    if (!text) return

    setMemos(
      memos.map((m) =>
        m.id === id ? { ...m, text, category: editingCategory } : m,
      ),
    )
    setEditingId(null)
    setEditingText('')
    setEditingCategory(CATEGORIES[0])
  }

  function handleEditCancel() {
    setEditingId(null)
    setEditingText('')
    setEditingCategory(CATEGORIES[0])
  }

  function handleEditKeyDown(e, id) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleEditSave(id)
    }
    if (e.key === 'Escape') {
      handleEditCancel()
    }
  }

  function handleDelete(id) {
    setMemos(memos.filter((m) => m.id !== id))
  }

  return (
    <div className="container">
      <h1>メモアプリ</h1>

      <div className="input-area">
        <textarea
          className="memo-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="メモを入力してください..."
          rows={3}
        />
        <div className="input-bottom">
          <div className="category-select-group">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`category-select-button ${selectedCategory === cat ? 'active' : ''} category--${cat}`}
                onClick={() => setSelectedCategory(cat)}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            className="add-button"
            onClick={handleAdd}
            disabled={!input.trim()}
          >
            追加
          </button>
        </div>
      </div>

      <div className="filter-area">
        <button
          className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          すべて
          <span className="filter-count">{memos.length}</span>
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-button ${activeFilter === cat ? 'active' : ''} category--${cat}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
            <span className="filter-count">
              {memos.filter((m) => m.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      <ul className="memo-list">
        {filteredMemos.map((memo) => (
          <li key={memo.id} className="memo-item">
            {editingId === memo.id ? (
              <div className="edit-area">
                <textarea
                  className="memo-input"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => handleEditKeyDown(e, memo.id)}
                  rows={3}
                  autoFocus
                />
                <div className="edit-category-group">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      className={`category-select-button ${editingCategory === cat ? 'active' : ''} category--${cat}`}
                      onClick={() => setEditingCategory(cat)}
                      type="button"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="edit-actions">
                  <button
                    className="save-button"
                    onClick={() => handleEditSave(memo.id)}
                    disabled={!editingText.trim()}
                  >
                    保存
                  </button>
                  <button className="cancel-button" onClick={handleEditCancel}>
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="memo-text">{memo.text}</p>
                <div className="memo-footer">
                  <div className="memo-meta">
                    <span
                      className={`category-badge category--${memo.category}`}
                    >
                      {memo.category}
                    </span>
                    <time className="memo-date">{formatDate(memo.createdAt)}</time>
                  </div>
                  <div className="memo-actions">
                    <button
                      className="edit-button"
                      onClick={() => handleEditStart(memo)}
                    >
                      編集
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(memo.id)}
                    >
                      削除
                    </button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {filteredMemos.length === 0 && (
        <p className="empty-message">
          {activeFilter === 'all'
            ? 'メモがありません'
            : `「${activeFilter}」のメモがありません`}
        </p>
      )}
    </div>
  )
}

export default App

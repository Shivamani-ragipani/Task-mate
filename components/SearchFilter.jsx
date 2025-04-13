"use client"

const SearchFilter = ({ searchTerm, setSearchTerm, categoryFilter, setCategoryFilter }) => {
  return (
    <div className="search-filter">
      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-container">
        <select className="filter-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Health">Health</option>
          <option value="Finance">Finance</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  )
}

export default SearchFilter

import React, { useState, useEffect } from "react";
import ProjectList from "./components/ProjectList";
import AddProjectForm from "./components/AddProjectForm";
import "./App.css";

function App() {
  const [projects, setProjects] = useState(() => {
    const storedProjects = localStorage.getItem("projects");
    return storedProjects ? JSON.parse(storedProjects) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [tagFilter, setTagFilter] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    setProjects([...projects, project]);
  };

  const handleDelete = (projectToDelete) => {
    setProjects(projects.filter((project) => project.id !== projectToDelete.id));
  };

  const handleEdit = (updatedProject) => {
    const updatedProjects = projects.map((project) =>
      project.id === updatedProject.id ? updatedProject : project
    );
    setProjects(updatedProjects);
  };

  const toggleFavorite = (projectId) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        return { ...project, favorite: !project.favorite };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleTagFilterChange = (e) => {
    setTagFilter(e.target.value);
  };

  const handleShowFavoritesChange = (e) => {
    setShowFavoritesOnly(e.target.checked);
  };

  let filteredProjects = projects
    .filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (tagFilter === "" || p.tags?.includes(tagFilter))
    );

  if (showFavoritesOnly) {
    filteredProjects = filteredProjects.filter((p) => p.favorite);
  }

  filteredProjects.sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const allTags = Array.from(
    new Set(projects.flatMap((project) => project.tags || []))
  );

  return (
    <div className="app-container">
      <h1>🎬 BFF-CMS</h1>

      <input
        type="text"
        placeholder="Zoek op titel..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      <select value={sortBy} onChange={handleSortChange} className="sort-select">
        <option value="date">Sorteer op datum (nieuwste eerst)</option>
        <option value="title">Sorteer op titel (A-Z)</option>
      </select>

      <select value={tagFilter} onChange={handleTagFilterChange} className="tag-filter-select">
        <option value="">Filter op tag (Alles)</option>
        {allTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <label>
        <input
          type="checkbox"
          checked={showFavoritesOnly}
          onChange={handleShowFavoritesChange}
        />{" "}
        Toon alleen favorieten
      </label>

      <AddProjectForm onAdd={addProject} />

      <ProjectList
        projects={filteredProjects}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;

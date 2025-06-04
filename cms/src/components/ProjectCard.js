import React, { useState } from "react";

const ProjectCard = ({ project, onDelete, onEdit, onToggleFavorite }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedProject, setEditedProject] = useState({ ...project });
    const [imagePreview, setImagePreview] = useState(project.image);

    const handleEditChange = (e) => {
        setEditedProject({
            ...editedProject,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setEditedProject({ ...editedProject, image: imageUrl });
        }
    };

    const handleSave = () => {
        onEdit(editedProject);
        setIsEditing(false);
    };

    const extractVideoId = (url) => {
        const regex =
            /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^/]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:v|e(?:mbed)?\/|\S+\?v=))([a-zA-Z0-9_-]{11}))/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <div className="project-card">
            {imagePreview && (
                <img
                    src={imagePreview}
                    alt={editedProject.title}
                    className="project-image"
                />
            )}

            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="title"
                        value={editedProject.title}
                        onChange={handleEditChange}
                        className="edit-input"
                    />
                    <textarea
                        name="description"
                        value={editedProject.description}
                        onChange={handleEditChange}
                        className="edit-input"
                    />
                    <input
                        type="text"
                        name="videoUrl"
                        value={editedProject.videoUrl}
                        onChange={handleEditChange}
                        className="edit-input"
                        placeholder="Voer een YouTube link in"
                    />
                    <input type="file" onChange={handleImageChange} className="image-input" />
                    <button onClick={handleSave} className="save-button">
                        Opslaan
                    </button>
                </div>
            ) : (
                <div>
                    <h2>
                        {project.title}{" "}
                        <button
                            onClick={() => onToggleFavorite(project.id)}
                            className="favorite-button"
                            aria-label={project.favorite ? "Verwijder favoriet" : "Maak favoriet"}
                            style={{
                                color: project.favorite ? "gold" : "gray",
                                border: "none",
                                background: "none",
                                cursor: "pointer",
                                fontSize: "1.5rem",
                            }}
                        >
                            ★
                        </button>
                    </h2>
                    <p>{project.description}</p>
                    {project.videoUrl && (
                        <iframe
                            width="100%"
                            height="200"
                            src={`https://www.youtube.com/embed/${extractVideoId(project.videoUrl)}`}
                            frameBorder="0"
                            allowFullScreen
                            title="YouTube video"
                        ></iframe>
                    )}
                    <button onClick={() => onDelete(project)} className="delete-button">
                        Verwijder
                    </button>
                    <button onClick={() => setIsEditing(true)} className="edit-button">
                        Bewerken
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProjectCard;

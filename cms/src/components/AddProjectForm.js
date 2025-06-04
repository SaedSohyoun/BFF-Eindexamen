import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AddProjectForm = ({ onAdd }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [tags, setTags] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleVideoUrlChange = (e) => setVideoUrl(e.target.value);
    const handleTagsChange = (e) => setTags(e.target.value);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setImage(file);
        }
    };

    const isValidYouTubeUrl = (url) => {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
        return regex.test(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !description.trim()) {
            alert("Titel en beschrijving zijn verplicht.");
            return;
        }

        if (videoUrl && !isValidYouTubeUrl(videoUrl)) {
            alert("Voer een geldige YouTube URL in.");
            return;
        }

        // Tags splitsen op komma en trimmen
        const tagsArray = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0);

        const newProject = {
            id: uuidv4(),
            title,
            description,
            videoUrl,
            tags: tagsArray,
            image: imagePreview,
            createdAt: new Date().toISOString(),
        };

        onAdd(newProject);

        setTitle("");
        setDescription("");
        setVideoUrl("");
        setTags("");
        setImage(null);
        setImagePreview("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Titel"
                value={title}
                onChange={handleTitleChange}
                className="edit-input"
                required
            />
            <textarea
                placeholder="Beschrijving"
                value={description}
                onChange={handleDescriptionChange}
                className="edit-input"
                required
            />
            <input
                type="text"
                placeholder="YouTube Video URL"
                value={videoUrl}
                onChange={handleVideoUrlChange}
                className="edit-input"
            />
            <input
                type="text"
                placeholder="Tags (komma gescheiden)"
                value={tags}
                onChange={handleTagsChange}
                className="edit-input"
            />
            <input
                type="file"
                onChange={handleImageChange}
                className="image-input"
            />
            {imagePreview && (
                <div>
                    <h3>Afbeelding Preview:</h3>
                    <img
                        src={imagePreview}
                        alt="Afbeelding Preview"
                        className="project-image"
                    />
                </div>
            )}
            <button type="submit" className="save-button">
                Voeg Project Toe
            </button>
        </form>
    );
};

export default AddProjectForm;

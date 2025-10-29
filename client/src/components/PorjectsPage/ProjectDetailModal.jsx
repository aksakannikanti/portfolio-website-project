import React, { useEffect, useCallback } from "react";
import styles from "./ProjectDetailModal.module.css";

const ProjectDetailModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const formatDescription = useCallback((text) => {
    if (!text) return "";

    let formattedText = text
      // Convert **text** to bold
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      // Convert *text* to italic
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      // Convert ## Heading to h3
      .replace(/^## (.*$)/gm, "<h3>$1</h3>")
      // Convert # Heading to h2
      .replace(/^# (.*$)/gm, "<h2>$1</h2>")
      // Convert * List items to li (but not ** bold)
      .replace(/^(?!\*\*)\* (.*$)/gm, "<li>$1</li>")
      // Convert line breaks to br tags
      .replace(/\n/g, "<br/>");

    // Wrap consecutive li elements in ul
    formattedText = formattedText.replace(
      /(<li>.*?<\/li>)(<br\/>)*(<li>.*?<\/li>)*/gs,
      (match) => {
        const items = match.match(/<li>.*?<\/li>/g);
        return items ? `<ul>${items.join("")}</ul>` : match;
      }
    );

    // Clean up extra br tags after lists and headings
    formattedText = formattedText
      .replace(/<\/(ul|h[23])><br\/>/g, "</$1>")
      .replace(/<br\/><(h[23]|ul)>/g, "<$1>");

    return formattedText;
  }, []);

  const getStatusClassName = useCallback((status) => {
    if (!status) return styles.statusDefault;

    const statusMap = {
      completed: styles.statusCompleted,
      "in progress": styles.statusInProgress,
      inprogress: styles.statusInProgress,
      planning: styles.statusPlanning,
      planned: styles.statusPlanned,
      "on hold": styles.statusOnHold,
      onhold: styles.statusOnHold,
      canceled: styles.statusCanceled,
      cancelled: styles.statusCanceled,
      prototype: styles.statusPrototype,
      launched: styles.statusLaunched,
      metrics: styles.statusMetrics,
      awarded: styles.statusAwarded,
      passed: styles.statusPassed,
      achievement: styles.statusAchievement,
      archived: styles.statusArchived,
    };

    const normalizedStatus = status.toLowerCase().replace(/\s+/g, "");
    return (
      statusMap[status.toLowerCase()] ||
      statusMap[normalizedStatus] ||
      styles.statusDefault
    );
  }, []);

  if (!project) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleBackdropClick}>
      <div className={styles.modalContainer}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className={styles.modalContent}>
          {project.image ? (
            <div className={styles.projectImageContainer}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.projectImage}
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.classList.add(styles.imageError);
                }}
              />
              {project.featured && (
                <div className={styles.featuredBadge}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Featured
                </div>
              )}
            </div>
          ) : (
            <div className={styles.projectHeaderNoImage}>
              <div className={styles.projectIconPlaceholder}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-image-off-icon lucide-image-off"
                >
                  <line x1="2" x2="22" y1="2" y2="22" />
                  <path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" />
                  <line x1="13.5" x2="6" y1="13.5" y2="21" />
                  <line x1="18" x2="21" y1="12" y2="15" />
                  <path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59" />
                  <path d="M21 15V5a2 2 0 0 0-2-2H9" />
                </svg>
              </div>
              {project.featured && (
                <div className={styles.featuredBadgeNoImage}>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Featured
                </div>
              )}
            </div>
          )}

          <div className={styles.projectDetails}>
            <div className={styles.projectHeader}>
              <div className={styles.titleStatusRow}>
                <div className={styles.titleStatusLeft}>
                  <h1 className={styles.projectTitle}>{project.title}</h1>

                  {project.shortDescription && (
                    <p className={styles.shortDescription}>
                      {project.shortDescription}
                    </p>
                  )}

                  {/* Status Badge */}
                  {project.status && (
                    <span
                      className={`${styles.statusBadge} ${getStatusClassName(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Live Demo Button */}
                {project.demoUrl && project.demoUrl.trim() !== "" && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.liveLinkButton}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <polyline
                        points="15,3 21,3 21,9"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <line
                        x1="10"
                        y1="14"
                        x2="21"
                        y2="3"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>

            {project.description && (
              <div className={styles.descriptionSection}>
                <div
                  className={styles.projectDescription}
                  dangerouslySetInnerHTML={{
                    __html: formatDescription(project.description),
                  }}
                />
              </div>
            )}

            {project.technologies && project.technologies.length > 0 && (
              <div className={styles.tagsSection}>
                <h3 className={styles.sectionTitle}>Technologies Used</h3>
                <div className={styles.tagsContainer}>
                  {project.technologies.map((tech, index) => (
                    <span key={index} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;

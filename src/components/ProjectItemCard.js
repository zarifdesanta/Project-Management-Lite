import React from "react";
import "../styles/components/ProjectItemCard.css";
import { Link } from "react-router-dom";

function ProjectItemCard(props) {
  const { id, model } = props;

  return (
    <Link to={"/project-main/" + id}>
      <div className="project-item-card-container">
        <div>
          <span className="project-card-title">{model?.title}</span>
        </div>
        <div>{model?.starred}</div>
      </div>
    </Link>
  );
}

export default ProjectItemCard;

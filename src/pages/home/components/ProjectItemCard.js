import React, { useEffect } from "react";
import "../../../styles/components/ProjectItemCard.css";
import { Link } from "react-router-dom";

import { FaStar } from "react-icons/fa";

function ProjectItemCard(props) {
  const { id, model, firestoreId } = props;

  return (
    <Link to={"/project-main/" + id} style={{ textDecoration: "none" }}>
      <div className="project-item-card-container">
        <div>
          <span className="project-card-title">{model?.title}</span>
        </div>
        <div className="starred">
          {model?.starred ? (
            <FaStar color="orange"></FaStar>
          ) : (
            <FaStar color="white"></FaStar>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProjectItemCard;

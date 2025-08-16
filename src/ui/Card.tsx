import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, link }) => {
  return (
    <div className="card">
      {imageUrl && <img src={imageUrl} alt={title} />}
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
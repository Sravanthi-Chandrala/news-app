import React from 'react';
import styles from './NewsItem.module.css';

const NewsItem = ({ article }) => (
  <div className={styles.newsItem}>
    <img src={article.image} alt={article.title} />
    <h2>{article.title}</h2>
    <p>{article.description}</p>
    <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
  </div>
);

export default NewsItem;
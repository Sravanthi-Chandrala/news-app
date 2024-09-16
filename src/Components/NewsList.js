import React from 'react';
import NewsItem from './NewsItem';
import styles from './NewsList.module.css';

const NewsList = ({ news, loading }) => {
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.newsList}>
      {news.map((article, index) => (
        <NewsItem key={index} article={article} />
      ))}
    </div>
  );
};

export default NewsList;
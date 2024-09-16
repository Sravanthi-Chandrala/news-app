import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import NewsList from './Components/NewsList';
import Pagination from './Components/Pagination';
import styles from './App.module.css'; 
import axios from 'axios';

function App() {
  const [news, setNews] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);
  const [totalNews, setTotalNews] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetchNews();
  }, [currentPage, searchTerm]);

 
  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/news`, {
        params: { page: currentPage, q: searchTerm },
      });
      setNews(response.data.articles); 
      setTotalNews(response.data.totalArticles); 
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

 
  const handleSearch = (term) => {
    setSearchTerm(term); 
    setCurrentPage(1); 
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.app}> 
      <Header />
      <main className={styles.main}>
        <SearchBar onSearch={handleSearch} /> 
        <NewsList news={news} loading={loading} /> 
        <Pagination
          newsPerPage={newsPerPage}
          totalNews={totalNews}
          paginate={paginate}
          currentPage={currentPage}
        />
      </main>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const apiUrl = 'https://api.tvmaze.com/shows'; // URL de la API de TVMaze
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredData = data.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const shows = await response.json();
        setData(shows);
      } catch (error) {
        console.error('Error de datos TVMaze :', error);
      }
    };

    fetchData();
  }, [apiUrl]);
  return (
    <div className='container'>
      <SearchBar handleSearchChange={handleSearch} />
      <div className='row'>
        {filteredData.map((item) => (  
          <ProductCard  
          id={item.id} 
          title={item.name} 
          image={item.image} />
        ))}
      </div>
    </div>
  );
};

export default Home;

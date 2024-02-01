import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Series = () => {
  const apiUrl = 'https://api.tvmaze.com/shows';
  const [product, setProduct] = useState({});
  const [characters, setCharacters] = useState([]);
  const { id: productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener información del programa y personajes
        const [productResponse, charactersResponse] = await Promise.all([
          fetch(`${apiUrl}/${productId}?embed=episodes`),
          fetch(`${apiUrl}/${productId}/cast`),
        ]);

        if (!productResponse.ok) {
          throw new Error('Error al cargar la series de TVMaze API');
        }

        if (!charactersResponse.ok) {
          throw new Error('Error al cargar la descripciones de TVMaze API');
        }

        const productData = await productResponse.json();
        const charactersData = await charactersResponse.json();

        setProduct(productData);
        setCharacters(charactersData);
      } catch (error) {
        console.error('Error de carga de datos TVMaze:', error);
      }
    };

    fetchData();
  }, [apiUrl, productId]);

  const renderSeasons = () => {
    if (!product || !product._embedded || !product._embedded.episodes) {
      return null;
    }

    const episodesBySeason = product._embedded.episodes.reduce((acc, episode) => {
      const seasonNumber = episode.season;
      acc[seasonNumber] = acc[seasonNumber] || [];
      acc[seasonNumber].push(episode);
      return acc;
    }, {});

    return (
      <>
        <h3>Temporadas</h3>
        {Object.keys(episodesBySeason).map((seasonNumber) => (
          <div key={seasonNumber}>
            <h4>Temporada {seasonNumber}</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {episodesBySeason[seasonNumber].map((episode) => (
                <article key={episode.id} style={{ margin: '8px', padding: '8px', border: '1px solid #ddd', borderRadius: '8px' }}>
                  <img src={episode.image && episode.image.medium} alt={episode.name} style={{ maxWidth: '100%' }} />
                  <p>{episode.name}</p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  };

  const renderCharacters = () => {
    if (!characters || characters.length === 0) {
      return null;
    }

    return (
      <>
        <h3>Personajes</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {characters.map((character) => (
            <div key={character.person.id} style={{ margin: '8px', padding: '8px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '200px' }}>
              <img src={character.person.image && character.person.image.medium} alt={character.person.name} style={{ maxWidth: '100%', marginBottom: '8px' }} />
              <p style={{ fontWeight: 'bold' }}>{character.person.name}</p>
              <p>{character.character.name}</p>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div style={{ width: '86%', margin: '0 auto' }}>
      <div style={{ display: 'flex' }}>
        <img src={product.image && product.image.medium} alt={product.name} style={{ maxWidth: '200px', marginRight: '20px' }} />
        <div>
          <h2>{product.name}</h2>
          <p>{product.summary}</p>
        </div>
      </div>
      <br />
      {renderSeasons()}
      {renderCharacters()}
    </div>
  );
};

export default Series;

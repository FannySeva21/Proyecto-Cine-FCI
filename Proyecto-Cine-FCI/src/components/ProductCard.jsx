import { Link } from 'react-router-dom';

const ProductCard = ({ id, title, description, image, quantity }) => {
  const grayscale = quantity === 0 ? { filter: 'grayscale(100%) brightness(60%)' } : {};

  return (
    <div className='col-md-3 my-3 d-flex align-items-stretch'>
      <div className='card'>
        <Link to={`/series/${id}`}>
          <div className='image-container'>
            <img className='product-image' src={image.medium} alt={title} style={grayscale} />
          </div>
        </Link>
        <div className='card-body d-flex flex-column justify-content-between'>
          <div>
            <h5 className='card-title'>{title}</h5>
            <p className='card-text'>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

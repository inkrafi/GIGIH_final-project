import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../utils/helpers";

const Products = () => {
  const { id } = useParams()
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  const getProducts = useCallback(async () => {
    try {
      if (id) {
        const url = `${import.meta.env.VITE_VIDEOS}/product/${id}`;
        const data = await fetch(url);
        const res = await data.json();
        setProducts(res);
      } else {
        setError("Products not available");
      }
    } catch (error) {
      setError("Something went wrong");
    }
  }, [id]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <div className='Products'>
      <h1>Products</h1>
      <div className="productCard">
        {products && products.map((product, i) =>
        <div className="product" key={i}>
          <a target="_blank" rel="noreferrer" href={product.linkProduct}>
            <img src={product.imageProduct} alt={product.titleProduct} />
          </a>
          <a target="_blank" rel="noreferrer" href={product.linkProduct}>{product.titleProduct}</a>
          <p className="price">{formatCurrency(product.priceProduct)}</p>
        </div>
        )}
        {error && <div>{error}</div>}
      </div>
    </div>
  )
};

export default Products;
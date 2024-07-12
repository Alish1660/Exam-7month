import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_product } from "../../service/products";
import { Carousel } from "react-responsive-carousel";
import "./single.css";
import "../styles/carousel.css";
import http from "../../service/config";

const SinglePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imageurl, setImageurl] = useState("");
  console.log(product);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await get_product(id);
        const image = await http(`/media/${id}`);
        console.log(image);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-page-container">
      <div className="product-image">
        {product.image_url && product.image_url.length > 0 ? (
          <Carousel showArrows={true} showThumbs={false}>
            {product.image_url.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="image"
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="image-placeholder">No Images Available</div>
        )}
      </div>
      <div className="product-details">
        <h2 className="product-name">{product.product_name}</h2>
        <div className="product-info">
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Made In:</strong> {product.made_in}
          </p>
          <p>
            <strong>Color:</strong> {product.color.join(", ")}
          </p>
          <p>
            <strong>Size:</strong> {product.size.join(", ")}
          </p>
          <p>
            <strong>Count:</strong> {product.count}
          </p>
          <p>
            <strong>Cost:</strong> ${product.cost}
          </p>
          <p>
            <strong>Discount:</strong> {product.discount}%
          </p>
          <p>
            <strong>Age Range:</strong> {product.age_min} - {product.age_max}{" "}
            years
          </p>
          <p>
            <strong>For Gender:</strong> {product.for_gender}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;

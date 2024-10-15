"use client";
import useManufacturer from "@/appwriteServices/ManufacturerService";
import useProducts from "@/appwriteServices/productService";
import useFiles from "@/appwriteServices/fileServices";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { LoadingContext } from "@/context/loadingContext";
import Spinner from "./spinner";

const AddProduct = ( props) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const { getProduct } = useProducts();
  const { getManufacturers } = useManufacturer();
  const [manufacturers, setManufacturers] = useState([]);
  const [imagePreview, setImagePreview] = useState(
    "https://via.placeholder.com/150"
  );
  const [image, setImage]     = useState(null);
  const [product, setProduct] = useState({
    ProductName: "",
    ProductDescription: "",
    ProductSize: "",
    ProductUnit: null,
    ProductInventoryLevel: null,
    ProductPrice: null,
    ManuId: "",
  });

  useEffect(() => {
    (async () => {
      const res = await getManufacturers();
      setManufacturers(res.documents);
    })();
  }, []);
  useEffect(() => {
    (async () => {   
      if (typeof props.productPropsId === "string" && props.productPropsId !== "product-registration") {
        setLoading(true);
        const product = await getProduct(props.productPropsId);
        setProduct(product);
        setImagePreview(product.ProductImageUrl);
        console.log(res.documents);
        
        setLoading(false);
      }
    })();
  }, [props.productPropsId,manufacturers]);

  const { createProduct } = useProducts();
  const { createFile } = useFiles();

  const submitProduct = async (e) => {
    e.preventDefault();
    //By default Number also considering as a string so, passing parameter like this.
    const res = await createFile(image);
    console.log(res);
    if (res.$id) {
      const productRes = await createProduct({
        ProductName: product.ProductName,
        ProductDescription: product.ProductDescription,
        ProductSize: product.ProductSize,
        ProductUnit: Number(product.ProductUnit),
        ProductInventoryLevel: Number(product.ProductInventoryLevel),
        ProductPrice: Number(product.ProductPrice),
        ManuId: product.ManuId,
        ProductImageUrl: res.$id,
      });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result); // Set the preview URL
    };

    if (file) {
      reader.readAsDataURL(file); // Convert the image to base64 URL
    }
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={submitProduct}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="text"
          >
            Product Name
          </label>
          <input
            type="text"
            name="ProductName"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter Product Name"
            value={product.ProductName}
            onChange={(e) =>
              setProduct({ ...product, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="text"
          >
            Product Description
          </label>
          <input
            type="text"
            name="ProductDescription"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter Product Description"
            value={product.ProductDescription}
            onChange={(e) =>
              setProduct({ ...product, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="text"
          >
            Product Size
          </label>
          <input
            type="text"
            name="ProductSize"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter Product Size"
            value={product.ProductSize}
            onChange={(e) =>
              setProduct({ ...product, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="text"
          >
            Product Unit
          </label>
          <input
            type="text"
            name="ProductUnit"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter Product Unit"
            value={product.ProductUnit}
            onChange={(e) =>
              setProduct({ ...product, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="text"
          >
            Product Inventory Level
          </label>
          <input
            type="text"
            name="ProductInventoryLevel"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter Product Inventory Level"
            value={product.ProductInventoryLevel}
            onChange={(e) =>
              setProduct({ ...product, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="text"
          >
            Product Price
          </label>
          <input
            type="text"
            name="ProductPrice"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter Product Price"
            value={product.ProductPrice}
            onChange={(e) =>
              setProduct({ ...product, [e.target.name]: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg">
          {/* Image preview */}
          <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={imagePreview}
              alt="Current Image"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Upload button */}
          <label className="mt-4 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Upload New Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <select
          id="role"
          name="ManuId"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          value={product.ManuId}
          onChange={(e) =>
            setProduct({ ...product, [e.target.name]: e.target.value })
          }
          required
        >
          <option value="" disabled>
            -- Select manufacturer --
          </option>
          {manufacturers.map((manufacturer) => (
            <option key={manufacturer.$id} value={manufacturer.$id}>
              {manufacturer.ManufacturerName}
            </option>
          ))}
        </select>
        {
          (props.productPropsId && props.productPropsId == 'product-registration' ? (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Add Product
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition duration-200"
            >
              Update Product
            </button>
          ))
        }
      </form>
    </div>
  );
};

export default AddProduct;

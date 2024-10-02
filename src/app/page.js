"use client";
import useManufacturer from "@/appwriteServices/ManufacturerService";
import useProducts from "@/appwriteServices/productService";
import { useEffect, useState } from "react";

const page = () => {
  const { getManufacturers } = useManufacturer();
  const [manufacturers, setManufacturers] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await getManufacturers();
      setManufacturers(res.documents);
    })();
  }, []);

  const { createProduct } = useProducts();
  const [product, setProduct] = useState({
    ProductName: "",
    ProductDescription: "",
    ProductSize: "",
    ProductUnit: null,
    ProductInventoryLevel: null,
    ProductPrice: null,
    ManuId: "",
  });

  const submitProduct = async (e) => {
    e.preventDefault();
    //By default Number also considering as a string so, passing parameter like this.
    const res = await createProduct({
      ProductName: product.ProductName,
      ProductDescription: product.ProductDescription,
      ProductSize: product.ProductSize,
      ProductUnit: Number(product.ProductUnit),
      ProductInventoryLevel: Number(product.ProductInventoryLevel),
      ProductPrice: Number(product.ProductPrice),
      ManuId: product.ManuId,
    });
  };
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

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default page;

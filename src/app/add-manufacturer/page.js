"use client";
import { useState, useContext } from "react";
import { LoadingContext } from "@/context/loadingContext";
import Spinner from "@/_components/spinner";
import useManufacturer from "@/appwriteServices/ManufacturerService";

const Page = () => {
  const [manufacturer, setManufacturer] = useState({
    ManufacturerName: "",
    ManufacturerDescription: "",
    ManuCity: "",
    ManuGrade: "",
    ManuCountry: "",
  });
  const { loading, setLoading } = useContext(LoadingContext);

  const { addManufacturer } = useManufacturer();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const resultData = await addManufacturer(manufacturer);
    setLoading(false);
    console.log(resultData);
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Manufacturer
        </h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="text"
          >
            Manufacturer Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Enter manufacturer name"
            value={manufacturer.ManufacturerName}
            onChange={(e) =>
              setManufacturer({
                ...manufacturer,
                ManufacturerName: e.target.value,
              })
            }
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="text"
          >
            Manufacturer Description
          </label>
          <input
            type="text"
            name="ManufacturerDescription"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="enter manufacturer description"
            value={manufacturer.ManufacturerDescription}
            onChange={(e) =>
              setManufacturer({
                ...manufacturer,
                ManufacturerDescription: e.target.value,
              })
            }
          />
        </div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="text"
        >
          Manufacturer City
        </label>
        <input
          type="text"
          name="ManuCity"
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="enter manufacturer city"
          value={manufacturer.ManuCity}
          onChange={(e) =>
            setManufacturer({ ...manufacturer, ManuCity: e.target.value })
          }
        />

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="role"
          >
            Manufacturer Grade
          </label>
          <input
            type="text"
            name="ManuGrade"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="enter manufacturer grade"
            value={manufacturer.ManuGrade}
            onChange={(e) =>
              setManufacturer({ ...manufacturer, ManuGrade: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="text"
          >
            Manufacturer Country
          </label>
          <input
            type="text"
            name="ManuCountry"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="enter manufacturer country"
            value={manufacturer.ManuCountry}
            onChange={(e) =>
              setManufacturer({ ...manufacturer, ManuCountry: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
        >
          Add Manufacturer
        </button>
      </form>
    </div>
  );
};

export default Page;

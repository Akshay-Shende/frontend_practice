import useFiles from "@/appwriteServices/fileServices";
const Card = ({ product }) => {
  const { getFilePreview, getFileView } = useFiles();


  return (
    <div className="rounded overflow-hidden shadow-lg bg-white w-64 h-30">
      <img
        className="w-full"
        src={getFilePreview(product.ProductImageUrl)}
        alt={product.ProductName}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.ProductName}</div>
        <p className="text-gray-700 text-base">{product.ProductDescription}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #tag1
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #tag2
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #tag3
        </span>
      </div>
    </div>
  );
};

export default Card;

import Image from "next/image";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";


const ProductCard = ({ product }) => {
  return (
    <Card className="shadow-md h-full flex flex-col">
      <div className="relative w-full h-80">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-t-lg"
        />
      </div>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-lg font-bold line-clamp-2">
          {product.name}
        </CardTitle>
        
      </CardContent>
    </Card>
  );
};

export default ProductCard;

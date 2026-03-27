"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Eye, Edit } from "lucide-react";
import ViewProduct from "./ViewProduct";
import { useRouter } from "next/navigation";
import DeleteProduct from "./DeleteProduct";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  reserved: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  specifications: {
    id: string;
    name: string;
    value: string;
  }[];
}

const ProductsList = ({ products }: { products: Product[] }) => {
  const router = useRouter();

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-right">Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.images?.[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover w-10 h-10 border"
                      unoptimized
                    />
                  ) : (
                    <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-[10px] text-muted-foreground border">
                      No img
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium align-middle">
                  {product.name}
                </TableCell>
                <TableCell className="align-middle">
                  {product.category?.name || "Uncategorized"}
                </TableCell>
                <TableCell className="text-right align-middle">
                  $
                  {typeof product.price === "number"
                    ? product.price.toFixed(2)
                    : parseFloat(product.price || 0).toFixed(2)}
                </TableCell>
                <TableCell className="text-center align-middle">
                  {product.stock}
                </TableCell>
                <TableCell className="text-right align-middle text-muted-foreground text-sm">
                  {new Date(product.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right align-middle">
                  <div className="flex items-center justify-end gap-3">
                    <ViewProduct data={product} />
                    <button className="text-muted-foreground hover:text-primary transition-colors">
                      <Edit
                        className="w-4 h-4"
                        onClick={() =>
                          router.push(`/products?id=${product.id}`)
                        }
                      />
                    </button>
                    <DeleteProduct data={product} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsList;

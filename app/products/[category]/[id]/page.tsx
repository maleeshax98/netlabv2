import ProductDetails from "@/components/products/ProductDetails";

const page = async ({
  params,
}: {
  params: Promise<{ id: string; category: string }>;
}) => {
  const { id, category } = await params;
  console.log(id, category);

  return (
    <div>
      <ProductDetails id={id} category={category} />
    </div>
  );
};

export default page;

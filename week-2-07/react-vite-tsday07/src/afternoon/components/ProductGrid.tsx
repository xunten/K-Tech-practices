type Product = { id:number; title:string; images:string[]; price:number; };

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(prod => (
        <div key={prod.id} className="border p-2 rounded">
          <img src={prod.images[0]} alt={prod.title} className="h-62 w-full object-cover"/>
          <div>{prod.title}</div>
          <div className="text-blue-700 font-bold">${prod.price}</div>
        </div>
      ))}
    </div>
  );
}
export default ProductGrid;
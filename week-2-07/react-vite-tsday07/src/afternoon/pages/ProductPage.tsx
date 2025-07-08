

import { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';

function ProductPage() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      fetch(`https://api.escuelajs.co/api/v1/products?offset=${(page - 1) * 4}&limit=4`)
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setTotalPages(5); // Tuỳ chỉnh nếu có phân trang thật
        });
    } else {

      Promise.all(
        selectedCategories.map((catId) =>
          fetch(`https://api.escuelajs.co/api/v1/categories/${catId}/products?offset=${(page - 1) * 4}&limit=4`)

            .then((res) => res.json())
        )
      ).then((allProductsArrays) => {
        const merged = allProductsArrays.flat(); // Gộp sản phẩm từ nhiều danh mục
        setProducts(merged);
        setTotalPages(5); // Tuỳ chỉnh theo số lượng thực tế
      });
    }
    // // Fetch products for the selected category (only one at a time for simplicity)
    // fetch(`https://api.escuelajs.co/api/v1/categories/${selectedCategories[0]}/products?offset=${(page - 1) * 4}&limit=4`)
    //   .then(res => res.json())
    //   .then(data => {
    //     setProducts(data);
    //     // You may need to fetch the total count separately for totalPages
    //     setTotalPages(5); // Placeholder, set to actual value after fetching count
    //   });
  }, [selectedCategories, page]);

  return (
    <div className="flex">
      <Sidebar
        selectedCategories={selectedCategories}
        onChange={setSelectedCategories}
      />
      <main className="flex-1 p-4">
        <h2 className="text-2xl font-bold border-b pb-2 mb-4">Danh sách sản phẩm</h2>
        <ProductGrid products={products} />
        <Pagination current={page} total={totalPages} onChange={setPage} />
      </main>
    </div>
  );

}
export default ProductPage;

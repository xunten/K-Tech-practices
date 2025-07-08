import { useEffect, useState } from 'react';

type Category = { id: number; name: string };

function Sidebar({
    selectedCategories,
    onChange,
}: {
    selectedCategories: number[];
    onChange: (ids: number[]) => void;
}) {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch("https://api.escuelajs.co/api/v1/categories")
            .then((res) => res.json())
            .then(setCategories);
    }, []);

    const toggleCategory = (id: number) => {
        if (selectedCategories.includes(id)) {
            onChange(selectedCategories.filter((cid) => cid !== id));
        } else {
            onChange([...selectedCategories, id]);
        }
    };

    return (
        <aside className="w-64 p-4 bg-white border-r min-h-screen">

            <nav className="text-sm text-gray-500 mb-4">
                <span className="hover:underline cursor-pointer">Home</span>
                <span className="mx-1">›</span>
                <span className="font-medium text-gray-700">Product</span>
            </nav>

            <h2 className="text-xl font-bold mb-4">Bộ lọc</h2>
            <div className="space-y-3">
                {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-2 text-gray-700">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat.id)}
                            onChange={() => toggleCategory(cat.id)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded"
                        />
                        <span>{cat.name}</span>
                    </label>
                ))}
            </div>
        </aside>
    );
}
export default Sidebar;

function Pagination({
    current,
    total,
    onChange,
}: {
    current: number
    total: number
    onChange: (page: number) => void
}) {
    const pages = Array.from({ length: total }, (_, i) => i + 1)

    return (
        <div className="flex gap-2 mt-6 justify-center items-center">
            <button
                className="w-10 h-8 text-sm text-blue-500 disabled:text-gray-400"
                onClick={() => onChange(current - 1)}
                disabled={current === 1}
            >
                Prev
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onChange(page)}
                    className={`w-8 h-8 rounded-md text-sm transition 
            ${page === current
                            ? 'bg-blue-500 text-white font-medium'
                            : 'bg-white text-blue-500 hover:bg-gray-100'
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                className="w-10 h-8 text-sm text-blue-500 disabled:text-gray-400"
                onClick={() => onChange(current + 1)}
                disabled={current === total}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination

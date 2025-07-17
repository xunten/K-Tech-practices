import { useForm } from 'react-hook-form';

interface IFormInput {
    status: string;
    priority: string;
}

type Props = {
    onSearch?: (filters: IFormInput) => void;
};

export default function TaskFilterForm({ onSearch }: Props) {
    // react form hook
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues: {
            status: '',
            priority: '',
        },
        mode: 'onChange',
    });

    const onSubmit = (data: IFormInput) => {
        if (onSearch && typeof onSearch === 'function') {
            onSearch(data);
        }
    };

    return (
        <div className="bg-white pb-4 pl-4 rounded-lg ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-wrap items-end gap-6"
            >
                {/* Status */}
                <div className="flex flex-col">
                    <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <select
                        {...register("status")}
                        id="status"
                        name="status"
                        className={`border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.status
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-500"
                            }`}
                    >
                        <option value="">All</option>
                        <option value="to_do">To Do</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    {errors.status && (
                        <span className="text-sm text-red-500 mt-1">{errors.status.message}</span>
                    )}
                </div>

                {/* Priority */}
                <div className="flex flex-col">
                    <label htmlFor="priority" className="text-sm font-medium text-gray-700 mb-1">
                        Priority
                    </label>
                    <select
                        {...register("priority")}
                        id="priority"
                        name="priority"
                        className={`border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 ${errors.priority
                                ? "border-red-500 focus:ring-red-400"
                                : "border-gray-300 focus:ring-blue-500"
                            }`}
                    >
                        <option value="">All</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    {errors.priority && (
                        <span className="text-sm text-red-500 mt-1">{errors.priority.message}</span>
                    )}
                </div>

                {/* Submit */}
                <div className="flex flex-col">
                    <span className="invisible mb-1">Search</span>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>

    );
}
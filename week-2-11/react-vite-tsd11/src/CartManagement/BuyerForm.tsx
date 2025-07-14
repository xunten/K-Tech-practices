import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from 'react-hook-form';

const schema = yup.object({
    name: yup
        .string().min(2, 'Minimum 2 characters').required('Name is required'),
    email: yup
        .string().email('Email is invalid').required('Email is required'),
    address: yup
        .string().min(5, 'Minimum 5 characters').required('Address is required'),
});

type BuyerFormData = yup.InferType<typeof schema>;

export default function BuyerForm() {

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<BuyerFormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    })

    const onSubmit = (data: BuyerFormData) => {
        console.log(data);
        alert("Thanh toan thanh cong!");
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4"
        >
            <h2 className="text-2xl font-bold text-center mb-4">Thông tin người mua</h2>

            <div>
                <label htmlFor="name" className="block font-medium mb-1">
                    Họ tên:
                </label>
                <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="block font-medium mb-1">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="address" className="block font-medium mb-1">
                    Địa chỉ:
                </label>
                <input
                    type="text"
                    id="address"
                    {...register("address")}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}
            </div>

            <div className="text-center">
                <button
                    disabled={!isValid}
                    type="submit"
                    className={`w-full py-2 px-4 rounded text-white font-semibold transition ${isValid
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    Xác nhận
                </button>
            </div>
        </form>

    )
}
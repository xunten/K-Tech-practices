import React, { useEffect } from 'react'

const url = 'https://server.aptech.io/online-shop/customers';

type Props = {
    customerId?: number; // Optional prop to specify which customer to update
    onUpdated?: (customer: any) => void; // Callback function to handle the updated customer data
    onClose?: () => void; // Callback function to handle closing the update form
}
const UpdateCustomer = ({ customerId, onUpdated, onClose }: Props) => {

    useEffect(() => {
        // Fetch customer data if needed, e.g., based on an ID passed as a prop
        const fetchCustomerData = async () => {
            try {
                // const response = await fetch(url);
                const response = await fetch(url + '/' + customerId);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                return data; // Handle the fetched data
                console.log('Fetched customer data:', data);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };
        fetchCustomerData().then((data) => {
            if (data) {
                setFormData({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                    phoneNumber: data.phoneNumber || '',
                    address: data.address || '',
                    birthday: data.birthday || '',
                });
            }
        });
    }, [customerId]);

    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        birthday: ''
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        console.log(`Input changed: ${id} = ${value}`);
        setFormData({
            ...formData,
            [id]: value,
        });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        try {
            //const response = await fetch(`${url}/${customerId}`, {

            const response = await fetch((url + '/' + customerId), {
                method: 'PATCH', // Use PATCH for updating existing records
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Success:', data);
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                address: '',
                birthday: ''
            });
            if (onUpdated && typeof onUpdated === 'function') {
                onUpdated(data); // Call the callback with the updated customer data
            }
            alert('Customer updated successfully!');
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    return (
        <div>
            {/* Create tailwindcss Form (firstName, lastName, email, phoneNumber, address, birthday) */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold mb-4">Update Customer</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">First Name</label>
                    <input type="text" id='firstName' value={formData.firstName} className="w-full p-2 border rounded" onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Last Name</label>
                    <input type="text" id='lastName' value={formData.lastName} className="w-full p-2 border rounded" onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" id='email' value={formData.email} className="w-full p-2 border rounded" onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input type="tel" id='phoneNumber' value={formData.phoneNumber} className="w-full p-2 border rounded" onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input type="text" id='address' value={formData.address} className="w-full p-2 border rounded" onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Birthday</label>
                    <input type="date" id='birthday' value={formData.birthday} className="w-full p-2 border rounded" onChange={handleChange} />
                </div>
                {/* button cancel & update customer */}
                <div className="flex justify-between">
                    <button type="button" onClick={onClose} className="w-1/2 bg-gray-300 text-black py-2 rounded hover:bg-gray-400 mr-2">Cancel</button>
                    <button type="submit" className="w-1/2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Update Customer</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateCustomer
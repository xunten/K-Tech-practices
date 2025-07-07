import React, { useEffect } from 'react'
import UpdateCustomer from '../UpdateCustomer';
import CreateCustomer from '../CreateCustomer';
import DeleteCustomer from '../DeleteCustomer';

const url = 'https://server.aptech.io/online-shop/customers';

type Customer = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    birthday: string;
};
type Props = {
    reload?: number;
    updateComponent?: React.ComponentType<{
        customerId: number;
        onUpdated: (customer: any) => void;
        onClose: () => void;
    }>;
}

const ListCustomer = ({ reload = 0 }: Props) => {

    const [showModal, setShowModal] = React.useState<boolean>(false);

    const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null);
    const [customers, setCustomers] = React.useState<Customer[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    useEffect(() => {
        // Fetch customers from the API
        const fetchCustomers = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCustomers(data);
                setLoading(false);
                console.log(data); // Handle the fetched data
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCustomers();
    }, [reload]);

    const handleOnSelect = (customer: Customer) => {
        setSelectedCustomer(customer);
        setShowModal(true);
        console.log('Selected customer:', customer);
    }

    const handleOnUpdated = (customer: Customer) => {
        setSelectedCustomer(null);
        setShowModal(false);
        setCustomers(prevCustomers =>
            prevCustomers.map(c => c.id === customer.id ? customer : c)
        );

        console.log('Customer updated:', customer);
    }

    const handleOnCreated = (customer: Customer) => {
        setCustomers(prevCustomers => [...prevCustomers, customer]);
        console.log('Customer created:', customer);
    }

    return (
        <div className='container mx-auto bg-white rounded shadow mb-4 p-4'>
            <CreateCustomer onCreated={handleOnCreated} />
            <table className="table-auto border-separate border border-gray-400 table-hover w-full">
                <thead>
                    <tr>
                        <th className='border border-gray-300 p-2'>ID</th>
                        <th className='border border-gray-300 p-2'>Name</th>
                        <th className='border border-gray-300 p-2'>Email</th>
                        <th className='border border-gray-300 p-2'>Phone</th>
                        <th className='border border-gray-300 p-2'>Address</th>
                        <th className='border border-gray-300 p-2'>Birthday</th>
                        <th className='border border-gray-300 p-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers?.map((customer: any, index) => {
                        return (
                            <tr key={index} className='hover:bg-gray-200'>
                                <td className='border border-gray-300 p-2 text-right'>{customer.id}</td>
                                <td className='border border-gray-300 p-2 font-bold'>{customer.firstName} {customer.lastName}</td>
                                <td className='border border-gray-300 p-2 whitespace-nowrap'>{customer.email}</td>
                                <td className='border border-gray-300 p-2'>{customer.phoneNumber}</td>
                                <td className='border border-gray-300 p-2 whitespace-nowrap'>{customer.address}</td>
                                <td className='border border-gray-300 p-2 whitespace-nowrap'>{customer.birthday}</td>
                                <td className='border border-gray-300 p-2 flex justify-center'>
                                    <button onClick={() => handleOnSelect(customer)} className='bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition-colors mr-2'>Edit</button>
                                    <DeleteCustomer
                                        customerId={customer.id}    
                                        onDeleted={(deletedId) => {
                                            setCustomers(prevCustomers => prevCustomers.filter(c => c.id !== deletedId));
                                            console.log('Customer deleted:', deletedId);
                                        }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {loading && <div className='text-center mt-4'>Loading...</div>}
            {!loading && customers.length === 0 && <div className='text-center mt-4'>No customers found.</div>}
            {showModal && selectedCustomer && (
                <div className='fixed flex inset-0 bg-opacity-50 items-center justify-center z-50'>
                    <div className='bg-white rounded shadow-lg p-6 w-full max-w-md relative'>
                        <UpdateCustomer
                            customerId={selectedCustomer.id}
                            onUpdated={handleOnUpdated}
                            onClose={() => setSelectedCustomer(null)}
                        />
                    </div>
                </div>
            )}
        </div>

    )
}

export default ListCustomer
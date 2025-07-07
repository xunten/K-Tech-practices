import React from 'react'

const url = 'https://server.aptech.io/online-shop/customers';
type Props = {
    customerId: number; // The ID of the customer to delete
    onDeleted?: (customerId: number) => void; // Callback function to handle deletion
}

const DeleteCustomer = ({customerId, onDeleted}: Props) => {

    const handleDelete = async (customerId: number) => {
        try { 
            if (!confirm('Are you sure you want to delete this customer?')) {
                return; // Exit if the user cancels the deletion
            }

            const response = await fetch(`${url}/${customerId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Customer deleted:', data);
            if (onDeleted && typeof onDeleted === 'function') {
                onDeleted(customerId); // Call the callback function with the deleted customer ID
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

  return (
    <div>
        <button onClick={() => handleDelete(customerId)} className='bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors mr-2'>Delete</button>
    </div>
  )
}

export default DeleteCustomer
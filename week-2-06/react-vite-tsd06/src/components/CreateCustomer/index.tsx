import React from 'react'

const url = 'https://server.aptech.io/online-shop/customers';

type Props = {
  onCreated?: (customer: any) => void;
}


const CreateCustomer = ({ onCreated }: Props) => {

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
      const response = await fetch(url, {
        method: 'POST',
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
      
      if (onCreated && typeof onCreated === 'function') {
        onCreated(data);
      }      
      alert('Customer created successfully!');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <div>
      {/* Create tailwindcss Form (firstName, lastName, email, phoneNumber, address, birthday) */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Customer</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input type="text" id='firstName' value={formData.firstName} className="w-full p-2 border rounded" onChange={handleChange} required/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input type="text" id='lastName' value={formData.lastName} className="w-full p-2 border rounded" onChange={handleChange} required/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" id='email' value={formData.email} className="w-full p-2 border rounded" onChange={handleChange} required/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input type="tel" id='phoneNumber' value={formData.phoneNumber} className="w-full p-2 border rounded" onChange={handleChange} required/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Address</label>
          <input type="text" id='address' value={formData.address} className="w-full p-2 border rounded" onChange={handleChange} required/>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Birthday</label>
          <input type="date" id='birthday' value={formData.birthday} className="w-full p-2 border rounded" onChange={handleChange} required/>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Create Customer</button>
      </form>
    </div>
  )
}

export default CreateCustomer
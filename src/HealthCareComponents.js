import React, { useState } from "react";
import "./App.css";

const HealthCareComponents=()=> {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: "", description: "", price: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentService, setCurrentService] = useState(null);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  // Add a new service
  const addService = (e) => {
    e.preventDefault();
    if (newService.name && newService.description && newService.price) {
      setServices([...services, newService]);
      setNewService({ name: "", description: "", price: "" });
    } else {
      alert("Please fill all fields");
    }
  };

  // Delete a service
  const deleteService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
  };

  // Set service to edit
  const editService = (index) => {
    setIsEditing(true);
    setCurrentService(index);
    setNewService(services[index]);
  };

  // Update service
  const updateService = (e) => {
    e.preventDefault();
    const updatedServices = services.map((service, index) =>
      index === currentService ? newService : service
    );
    setServices(updatedServices);
    setIsEditing(false);
    setNewService({ name: "", description: "", price: "" });
  };

  return (
    <div className="HeadOfTheHealthServiceComponent">
      <h1>Healthcare Services</h1>

      <form onSubmit={isEditing ? updateService : addService}>
        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={newService.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Service Description"
          value={newService.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Service Price"
          value={newService.price}
          onChange={handleInputChange}
        />
        <button type="submit">{isEditing ? "Update Service" : "Add Service"}</button>
      </form>

      <ul>
        {services.map((service, index) => (
          <li key={index}>
            <div>
              <strong>{service.name}</strong> - {service.description} ($ {service.price})
            </div>
            <button onClick={() => editService(index)}>Edit</button>
            <button onClick={() => deleteService(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HealthCareComponents;




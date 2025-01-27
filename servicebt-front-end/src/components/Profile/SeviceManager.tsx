//components/Profile/ServiceManager to manage services
import React, { useState, useEffect } from 'react';
import ItemList from '@/components/Shared/ItemList';
import ItemService from '@/app/api/ServiceProvider/itemservice';
import { toast } from 'react-toastify';

interface Service {
  id: string;
  name: string;
}

const ServiceManager: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const serviceApi = new ItemService('services');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await serviceApi.getAll();
      setServices(data);
    } catch (error) {
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (name: string) => {
    try {
      const newService = await serviceApi.create(name);
      setServices([...services, newService]);
      toast.success('Service added successfully');
    } catch (error) {
      toast.error('Failed to add service');
      throw error;
    }
  };

  const handleRemoveService = async (index: number) => {
    const service = services[index];
    try {
      await serviceApi.delete(service.id);
      setServices(services.filter((_, i) => i !== index));
      toast.success('Service removed successfully');
    } catch (error) {
      toast.error('Failed to remove service');
      throw error;
    }
  };

  return (
    <ItemList
      title="Services"
      items={services.map(service => service.name)}
      onAdd={handleAddService}
      onRemove={handleRemoveService}
      placeholder="Add new service"
      loading={loading}
      maxItems={15}
      gridCols={3}
    />
  );
};

export default ServiceManager;
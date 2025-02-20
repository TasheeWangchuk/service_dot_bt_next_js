import { Tab } from '@headlessui/react';
const TabSection = () => {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-4">
        <Tab
          className={({ selected }) =>
            `px-4 py-2 rounded ${selected ? 'bg-orange-500 text-gray-100 border-transparent' : 'bg-gray-100'}`
          }
        >
          Services
        </Tab>
        <Tab
          className={({ selected }) =>
            `px-4 py-2 rounded ${selected ? 'bg-orange-500 text-gray-100 border-transparent' : 'bg-gray-100'}`
          }
        >
          Vision
        </Tab>
        <Tab
          className={({ selected }) =>
            `px-4 py-2 rounded ${selected ? 'bg-orange-500 text-gray-100 border-transparent' : 'bg-gray-100'}`
          }
        >
          Our Team
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className="p-4">
        At Service.bt, we are a dedicated team of professionals passionate about simplifying the way services are delivered and accessed in Bhutan. Our team consists of tech enthusiasts, service industry experts, and customer-focused individuals, all working together to create a seamless, reliable platform for both service providers and clients.

We believe in empowering local businesses, fostering trust, and ensuring that every experience on our platform is smooth and satisfactory. From our developers and designers to our customer support team, we are committed to building a thriving ecosystem for service exchange in Bhutan.
        </Tab.Panel>
        <Tab.Panel className="p-4">At Service.bt, our vision is to become Bhutan's leading platform for connecting local clients with trusted service providers, fostering a thriving ecosystem where businesses grow, and communities flourish. We aim to bridge the gap between people in need of quality services and skilled professionals, ensuring access to reliable, affordable, and timely solutions for all.

By empowering local talent and enhancing customer experiences, we strive to revolutionize the service industry in Bhutan, creating a seamless and sustainable network that drives economic growth and enriches lives. </Tab.Panel>
        <Tab.Panel className="p-4">We are a team of professionals dedicated to providing quality services to our client </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default TabSection;

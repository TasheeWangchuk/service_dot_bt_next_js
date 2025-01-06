const Footer: React.FC = () => {
    return (
      <footer className="fixed-bottom bg-gray-800 text-white p-6 mt-10">
        <div className="flex justify-between">
          <p>&copy; 2024 Service.BT. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
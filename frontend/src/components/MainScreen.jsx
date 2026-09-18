import { useNavigate } from 'react-router-dom';

const MainScreen = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ backgroundColor: '#79D7BE' }} className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-white drop-shadow-md">AarogyaID Claims</h1>
      
      <button
        style={{ backgroundColor: "#F6F4F0" }}
        className="mb-4 p-3 w-64 rounded-lg transition-transform transform hover:scale-105 font-semibold text-gray-800 shadow-md"
        onClick={() => { navigate('/patients/login') }}
      >
        Login as Patient
      </button>
      
      <button
        style={{ backgroundColor: "#F6F4F0" }}
        className="p-3 w-64 rounded-lg transition-transform transform hover:scale-105 font-semibold text-gray-800 shadow-md"
        onClick={() => { navigate('/insurers/login') }}
      >
        Login as Insurer
      </button>
    </div>
  );
};

export default MainScreen;
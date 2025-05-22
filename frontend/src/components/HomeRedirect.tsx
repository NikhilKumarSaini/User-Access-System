import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeRedirect = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role === 'Admin') {
      navigate('/create-software');
    } else if (role === 'Manager') {
      navigate('/pending-requests');
    } else if (role === 'Employee') {
      navigate('/request-access');
    } else {
      navigate('/login');
    }
  }, [navigate, role]);

  return null;
};

export default HomeRedirect;
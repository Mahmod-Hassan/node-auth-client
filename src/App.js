
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout';
import DashboardPage from './pages/Dashboard';
import HomePage from './pages/Home';
import LoginForm from './pages/Login';
import RegisterForm from './pages/Register';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
        <Routes>
            <Route path='/' element={<Layout />} >
                 <Route path='/' element={<HomePage />} />
                 <Route path='/login' element={<LoginForm />} />
                 <Route path='/register' element={<RegisterForm />} />
                 <Route path='/dashboard' element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
            </Route>
            
        </Routes>
    </div>
  );
}

export default App;

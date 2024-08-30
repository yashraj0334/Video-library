import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { VideoLibraryHome } from './components/video-library-home';
import { AdminLogin } from './components/admin-login';
import { AdminDashBoard } from './components/admin-dashboard';
import { AddVideo } from './components/admin-add-videos';
import { EditVideo } from './components/admin-edit-video';
import { useCookies } from 'react-cookie';
import { Signout } from './components/admin-signout';
import { UserRegister } from './components/user-register';
import { UserDashboard } from './components/user-dashboard';
import { UserLogin } from './components/user-login';
import { UserError } from './components/user-error';


function App() {

  const[cookies,setCookie,removeCookie] = useCookies('admin-id');

  return (
    <div className="">
      <BrowserRouter>
        <header className='bg-dark text-white p-3 d-flex justify-content-between align-items-center'>
          <span className='h3'><Link to='/' className=' text-decoration-none text-white'>Video Library</Link></span>
          <div>
            <Link className='btn btn-secondary bi bi-person me-2' to='/user-login'>User Login</Link>
            {
              (cookies['admin-id']===undefined)? <Link to='/admin-login' className='btn btn-primary bi bi-person'> Admin Login</Link> : <Signout /> 
            }
          </div>
        </header>
        <section>
          <Routes>
            <Route path='/' element={<VideoLibraryHome />}></Route>
            <Route path='admin-login' element={<AdminLogin />}></Route>
            <Route path='admin-dashboard' element={<AdminDashBoard />}></Route>
            <Route path='add-video' element={<AddVideo />}></Route>
            <Route path='edit-video/:id' element={<EditVideo />}></Route>
            <Route path='user-register' element={<UserRegister />}></Route>
            <Route path='video-library-home' element={<VideoLibraryHome />}></Route>
            <Route path='video-dashboard' element={<UserDashboard />}></Route>
            <Route path='user-login' element={<UserLogin />}></Route>
            <Route path='user-error' element={<UserError />}></Route>
            <Route path='user-login' element={<UserLogin />}></Route>
            <Route path='user-dashboard' element={<UserDashboard />}></Route>
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;

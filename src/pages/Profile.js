import 'flowbite';
import useAuth from '../hooks/useAuth';
import profile from '../Images/profile.jpg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EditProfile from '../components/EditProfile';

export default function Profile() {
  const [open, setOpen] = useState(false);
  const { authenticatedUser, logout } = useAuth();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(authenticatedUser);
  }, [authenticatedUser]);

  const bd = authenticatedUser.birthDate
    ? String(authenticatedUser.birthDate)
    : '';
  const newDate = bd.slice(0, 10) || '-';

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* nav left */}

      <div className="flex">
        <EditProfile
          open={open}
          setOpen={setOpen}
          toggleDrawer={toggleDrawer}
        />
        <div className="flex-col bg-white h-screen w-1/5 ">
          <div className="flex items-center justify-around pt-3 pb-2 px-5 shadow">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : authenticatedUser.profilePicture || profile
              }
              className="h-16 w-16 rounded-full border-2 text-gray-600"
            />
            <h2 className="text-m text-gray-600 font-bold">
              {authenticatedUser.firstName || authenticatedUser.email}{' '}
              {authenticatedUser.lastName || ''}
            </h2>
          </div>
          <a
            href="#"
            className="flex items-center justify-center py-5 shadow-sm hover:bg-gray-100"
          >
            <i className="fa-solid fa-user text-m pr-2 text-gray-600" />
            <h2 className="text-m text-gray-600">Profile</h2>
          </a>
          <Link
            to="/bidask"
            className="flex items-center justify-center py-5 shadow-sm hover:bg-gray-100"
          >
            <i className="fa-solid fa-tag text-m pr-2 text-gray-600" />
            <h2 className="text-m text-gray-600">Bid/Ask status</h2>
          </Link>

          <Link
            to="/history"
            href="#"
            className="flex items-center justify-center py-5 shadow-sm hover:bg-gray-100"
          >
            <i className="fa-solid fa-clock-rotate-left text-m pr-2 text-gray-600"></i>
            <h2 className="text-m text-gray-600">History</h2>
          </Link>
          <a
            href="#"
            className="flex items-center justify-center py-5 hover:bg-gray-100"
          >
            <i className="fa-solid fa-right-from-bracket text-m pr-2 text-gray-600"></i>
            <h2 className="text-m text-gray-600" onClick={handleLogout}>
              Logout
            </h2>
          </a>
        </div>
        {/* profile right */}
        <div className="flex bg-gray-100 h-screen w-4/5 justify-center">
          <div className="flex-col w-5/6 h-3/4 bg-white m-10 px-10 py-5">
            <div className="flex justify-end items-end">
              <button
                className="flex justify-end items-end"
                onClick={toggleDrawer}
              >
                <p className="text-md pr-1 text-gray-600">Edit</p>
                <i className="fa-solid fa-pen-to-square text-xl text-gray-600" />
              </button>
            </div>
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : authenticatedUser.profilePicture || profile
              }
              className="h-40 w-40 rounded-full border-2"
            />
            <div className="flex">
              <div className="mt-8 mx-5 space-y-3 text-md font-bold w-1/5 text-gray-600">
                <p>First Name</p>
                <p>Last Name</p>
                <p>Birthday</p>
                <p>Email Address</p>
                <p>Mobile</p>
                <p>Address</p>
                <p>Line Token</p>
              </div>
              <div className="mt-8 mx-5 space-y-3 text-md text-md">
                <p> {authenticatedUser.firstName || '-'}</p>
                <p>{authenticatedUser.lastName || '-'}</p>
                <p>{newDate && newDate !== 'null' ? newDate : '-'}</p>
                <p>{authenticatedUser.email || '-'}</p>
                <p>{authenticatedUser.mobilePhone || '-'}</p>
                <p>{authenticatedUser.address || '-'}</p>
                <p>{authenticatedUser.lineToken || '-'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

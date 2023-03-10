import useAuth from '../hooks/useAuth';
import useProduct from '../hooks/useProduct';
import profile from '../Images/profile.jpg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as userApi from '../apis/user-api';

export default function History() {
  const { authenticatedUser, logout } = useAuth();
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserHistory = async () => {
      const res = await userApi.userHistory();
      setContent(res.data.history);
    };
    fetchUserHistory();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* nav left */}
      <div className="flex">
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
            <h2 className="text-m text-gray-600 font-bold ">
              {authenticatedUser.firstName || authenticatedUser.email}{' '}
              {authenticatedUser.lastName || ''}
            </h2>
          </div>
          <Link
            to="/profile"
            className="flex items-center justify-center py-5 shadow-sm hover:bg-gray-100"
          >
            <i className="fa-solid fa-user text-m pr-2 text-gray-600" />
            <h2 className="text-m text-gray-600">Profile</h2>
          </Link>
          <Link
            to="/bidask"
            className="flex items-center justify-center py-5 shadow-sm hover:bg-gray-100"
          >
            <i className="fa-solid fa-tag text-m pr-2 text-gray-600" />
            <h2 className="text-m text-gray-600">Bid/Ask status</h2>
          </Link>

          <a
            href="#"
            className="flex items-center justify-center py-5 shadow-sm hover:bg-gray-100"
          >
            <i className="fa-solid fa-clock-rotate-left text-m pr-2 text-gray-600"></i>
            <h2 className="text-m text-gray-600">History</h2>
          </a>
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
        <div className="flex bg-gray-100 w-4/5 justify-center">
          <div className="flex-col w-5/6 bg-white m-10 px-20 py-5">
            <div className="flex justify-center pb-1 border-b">
              <p className="text-md pr-1 text-gray-600 ">History</p>
            </div>
            {content && Object.keys(content).length > 0 && (
              <div>
                {content.Orders.map((order, index) => (
                  <div
                    key={index}
                    className="flex border-2 mt-5 justify-between"
                  >
                    <div className="flex justify-between w-2/3">
                      <div className="my-5 mx-5 space-y-2 text-sm font-bold w-1/5 text-gray-600 ">
                        <p>Product :</p>
                        <p>Size :</p>
                        <p>Equipment :</p>
                        <p>Price :</p>
                        <p>Type :</p>
                        <p>Order status :</p>
                        <p>Date :</p>
                      </div>
                      <div className="my-5 mx-5 space-y-2 w-4/5 text-sm text-gray-600">
                        <p>{order && order.Product.title}</p>
                        <p>{order && order.Size.size_product}</p>
                        <p>
                          {order &&
                            (order.Bid.equipment
                              ? 'Packaging'
                              : 'None packaging')}
                        </p>
                        <p>{order && order.Bid.price} THB</p>
                        <p>
                          {order &&
                            (order.Bid.type === 'BUYER' ? 'Buyer' : 'Seller')}
                        </p>
                        <p>{order && order.OrderStatuses[0].status}</p>
                        <p>
                          {order &&
                            order.OrderStatuses[0].createdAt.slice(0, 10)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center px-2">
                      <img
                        src={
                          file
                            ? URL.createObjectURL(file)
                            : (order && order.Product.product_image) || profile
                        }
                        className="h-40 w-40 bg-gray-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

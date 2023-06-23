import React, { useEffect, useState } from 'react';
import { list } from '../data/Data';
import { Link } from 'react-router-dom';
import { getLocalItem } from '../../constants';
import Card from '../card/Card';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    getAllProperties();

    getAllMessages();
  }, []);

  const getUserId = () => {
    const localUser = getLocalItem('user');
    const user = JSON.parse(localUser);
    // console.log('User Id', user._id);
    return user._id;
  };
  // /userproperty/:id

  const getAllProperties = async () => {
    fetch(`http://localhost:5000/userproperty/${getUserId()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.success == true) {
          setProperties(data.data);
        }
        // localStorage.setItem("user", JSON.stringify(data.user));
        // localStorage.setItem("login", true);
        // props.setIsLogin(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getAllMessages = async () => {
    fetch(`http://localhost:5000/getMessages/${getUserId()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success == true) {
          // console.log(data.data);
          setMessages(data.data);
        }
        // localStorage.setItem("user", JSON.stringify(data.user));
        // localStorage.setItem("login", true);
        // props.setIsLogin(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div>
      <div className="flex flex-col  items-center justify-center  py-12  ">
        <Link to="/createadd">
          <button className="bg-green-500 text-slate-800 font-semibold py-2 px-4 rounded m-10">
            Add Property
          </button>
        </Link>

        <div className="content ">
          <h1 className="text-center text-5xl font-semibold mb-24">Messages</h1>
         <div className="par grid grid-cols-2 gap-10 px-20"> {messages.length > 0 &&
            messages.map((val, index) => {
              const { name, email, phone, message } = val;
              return (
                <div className="max-w-full  p-5  flex rounded  overflow-hidden shadow-lg ">
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Name: {name}</div>

                    <p className="text-gray-700 text-base"> <span className='font-semibold'>Email:</span> {email}</p>
                    <p className="text-gray-700 text-base mt-4"><span className='font-semibold'>Phone:</span> {phone}</p>
                    <p className="text-gray-700 text-base mt-4"><span className='font-semibold'>Message:</span> {message}</p>
                  </div>
                </div>
              );
            })}</div>
        </div>
        <div className="content mt-32">
          <h1 className="text-center  text-5xl font-semibold">YOUR ADDS</h1>
          {properties.length > 0 &&
            properties.map((val, index) => {
              
              return (
               <Card data={val}/>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

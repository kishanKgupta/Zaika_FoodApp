import React from "react";

const HeaderBody = () => {
  return (
    <>
      <div className="sm:h-96 h-56 relative ">
        <img
          className="object-cover w-full h-full z-0"
          src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="food image"
        />
        <h1 className="absolute inset-0 flex items-center justify-center  text-white font-bold text-2xl sm:text-6xl bg-slate-800 bg-opacity-50">
          Welcome to EatXpress
        </h1>
      </div>
    </>
  );
};

export default HeaderBody;

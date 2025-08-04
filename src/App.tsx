import React from 'react';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className='bg-white grid place-content-center h-screen'>
      <Outlet />
    </div>
  );
}

export default App;

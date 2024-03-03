import React from 'react';
import {IoCloseSharp} from 'react-icons/io5';

export default function HeadModel({title,children,id}) {
  const handleClose = ()=>{
    history.go(-1);
    window.location.hash = '';
  };
  return (
    <div
      aria-modal
      id={id}
      role="dialog"
      className='overlay head_model'
    >
      <div className="bg-white rounded-lg p-0 shadow-md">
        <div className="flex flex-row justify-between items-center m-5">
          <div className="text-2xl"> {title} </div>
          <button className="close-btn" onClick={handleClose}>
            <IoCloseSharp size={30} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}


import React, { useState, useRef, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import anim_css from './BottomNav.css'

export function links(){
  return [
    {
      rel:'stylesheet',
      href:anim_css 
    }
  ]
}

const BottomMenu = ({ children, isOpen = false,id='menu'}) => {
  const handleClose = ()=>{
    history.go(-1);
    window.location.hash = '';
  };

  return (
    <div  aria-modal 
          className='overlay rounted-md'
          role="dialog" id={id}
    >
           
      <div 
      className='w-full'
        style={{position:'absolute',bottom:'0',zIndex:5}}
      >
        <div className='flex flex-row items-center justify-center'>
            <button onClick={handleClose} style={{background:'white',padding:'3px'}} className='rounded-full m-3'><IoClose /></button>
        </div>
        {children}
       </div>
    </div>
  );
};

export default BottomMenu;

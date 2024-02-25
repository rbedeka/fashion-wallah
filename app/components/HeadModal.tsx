import React from 'react';
import {IoCloseSharp} from 'react-icons/io5';

type HeadProps = {
  title: string;
  isVisible: boolean;
  handleCancel: () => void;
  children: React.ReactNode;
};

export default function HeadModel({
  title,
  isVisible,
  handleCancel,
  children,
}: HeadProps) {
  const handleOk = () => {};

  return (
    <div
      className={`${isVisible ? 'visible' : 'invisible'}`}
      style={popupPosition}
    >
      <div className="bg-white rounded-lg p-8 shadow-md">
        <div className="flex flex-row justify-between items-center">
          <div className="text-bold text-3xl"> {title} </div>
          <button className="close-btn" onClick={handleCancel}>
            <IoCloseSharp size={30} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const popupPosition: React.CSSProperties = {
  position: 'absolute',
  top: '0',
  right: '0',
  margin: '20px',
};

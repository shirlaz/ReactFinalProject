import React, { FC } from 'react';
import './my-spinner.scss';

interface MySpinnerProps { }

const MySpinner: FC<MySpinnerProps> = () => {
  return (
    <div className="spinner-container">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default MySpinner;

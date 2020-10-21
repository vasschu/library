/* eslint-disable react/prop-types */
import React from 'react';

const BorrowButton = ({borrowed}) => {
    const borrowButton = borrowed ? (
        // we can add onClick borrow button after auth -> we need userid
      <button className="borrow-available-btn">Borrow</button>
        ) : (
          <button className="borrow-unavailable-btn">Borrowed</button>            
    )

    return (
      <>
        {borrowButton}
      </>
    )
};

export default BorrowButton;

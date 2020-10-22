/* eslint-disable react/prop-types */
import React from 'react';

const BorrowButton = ({borrowed, borrowBook, borrowUser, logedUser, returnBook}) => {
    // const borrowButton = borrowed ? (
    //     // we can add onClick borrow button after auth -> we need userid
    //   <button className="borrow-unavailable-btn">Borrowed</button>            
    //     ) : (
    //       <button className="borrow-available-btn" onClick={borrowBook}>Borrow</button>
    // )

    const borrow = () => {
      if (borrowed && borrowUser === logedUser) {
        return <button className="borrow-return-btn" onClick={returnBook}>Return</button>
      } else if (borrowed) {
        return <button className="borrow-unavailable-btn">Borrowed</button> 
      } else {
        return <button className="borrow-available-btn" onClick={borrowBook}>Borrow</button>
      }
    }

    return (
      <>
        {borrow()}
      </>
    )
};

export default BorrowButton;

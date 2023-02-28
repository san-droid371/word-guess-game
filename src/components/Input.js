import React from 'react';

function Input({ word, corrects}) {
  return (
    <>
      {
        word.split("").map((char, i) => (
          <input type="text" value={corrects.includes(char) ? char.toUpperCase() : ""} key={i} disabled />
        ))
      }
    </>
  )
}

export default Input;
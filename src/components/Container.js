import React from 'react';
import Content from './Content';


function Container() {
    return (
        <div className='container'>
            <div className="header">
                <div className="lights">
                    <span className='light' id='red'></span>
                    <span className='light yellow'></span>
                    <span className='light' id='green'></span>
                </div>
                <div className="header-text">
                    <p>wordstorm.app</p>
                </div>
            </div>
            <Content/>
        </div>
    )
}

export default Container; 

{/*}
import React, { useState, useEffect } from "react";
import wordList from "./words";
import "../App.css";

function Container() {
  const [word, setWord] = useState("");
  const [maxGuesses, setMaxGuesses] = useState(5);
  const [corrects, setCorrects] = useState([]);
  const [incorrects, setIncorrects] = useState([]);
  const [hint, setHint] = useState("");

  const randomWord = () => {
    let ranSet = wordList[Math.floor(Math.random() * wordList.length)];
    setWord(ranSet.word.toUpperCase());
    setHint(ranSet.hint);
    setMaxGuesses(5);
    setCorrects([]);
    setIncorrects([]);
  };

  useEffect(() => {
    randomWord();
  }, []);

  const handleInput = (e) => {
    const key = e.target.value.toUpperCase();
    if (
      key.match(/^[A-Z]+$/) &&
      !incorrects.includes(key) &&
      !corrects.includes(key)
    ) {
      if (word.includes(key)) {
        let newCorrects = [...corrects];
        for (let i = 0; i < word.length; i++) {
          if (word[i] === key) {
            newCorrects.push(key);
          }
        }
        setCorrects(newCorrects);
      } else {
        setMaxGuesses(maxGuesses - 1);
        let newIncorrects = [...incorrects];
        newIncorrects.push(key);
        setIncorrects(newIncorrects);
      }
    }
    e.target.value = "";
  };

  useEffect(() => {
    if (corrects.length === word.length) {
      alert(`Congratulations! You've found the word ${word}`);
      randomWord();
    } else if (maxGuesses < 1) {
      alert(`Game over! The word was ${word}`);
      randomWord();
    }
  }, [corrects, maxGuesses, word]);

  return (
    <div className="App">
      <h1>Word Guessing Game</h1>
      <p>Hint: {hint}</p>
      <div className="input-container">
        {word.split("").map((char, i) => (
          <input type="text" value={corrects.includes(char) ? char : ""} key={i} disabled />
        ))}
      </div>
      <p>Guesses left: {maxGuesses}</p>
      <p>Wrong letters: {incorrects.join(" ")}</p>
      <input type="text" className="typing-input" onChange={handleInput} maxLength="1" />
      <button className="reset-btn" onClick={randomWord}>
        Reset
      </button>
    </div>
  );
}

export default Container;
*/}
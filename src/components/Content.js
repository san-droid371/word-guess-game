import React, { useState, useEffect } from 'react';
import Input from './Input';
import wordList from './words';
//to import audio buzzer sounds
import correct from "./sounds/correct.mp3"
import wrong from "./sounds/wrong.mp3";
function Content() {

    const [word, setWord] = useState("a");
    const [hint, setHint] = useState("");
    const [guess, setGuess] = useState(5);
    const [subValue, setSubValue] = useState(true);
    const [typingInput, setTypingInput] = useState("");
    const [corrects, setCorrects] = useState([]);

    //using reference to play sounds
    const corrAudioRef = React.useRef(null);
    const wrongAudioRef = React.useRef(null);

    //to set opacity
    const [opacityCorrect, setOpacityCorrect] = useState(1);
    const [opacityWrong, setOpacityWrong] = useState(0.2);
    const greenLight = document.getElementById("green");
    const redLight = document.getElementById("red");

    let styleCorrect = `opacity:${opacityCorrect};transform:scale(1.2);`
    let styleWrong = `opacity:${opacityWrong}; transform:scale(1)`;


    let randomWord = () => {
        let ranSet = wordList[Math.floor(Math.random() * wordList.length)];
        setWord(ranSet.word);
        setHint(ranSet.hint);
        setCorrects([]);
        setSubValue(true);
        setGuess(5);
        setOpacityCorrect(1);
        setOpacityWrong(0.2);
    }

    useEffect(() => {
        randomWord();
    }, []);


    //to check if the user input is a character or string
    let checkInputType = (e) => {
        let val = e.target.value;
        setTypingInput(val)
        if (val === "") {
            setSubValue(true)
        }
        if (val.match(/^[A-Za-z]+$/)) {
            console.log(val);
            setSubValue(false)
        }

    }

    //function to handle submit button
    function handleSubmit(e) {
        e.preventDefault();
        setSubValue(true)
        setTypingInput("");
        checkAnswer();
    }

    //check for the entered value if its there in word or not
    let checkAnswer = () => {

        if (typingInput.length === 1) {
            if (word.includes(typingInput)) {
                let newCorrects = [...corrects];
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === typingInput) {
                        newCorrects.push(typingInput);
                    }
                }
                setCorrects(newCorrects);
                console.log("true");
                corrAudioRef.current.play();
                greenLight.style = styleCorrect;
                redLight.style = styleWrong;

            }
            else {
                setGuess(guess - 1);
                wrongAudioRef.current.play();
                greenLight.style = styleWrong;
                redLight.style = styleCorrect;

            }
            setTimeout(() => {
                greenLight.style.transform = "scale(1)";
                redLight.style.transform = "scale(1)";
            }, 1000);
        }
        else {
            if (typingInput === word) {
                let strCorrects = typingInput.split("");

                console.log("true");
                corrAudioRef.current.play();
                setCorrects(strCorrects);
                greenLight.style = styleCorrect;
                redLight.style = styleWrong;
            }
            else {
                setGuess(guess - 1);
                wrongAudioRef.current.play();
                greenLight.style = styleWrong;
                redLight.style = styleCorrect;
            }
        }
    }
    setTimeout(() => {
        if (corrects.length === word.length) {
            alert(`Congratulations! You've found the word ${word.toUpperCase()}`);
            randomWord();
        } else if (guess < 1) {
            alert(`Game Over! The Word is ${word.toUpperCase()} `);
            randomWord();
        }
    }, 100);



    return (
        <>
            <div className="title-text">
                <h1>wordstorm.</h1>
            </div>
            <div className="inputs">
                <Input
                    word={word}
                    corrects={corrects}
                />
            </div>
            <div className='info-box'>
                <p className='hint'><strong>Hint :</strong> {hint}</p>
                <p className='guess'><strong>Remaining Chances : </strong>{guess}</p>

                <form onSubmit={handleSubmit} className='form-group'>
                    <input type="text" className="typing-input" value={typingInput} onChange={checkInputType} placeholder="Enter your answer" maxLength={word.length} />
                    <button type="submit" disabled={subValue}>
                        Submit
                    </button>
                </form>
            </div>
            <audio ref={corrAudioRef} src={correct} style={{ display: "none" }} />
            <audio ref={wrongAudioRef} src={wrong} style={{ display: "none" }} />
        </>
    )
};
export default Content;
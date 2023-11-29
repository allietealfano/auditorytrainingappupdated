import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const words = [
  { word: 'Happy', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FHappy.mp3?alt=media&token=fca0b375-84bd-4b12-9712-500db4bc63dc' },
  { word: 'Perfect', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FPerfect.mp3?alt=media&token=214876cc-72df-4464-93e9-164b02018d49' },
  { word: 'Joyful', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FJoyful.mp3?alt=media&token=ce3458b4-ecb8-43f1-a7cd-5cc9c5cc5d1d' },
  { word: 'Thirsty', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FThirsty.mp3?alt=media&token=83fe212d-edf1-4127-8a41-00a7e6720ff6' },
  { word: 'Awkward', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FAwkward.mp3?alt=media&token=f85a3c58-c551-45f3-8d7f-7bf700b14c5f' },
  { word: 'Tender', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FTender.mp3?alt=media&token=06499e8d-def1-496d-8618-7ab23d1d3d58' },
  { word: 'Heavy', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FHeavy.mp3?alt=media&token=a8225edf-b7d8-4ccc-8c98-cbf476257988' },
  { word: 'Standard', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FStandard.mp3?alt=media&token=8bd37cea-4af6-44ea-90e9-62d00f7f8b80' },
  { word: 'Thankful', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FThankful.mp3?alt=media&token=707e9fdc-3e71-43d9-9ca3-2e216e80abde' },
  { word: 'Common', sound: 'https://firebasestorage.googleapis.com/v0/b/auditorytrainingapp.appspot.com/o/audio%2FmatchingGame%2FCommon.mp3?alt=media&token=c962443f-c99d-4693-8bcc-2d221fee17ab' },
];

const CrossWord2 = () => {
  const [selectedLetters, setSelectedLetters] = useState(Array(100).fill(false));
  const [foundWords, setFoundWords] = useState([]);

  const puzzle = [
    'M', 'J', 'L', 'I', 'Z', 'P', 'D', 'J', 'B', 'C',
'V', 'R', 'D', 'T', 'F', 'D', 'G', 'X', 'J', 'Q',
'L', 'C', 'M', 'I', 'E', 'F', 'C', 'F', 'T', 'L',
'P', 'I', 'C', 'I', 'Q', 'F', 'B', 'I', 'M', 'N',
'V', 'H', 'J', 'X', 'K', 'K', 'P', 'I', 'I', 'Y',
'P', 'X', 'O', 'C', 'J', 'I', 'U', 'O', 'J', 'D',
'W', 'B', 'B', 'G', 'X', 'G', 'I', 'H', 'Z', 'B',
'V', 'R', 'M', 'F', 'Q', 'X', 'D', 'I', 'D', 'V',
'A', 'Q', 'S', 'Z', 'U', 'L', 'D', 'Y', 'N', 'A',
'D', 'G', 'M', 'T', 'R', 'F', 'U', 'G', 'I', 'D',
'M', 'Z', 'D', 'E', 'P', 'J', 'F', 'F', 'Q', 'P',
'X', 'K', 'O', 'I', 'M', 'S', 'X', 'N', 'O', 'V',
'A', 'C', 'W', 'K', 'R', 'C', 'J', 'J', 'Y', 'S',
'T', 'A', 'N', 'D', 'A', 'R', 'D', 'O', 'X', 'B',
'K', 'W', 'C', 'O', 'Y', 'Q', 'B', 'X', 'L', 'J',
'I', 'C', 'M', 'R', 'O', 'O', 'X', 'R', 'L', 'S',
'W', 'G', 'K', 'L', 'L', 'X', 'O', 'M', 'J', 'Y',
'S', 'X', 'D', 'Z', 'H', 'G', 'A', 'Y', 'N', 'L',
'P', 'X', 'V', 'W', 'K', 'X', 'F', 'R', 'O', 'K',
'R', 'L', 'Q', 'L', 'E', 'Q', 'A', 'O', 'E', 'F',
'K', 'I', 'T', 'K', 'A', 'T', 'H', 'I', 'R', 'S',
'T', 'Y', 'Q', 'V', 'A', 'G', 'E', 'G', 'F', 'Z',
'Y', 'M', 'E', 'Z', 'V', 'R', 'A', 'U', 'S', 'Q',
'X', 'I', 'T', 'E', 'V', 'J', 'A', 'U', 'Z', 'J',
'Q', 'W', 'N', 'D', 'M', 'M', 'D', 'C', 'R', 'I',
'W', 'O', 'H', 'E', 'Y', 'O', 'N', 'B', 'O', 'Y',
'V', 'F', 'D', 'E', 'E', 'T', 'U', 'U', 'Y', 'M',
'V', 'I', 'A', 'V', 'U', 'Y', 'F', 'R', 'P', 'O',
'F', 'R', 'E', 'U', 'Q', 'D', 'Z', 'C', 'M', 'S',
'K', 'M', 'N', 'I', 'T', 'F', 'A', 'H', 'A', 'G',
'H', 'F', 'R', 'S', 'G', 'P', 'E', 'R', 'F', 'E',
'C', 'T', 'K', 'V', 'C', 'U', 'C', 'J', 'H', 'P',
'P', 'V', 'X', 'B', 'T', 'F', 'F', 'K', 'O', 'Q',
'H', 'L', 'F', 'N', 'M', 'L', 'G', 'Z', 'A', 'H',
'H', 'E', 'Z', 'Z', 'T', 'U', 'O', 'Q', 'O', 'M',
'G', 'A', 'U', 'U', 'J', 'D', 'Z', 'V', 'P', 'Q',
'W', 'Y', 'L', 'K', 'A', 'U', 'G', 'G', 'A', 'O',
'O', 'Z', 'L', 'V', 'W', 'X', 'P', 'Y', 'P', 'F',
'F', 'Q', 'N', 'E', 'Z', 'K', 'V', 'N', 'A', 'A',
'B', 'E', 'C', 'L', 'O', 'H', 'Y', 'I', 'Y', 'Y',

  ];

  useEffect(() => {
    const found = words
  .filter((word) => typeof word === 'string')
  .filter((word) =>
    word.split('').every((letter) => selectedLetters[puzzle.indexOf(letter)] === true)
  );

      
  }, []); // Empty dependency array to run only once on mount  

  const handleCellClick = (index) => {
    setSelectedLetters((prevSelected) => {
      const newSelected = [...prevSelected];
      newSelected[index] = !newSelected[index];
      return newSelected;
    });
  };

  const playSound = (sound) => {
    // Implement sound playback logic here
    const audio = new Audio(sound);
    audio.play();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '18px' }}>
      <Link to="/dashboard" style={{ position: 'absolute', top: '5px', left: '5px', textDecoration: 'none', color: 'gray', fontSize: '30px' }}>
        X
      </Link>
      <div style={{ width: '100px', margin: '10px', textAlign: 'left' }}>
        <strong style={{ fontSize: '30px' }}>Words:</strong>
        <p>Press below to play the words</p>
        {words.map((word, index) => (
          <button
            key={index}
            style={{
              margin: '5px',
              fontSize: '1px',
              height: '50px',
              width: '50px'
              // textDecoration: foundWords.includes(word.word) ? 'line-through' : 'none',
            }}
            onClick={() => playSound(word.sound)}
          >
            {/* <img
                class = "img"
                src={require("../../assets/icons/PlayButton.png")}
                height= '10px'
                width='10px'
                    
            /> */}
            {/* {word.word} */}
          </button>
        ))}
      </div>
      <div style={{ width: '1000px', margin: '10px auto' }}>
        <h1>Word Search: Level 2</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: '2px' }}>
          {puzzle.map((letter, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ddd',
                padding: '10px',
                textAlign: 'center',
                background: selectedLetters[index] ? '#aaf' : '#fff',
                cursor: 'pointer',
                textDecoration: foundWords.some((word) => word.includes(letter)) ? 'line-through' : 'none',
                fontSize: '12px',
              }}
              onClick={() => handleCellClick(index)}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrossWord2;


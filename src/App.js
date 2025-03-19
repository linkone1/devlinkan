import React, { useState } from 'react';
import './App.css';
import beforeChange from './images/BeforeChange.png';
import afterChange from './images/AfterChange.png';
import profilePic from './images/hello.jpg';
import webAssemblyReqOne from './images/requestsOne.png';
import webAssemblyResOne from './images/responseOne.png';
import webAssemblyEncodeOne from './images/base64-picture.png';
import { FaGithub, FaDiscord } from 'react-icons/fa';

const sampleWriteups = [
  {
    id: 1,
    title: "PicoCTF: 'Power Cookie'",
    platform: "PicoCTF",
    difficulty: "Medium (WEB)",
    summary: "Not much of a description but there is hints in the name (Cookie)",
    thumbnail: "/images/power-cookie-thumb.png",
    sections: [
      {
        title: "Reconnaissance",
        steps: [
          {
            content:
              "How did I get the flag you may wonder? Well here is the step by step guide how I did it. Starting with reconnaissance... I looked through the site a little bit and then 'continued as guest' when I did that I looked in the firefox 'developer tools'. The reason i actually opened the DEV tools was because of the title. But if this would to be a real-world scenario you should always look at the cookies because thats where session, user information stores there is already some vulnerable cookies like the 'JWT'- Json Web Token that are vulnerable and exploitable but that comes another time.",
            image: beforeChange,
          },
          {
            content: "Changed the cookie value:",
            image: afterChange,
          },
          {
            content: "Now just refresh the page and you should see the flag.",
          },
        ],
      },
      {
        title: "Exploitation",
        steps: [
          {
            content: "For you lazy people who do not want to use Web Developer Tools here (Don't forget to add the port number):",
            code: `# Its really simple its just one command:
curl -b "isAdmin=1" http://saturn.picoctf.net:<your_port>/check.php
# Now if you look at the http response you will see the flag between the <body> tags`,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "PicoCTF: 'Some Assembly Required 1'",
    platform: "PicoCTF",
    difficulty: "Medium (WEB)",
    summary: "Well there is not so much described right here.",
    thumbnail: "/images/power-cookie-thumb.png",
    sections: [
      {
        title: "Reconnaissance",
        steps: [
          {
            content:
              "Firstly started with researching what WASM was (Web Assembly) thought it would be alot harder so i started with understanding how that worked (did not understand) then i worked my way back to the website and found decided to look in the console (wich you should always start with). I found some GET requests there.",
            image: webAssemblyReqOne,
          },
          {
            content: "I thought this looked quite weird and clicked in on the GET request and then response where i found an really long line ",
            image: webAssemblyResOne,
          },
          {
            content: "Well i looked into this and decided this was weird so i copied the whole parameter and then pasted it and i saw an '=' in the end. Wich i supposed was base64 encoded, I copied the line after the last '/'",
            image: webAssemblyEncodeOne,
          },
          {
            content: "So i just send an echo command like this:"
          },
        ],
      },
      {
        title: "Command:",
        steps: [
          {
            code: `echo "IQcgBiAHcyEIQQEhCSAIIAlxIQogCg8LPwEFfyOAgICAACECQRAhAyACIANrIQQgBCAANgIMIAQgATYCCCAEKAIMIQUgBCgCCCEGIAYgBToAsIiAgAAPCwsyAQBBgAgLK3BpY29DVEZ7YThiYWUxMGY0ZDk1NDQxMTAyMjJjMmQ2MzlkYzZkZTZ9AAA=
" | base64 --decode`,
          },
        ],
      },
    ],
  },
];

function App() {
  const [writeups, setWriteups] = useState(sampleWriteups);
  const [selectedWriteup, setSelectedWriteup] = useState(null);
  const [showAboutMe, setShowAboutMe] = useState(false);

  const handleCardClick = (writeup) => {
    setSelectedWriteup(writeup);
    setShowAboutMe(false);
  };

  const closeWriteup = () => {
    setSelectedWriteup(null);
  };

  const openAboutMe = () => {
    setShowAboutMe(true);
    setSelectedWriteup(null);
  };

  const closeAboutMe = () => {
    setShowAboutMe(false);
  };

  const renderTerminalLines = () => {
    const lines = [];
    for (let i = 0; i < 15; i++) {
      lines.push(
        <div key={`line-${i}`} className="terminal-line">
          <span className="terminal-prompt">$</span>
          <span className="terminal-command"></span>
        </div>
      );
    }
    return lines;
  };

  return (
    <div className="App">
      <div className="terminal-decoration left">
        <div className="terminal-header">
          <div className="terminal-button red"></div>
          <div className="terminal-button yellow"></div>
          <div className="terminal-button green"></div>
        </div>
        <div className="terminal-body">{renderTerminalLines()}</div>
      </div>

      <div className="main-content">
        <div className="typewriter">
          <h1>
            Linkan<span id="name-333">333</span> : Write-Ups
          </h1>
        </div>

        <button className="about-me-button" onClick={openAboutMe}>
          About Me
        </button>

        {showAboutMe ? (
          <div className="about-me-popup">
            <button className="back-button" onClick={closeAboutMe}>
              ← Back
            </button>
            <h1>About Me</h1>
            <div className="about-me-content">
              <img src={profilePic} alt="Profile" className="profile-pic" />
              <p>
                Hello, I am <span className="underStrokeBold">Linkan333</span>. I love to code and challenge myself like doing ctf just for the fun and the curios part. Well I have done it a quite while but first now thought about creating an write-up page since I thought about <span className="italic">"For you to learn you have to learn others first. - Probably Abraham Lincoln or somebody"</span>
              </p>
              <div className="social-links">
                <a href="https://github.com/linkone1" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="social-icon" /> GitHub
                </a>
                <a href="https://discord.com/users/683080741340708866" target="_blank" rel="noopener noreferrer">
                  <FaDiscord className="social-icon" /> Discord
                </a>
              </div>
            </div>
          </div>
        ) : !selectedWriteup ? (
          <div className="card-grid">
            {/* Divider and cards for PicoCTF */}
            <div className="ctf-divider">
              <h2 className="divider-title">PicoCTF</h2>
            </div>
            <div className="card-row">
              {writeups
                .filter((writeup) => writeup.platform === "PicoCTF")
                .map((writeup) => (
                  <div key={writeup.id} className="card" onClick={() => handleCardClick(writeup)}>
                    {writeup.thumbnail && (
                      <img src={writeup.thumbnail} alt={`${writeup.title} thumbnail`} className="card-thumbnail" />
                    )}
                    <h2>{writeup.title}</h2>
                    <div className="card-badges">
                      <span className="badge platform">{writeup.platform}</span>
                      <span className="badge difficulty">{writeup.difficulty}</span>
                    </div>
                    <p>{writeup.summary}</p>
                    <div className="card-footer">
                      <span className="read-more">Click to read full write-up</span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Divider and cards for Säkerhetssm */}
            <div className="ctf-divider">
              <h2 className="divider-title">Säkerhetssm</h2>
            </div>
            <div className="card-row">
              {writeups
                .filter((writeup) => writeup.platform === "Säkerhetssm")
                .map((writeup) => (
                  <div key={writeup.id} className="card" onClick={() => handleCardClick(writeup)}>
                    {writeup.thumbnail && (
                      <img src={writeup.thumbnail} alt={`${writeup.title} thumbnail`} className="card-thumbnail" />
                    )}
                    <h2>{writeup.title}</h2>
                    <div className="card-badges">
                      <span className="badge platform">{writeup.platform}</span>
                      <span className="badge difficulty">{writeup.difficulty}</span>
                    </div>
                    <p>{writeup.summary}</p>
                    <div className="card-footer">
                      <span className="read-more">Click to read full write-up</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="writeup-full">
            <button className="back-button" onClick={closeWriteup}>← Back to write-ups</button>
            <h1>{selectedWriteup.title}</h1>
            <div className="writeup-meta">
              <span className="badge platform">{selectedWriteup.platform}</span>
              <span className="badge difficulty">{selectedWriteup.difficulty}</span>
            </div>

            <div className="writeup-content">
              {selectedWriteup.sections.map((section, index) => (
                <div
                  key={index}
                  className={`writeup-section ${section.title === "Reconnaissance" ? "smaller-section" : "centered-section"}`}
                >
                  <h2 className="section-title">{section.title}</h2>
                  <div className="section-content">
                    {section.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="step">
                        {step.content && <p>{step.content}</p>}
                        {step.image && (
                          <img
                            src={step.image}
                            alt={`${section.title} step ${stepIndex + 1}`}
                            className={`section-image ${
                              section.title === "Reconnaissance" ? "smaller-image" : ""
                            }`}
                          />
                        )}
                        {step.code && (
                          <div className="code-block">
                            <h3>Code</h3>
                            <pre><code>{step.code}</code></pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="terminal-decoration right">
        <div className="terminal-header">
          <div className="terminal-button red"></div>
          <div className="terminal-button yellow"></div>
          <div className="terminal-button green"></div>
        </div>
        <div className="terminal-body">
          <div className="matrix-animation"></div>
        </div>
      </div>

      <div className="cyber-elements">
        <div className="cyber-circle"></div>
        <div className="cyber-square"></div>
        <div className="cyber-triangle"></div>
      </div>
    </div>
  );
}

export default App;
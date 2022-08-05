import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import copy from "../assets/icons/copy.png";


const numbers = "0123456789";
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYX";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const symbols = "!@#$%^&*_+=:~:;,?";

const PasswordGen = () => {
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(20);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const handleGeneratePassword = (e) => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols
    ) {
      notify("You must Select atleast one option", true);
    }
    let characterSum = "";

    if (includeLowercase) {
      characterSum = characterSum + lowerCase;
    }

    if (includeUppercase) {
      characterSum = characterSum + upperCase;
    }

    if (includeNumbers) {
      characterSum = characterSum + numbers;
    }

    if (includeSymbols) {
      characterSum = characterSum + symbols;
    }

    setPassword(createPassword(characterSum));
  };
  const createPassword = (characterSum) => {
    let password = "";
    const characterSumLength = characterSum.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterSumLength);
      password = password + characterSum.charAt(characterIndex);
    }
    return password;
  };

  const copyToClipboard = () => {
    const newTextArea = document.createElement("textarea");
    newTextArea.innerText = password;
    document.body.appendChild(newTextArea);
    newTextArea.select();
    document.execCommand("copy");
    newTextArea.remove();
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCopyPassword = (e) => {
    if (password === "") {
      notify("Nothing To Copy", true);
    } else {
      copyToClipboard();
      notify("copied");
    }
  };

  return (
    <div className="password-gen">
      <p style={{textAlign:"center",}}>Generate Your Password here.</p>
      <div className="copy-board">
        <div className="result">{password}</div>
        <button className="copy" onClick={handleCopyPassword}>
          <img style={{ width: "20px" }} alt='copy button' src={copy} />
        </button>
      </div>

      <div className="password-length">
        <p style={{ fontSize: "20px" }}> Password length</p>
        <input
          defaultValue={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
          type="number"
          max="20"
          min="8"
        />
      </div>
      <div className="pass-select">
        <div>
          Add Uppercase
          <input
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
            type="checkbox"
            id="checkbox"
          />
        </div>

        <div>
          Add Lowercase
          <input
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
            type="checkbox"
            id="checkbox"
          />
        </div>

        <div>
          Add Numbers
          <input
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
            type="checkbox"
            id="checkbox"
          />
        </div>

        <div>
          Add Symbols
          <input
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
            type="checkbox"
            id="checkbox"
          />
        </div>
      </div>

      <button className="generate-button" onClick={handleGeneratePassword}>
        Generate
      </button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default PasswordGen;

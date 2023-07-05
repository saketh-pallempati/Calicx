import { useState } from "react";
import Button from 'react-bootstrap/Button';

import './Footer.css'
export default function FooterButton() {
    const [isOpen, setIsOpen] = useState(false);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="demo-container">
            <div className="d-grid gap-2">
                <Button className="btn--about" onClick={handleButtonClick} variant="primary">
                    {isOpen ? "Close" : "About"}
                </Button>
            </div>

            <div className={`grid-collapse__wrapper ${isOpen ? "is-open" : ""}`}>
                <div className="grid-collapse__inner">
                    <h5 style={{ padding: 15, paddingBottom: 0 }}>
                        The source code of the project is hosted on GitHub
                        <a href="https://github.com/saketh-pallempati" style={{ display: "block" }}>
                            Click here!
                        </a>{" "}
                        <p style={{ fontSize: 14, fontStyle: "italic" }}>(PS: Dark mode, anyone?)</p>
                    </h5>
                    <p style={{ padding: 15, margin: 0 }}>
                        {" "}
                        A machine learning model is used to solve CAPTCHAs and automate
                        the login process {" => "}
                        <a href="https://github.com/Marxalpha/Captcha_Solver">
                            Github LInk 
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

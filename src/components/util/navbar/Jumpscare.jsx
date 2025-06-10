import { useRef } from "react";

const jumpscareSound = new Audio('/sounds/jumpscare.mp3');
let clickCount = 0;
let flashCount = 0;

const showJumpscare = (bypass) => {

    if (bypass) {
        const jumpscareImg = document.createElement('img');
        jumpscareImg.src = '/jumpscare.jpg';
        jumpscareImg.style.position = 'fixed';
        jumpscareImg.style.top = '50%';
        jumpscareImg.style.left = '50%';
        jumpscareImg.style.transform = 'translate(-50%, -50%)';
        jumpscareImg.style.width = '100vw';
        jumpscareImg.style.height = '100vh';
        jumpscareImg.style.zIndex = '9999';
        jumpscareImg.style.pointerEvents = 'none';

        const flashInterval = setInterval(() => {
            if (flashCount < 5) {
                document.body.appendChild(jumpscareImg);
                setTimeout(() => {
                    jumpscareImg.remove();
                }, 250);
                flashCount++;
            } else {
                clearInterval(flashInterval);
            }
        }, 400);

        return;
    } else {

        clickCount++;

        if (clickCount === 3 || clickCount === 5 || clickCount === 9) {
            jumpscareSound.play();
            const jumpscareImg = document.createElement('img');
            jumpscareImg.src = '/jumpscare.jpg';
            jumpscareImg.style.position = 'fixed';
            jumpscareImg.style.top = '50%';
            jumpscareImg.style.left = '50%';
            jumpscareImg.style.transform = 'translate(-50%, -50%)';
            jumpscareImg.style.width = '100vw';
            jumpscareImg.style.height = '100vh';
            jumpscareImg.style.zIndex = '9999';
            jumpscareImg.style.pointerEvents = 'none';

            document.body.appendChild(jumpscareImg);

            setTimeout(() => {
                jumpscareImg.remove();
            }, 250);

        } else if (clickCount < 3) {
            return <h1 style={{ color: "black" }}>Click another tab and then 'home' tab again...</h1>
        } else {
            return <h1 className="default-message"><a>--- WELCOME ---</a>Click on any tab (left side) to discover its secrets.</h1>;
        }
    }
};

export default showJumpscare;
function Navbar() {

    function jumpscare() {
        /* onClick="jumpscare(bait to click 5 times => do it)" */
    }

    return (
        <div style={{ position: "fixed", width: "200px", height: "100vh", backgroundColor: "black", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
            <h3 style={{ margin: "50px", textAlign: "center" }}>LOGO</h3>
            <h3 style={{ color: "rgba(0, 100, 0, 1)", margin: "0 0 0 10px", fontFamily: "Pixelify Sans, sans-serif" }} onClick={jumpscare()}>Home</h3>
            <h3 style={{ color: "rgba(0, 100, 0, 1)", margin: "0 0 0 10px", fontFamily: "Pixelify Sans, sans-serif" }}>Music</h3>
            <h3 style={{ color: "rgba(0, 100, 0, 1)", margin: "0 0 0 10px", fontFamily: "Pixelify Sans, sans-serif" }}>Help</h3>
            <h3 style={{ color: "rgba(0, 100, 0, 1)", margin: "0 0 0 10px", fontFamily: "Pixelify Sans, sans-serif" }}>Debug</h3>
            <h3 style={{ color: "rgba(0, 100, 0, 1)", margin: "0 0 0 10px", fontFamily: "Pixelify Sans, sans-serif" }}>Feedback</h3>
            <h3 style={{ color: "rgba(0, 100, 0, 1)", margin: 0, textAlign: "center", fontSize: "10px", fontFamily: "Pixelify Sans, sans-serif" }}>
                Copyright 1999-2025 by <a href="https://github.com/KevinEJean" target="_blank">THE ONE AND ONLY</a>. All Rights Reserved.
                {` ${document.title}`} is Powered by my Massive Intelectual Prowess.
            </h3>
        </div>
    )
}

export default Navbar;
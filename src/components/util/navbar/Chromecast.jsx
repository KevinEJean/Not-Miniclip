import { useEffect, useState } from "react";

const ChromecastConnection = () => {
    const [state, setState] = useState("Initializing connection to Chromecast...");
    const [isConnected, setIsConnected] = useState(false);
    const [currentSession, setCurrentSession] = useState(null);

    useEffect(() => {
        const initializeCastApi = () => {
            const sessionRequest = new chrome.cast.SessionRequest("EE47A3A2");
            const apiConfig = new chrome.cast.ApiConfig(
                sessionRequest,
                session => {
                    console.log("Session reconnected:", session);   
                    setCurrentSession(session);
                    setState("Reconnected to an existing session.");
                    setIsConnected(true);
                },
                error => {
                    console.error("Error in API configuration:", error);
                    setState("Ready to start a new session.");
                }
            );

            chrome.cast.initialize(
                apiConfig,
                () => setState("Chromecast API initialized. Ready to cast!"),
                error => {
                    console.error("Error initializing Chromecast:", error);
                    setState("Failed to initialize Chromecast API.");
                }
            );
        };

        const checkCastApiAvailability = () => {
            if (window.chrome && chrome.cast && chrome.cast.isAvailable) {
                initializeCastApi();
            } else {
                setTimeout(checkCastApiAvailability, 1000);
            }
        };

        checkCastApiAvailability();
    }, []);

    const startCasting = () => {
        if (!isConnected) {
            chrome.cast.requestSession(
                session => {
                    console.log("Session started:", session);
                    setCurrentSession(session);
                    setState("Casting started!");
                    setIsConnected(true);
                    if (!session.media || session.media.length === 0) {
                        loadMedia(session);
                    } else {
                        console.log("Media is already playing on Chromecast.");
                    }
                },
                error => {
                    console.error("Error starting session:", error);
                    setState("Failed to start casting.");
                }
            );
        } else {
            setState("Already connected!");
        }
    };

    const loadMedia = (session) => {
        const url = 'http://jeu23.eu-2.ca';
        const mediaInfo = new chrome.cast.media.MediaInfo(url, "text/html");

        mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
        mediaInfo.metadata.title = "Casting this tab";
        mediaInfo.metadata.subtitle = "Casting the current webpage";

        const request = new chrome.cast.media.LoadRequest(mediaInfo);

        session.loadMedia(
            request,
            media => {
                console.log("Media loaded successfully:", media);
                setState("The current tab is now playing on Chromecast.");
            },
            error => {
                console.error("Error loading media:", error);
                setState("Failed to load the current tab on Chromecast.");
            }
        );
    };

    const disconnectCasting = () => {
        if (isConnected && currentSession) {
            currentSession.stop(() => {
                console.log("Casting stopped.");
                setState("Disconnected from Chromecast.");
                setIsConnected(false);
                setCurrentSession(null);
            }, error => {
                console.error("Error stopping session:", error);
                setState("Failed to disconnect.");
            });
        }
    };

    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 style={{ color: "black" }}>{state}</h1>
            <button onClick={startCasting} style={{ padding: "10px", fontSize: "20px" }}>
                Start Casting
            </button>
            <button
                onClick={disconnectCasting}
                style={{
                    display: isConnected ? "block" : "none",
                    padding: "10px",
                    fontSize: "20px",
                    marginTop: "10px"
                }}
            >
                Disconnect
            </button>
        </div>
    );
};

export default ChromecastConnection;

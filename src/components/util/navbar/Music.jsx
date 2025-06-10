import ReactPlayer from 'react-player';
import { createContext, useState, useContext, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaPlus, FaMinus, FaSync } from 'react-icons/fa';

// Contexte pour MusicPlayer
const MusicPlayerContext = createContext();
export const useMusicPlayer = () => useContext(MusicPlayerContext); // facon d'exporter les donnes

// Logique de la gestion de la musique
export const MusicPlayerProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loop, setLoop] = useState(false);
    const [volume, setVolume] = useState(0.25);

    const togglePlay = () => setIsPlaying(!isPlaying);

    useEffect(() => {
        async function fetchPlaylist() {
            try {
                const res = await fetch('http://localhost:8000/playlist');
                if (!res.ok) throw new Error('Failed to fetch music files');
                const files = await res.json();
                setPlaylist(files);
            } catch (error) {
                console.error(error);
            }
        }
        fetchPlaylist();
    }, []);

    const playNextSong = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);

    };

    const playPrevSong = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    }

    const loopSong = () => {
        setLoop(s => !s);
    }

    const addSong = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:8000/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const { filePath } = await response.json();
                console.log(`File uploaded successfully: ${filePath}`);
                setPlaylist((prevPlaylist) => [...prevPlaylist, filePath]);
            } else {
                return "Failed to upload file.";
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            return "An error occurred during upload.";
        }
    }

    const removeSong = async () => {
        try {
            var filename = currentSong.split('/').pop();
            const res = await fetch(`http://localhost:8000/deleteSong?filename=${filename}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                throw new Error('Failed to delete song');
            }

            setPlaylist((prev) => prev.filter((song) => !song.endsWith(filename)));

            if (currentIndex >= playlist.length - 1) {
                setCurrentIndex(0);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const currentSong = playlist[currentIndex];

    return (
        <MusicPlayerContext.Provider
            value={{
                isPlaying,
                togglePlay,
                currentSong,
                playNextSong,
                playPrevSong,
                playlist,
                addSong,
                removeSong,
                loopSong,
                loop,
                setPlaylist,
                volume,
                setVolume
            }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};




export const MusicUI = () => {

    const {
        togglePlay,
        currentSong,
        isPlaying,
        playNextSong,
        playlist,
        playPrevSong,
        addSong,
        removeSong,
        loopSong,
        loop,
        volume,
        setVolume
    } = useMusicPlayer();
    const [state, setState] = useState("Music Player");
    const triggerInputClick = () => {
        document.getElementById("inputBtn").click();
    }

    const addSongHandler = async (event) => {
        const file = event.target.files[0];
        if (!file || file.type !== "audio/mpeg") {
            console.log(`Selected file: ${file.name}`);
            console.log("Please select a valid .mp3 file .");
        } else {
            console.log(`Uploading file: ${file.name}`);
            console.log(addSong(file));
        }
    }

    const changeVolume = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        console.log("Volume set to: ", newVolume);
    };

    return (
        <div className="music-container">
            <h1 className='music-header'>{state}</h1>
            <div className="music-player-ui">
                <h2 className="current-song">Now Playing: <b className="text-red">{currentSong ? currentSong.split('/').pop() : "No song selected"}</b></h2>
                <div className="music-button-grid">
                    <button onClick={playPrevSong}>
                        <FaStepBackward size={24} />
                    </button>
                    <button onClick={togglePlay}>
                        {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                    </button>
                    <button onClick={playNextSong}>
                        <FaStepForward size={24} />
                    </button>
                    <button onClick={triggerInputClick}>
                        <FaPlus size={24} />
                        <input id="inputBtn" type="file" accept=".mp3" onChange={addSongHandler} />
                    </button>
                    <button onClick={loopSong} className={loop ? "pressed" : ""}>
                        <FaSync size={24} />
                    </button>
                    <button onClick={removeSong}>
                        <FaMinus size={24} />
                    </button>
                    <div className="volume">
                        <input
                            id="volume-slider"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={changeVolume}
                        />
                    </div>
                    <div className="playlist">
                        {playlist.map((song, index) => (
                            <div key={index}>
                                {song.split('/').pop()}
                                <hr />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const MusicPlayer = (bypass) => {
    const { isPlaying, currentSong, playNextSong, loop, volume, setVolume, setPlaylist } = useMusicPlayer();
    // if (bypass) {
    //     console.log('music unavailable :', currentSong)
    //     // setPlaylist(['/music/song1.mp3'])
    //     return (
    //         <div style={{ display: 'none' }}>
    //             <ReactPlayer
    //                 url='/music/song1.mp3'
    //                 playing={true}
    //                 controls
    //                 loop={true}
    //                 width="100%"
    //                 height="50px"
    //             />
    //         </div>
    //     )
    // } else {

    return (
        <div style={{ display: 'none' }}>
            <ReactPlayer
                url={currentSong}
                playing={isPlaying}
                controls
                loop={loop}
                width="100%"
                height="50px"
                onEnded={playNextSong}
                volume={volume}
            />
        </div>
    );
    // }
};

export default MusicPlayer;
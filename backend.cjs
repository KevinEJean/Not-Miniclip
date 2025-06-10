const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 8000;
app.use(cors({ origin: "http://localhost:5173" }));

// POST les fichiers dans la bd (public/music/db)
const storage = multer.diskStorage({
    destination: path.join(__dirname, "public/music"),
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext === ".mp3") {
            cb(null, true);
        } else {
            cb(new Error("File must be .mp3!"), false);
        }
    },
});

app.use(express.static("public"));

// Upload les fichiers
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    // retourne ce qui va etre logger dans eg.: setPlaylist(["/music/song1.mp3"])
    const filePath = `/music/${req.file.originalname}`;
    res.json({ filePath });
});

// GET la liste de musique dans public/music
app.get('/playlist', (req, res) => {
    const musicDir = path.join(__dirname, 'public', 'music');

    fs.readdir(musicDir, (err, files) => {
        if (err) return res.status(500).send('Error reading music directory');
        const mp3Files = files.filter(file => file.endsWith('.mp3'));

        const fileUrls = mp3Files.map(f => `/music/${f}`);
        res.json(fileUrls);
    });
});

// DELETE supprime une chanson choisie
app.delete('/deleteSong', (req, res) => {
    const filename = req.query.filename;
    if (!filename) {
        return res.status(400).send("Filename query parameter is required");
    }

    // Sanitize filename to avoid path traversal attacks
    if (filename.includes("..") || filename.includes("/")) {
        return res.status(400).send("Invalid filename");
    }

    const filePath = path.join(__dirname, "public", "music", filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Failed to delete file");
        }
        res.send("File deleted successfully");
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

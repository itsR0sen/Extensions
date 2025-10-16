const dropArea = document.getElementById("drop-area");
const fileElem = document.getElementById("fileElem");
const preview = document.getElementById("preview");
const imageContainer = document.getElementById("image-container");
const textContainer = document.getElementById("text-container");
const newImageBtn = document.getElementById("newImageBtn");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");
const darkModeToggle = document.getElementById("darkModeToggle");
const lockToggle = document.getElementById("lockToggle");

const API_KEY = "helloworld"; // Free OCR.space key
let isLocked = false;

// --- Apply saved preferences on load ---
document.addEventListener("DOMContentLoaded", () => {
    if (chrome?.storage?.local) {
        chrome.storage.local.get(["darkMode", "isLocked"], (result) => {
            if (result.darkMode) applyDarkMode();
            if (result.isLocked) applyLock(true);
        });
    }
});

// --- Clipboard paste support ---
document.addEventListener("paste", async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
                handleImage(file);
                e.preventDefault();
                break;
            }
        }
    }
});

// --- Drop area click opens file selector ---
dropArea.addEventListener("click", () => fileElem.click());

// --- Drag & drop ---
dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragover");
});
dropArea.addEventListener("dragleave", () =>
    dropArea.classList.remove("dragover")
);
dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    if (file) handleImage(file);
});

// --- File selection ---
fileElem.addEventListener("change", () => {
    const file = fileElem.files[0];
    if (file) handleImage(file);
});

// --- Handle image ---
async function handleImage(file) {
    if (!file.type.startsWith("image/"))
        return alert("Please upload an image!");

    dropArea.classList.add("d-none");
    imageContainer.classList.remove("d-none");
    preview.src = URL.createObjectURL(file);
    textContainer.classList.remove("d-none");
    output.textContent = "Processing...";

    try {
        const resizedBase64 = (await resizeImage(file)).split(",")[1];

        const response = await fetch("https://api.ocr.space/parse/image", {
            method: "POST",
            headers: {
                apikey: API_KEY,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                base64Image: "data:" + file.type + ";base64," + resizedBase64,
                language: "eng",
                isOverlayRequired: "false",
            }),
        });

        const data = await response.json();
        const text = data.ParsedResults[0].ParsedText;
        output.textContent = text || "No text found!";
    } catch (err) {
        output.textContent = "Error: " + err.message;
    }
}

// --- Resize image ---
function resizeImage(file, maxWidth = 1200, maxHeight = 1200) {
    return new Promise((resolve) => {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
            img.onload = () => {
                let { width, height } = img;
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(
                        maxWidth / width,
                        maxHeight / height
                    );
                    width *= ratio;
                    height *= ratio;
                }
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d").drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL(file.type));
            };
        };
        reader.readAsDataURL(file);
    });
}

// --- Copy text ---
copyBtn.addEventListener("click", () => {
    navigator.clipboard
        .writeText(output.textContent)
        .then(() => alert("Text copied to clipboard!"))
        .catch(() => alert("Failed to copy text."));
});

// --- Dark mode toggle ---
darkModeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    updateDarkModeIcon(isDark);
    if (chrome?.storage?.local) chrome.storage.local.set({ darkMode: isDark });
});
function applyDarkMode() {
    document.body.classList.add("dark-mode");
    updateDarkModeIcon(true);
}
function updateDarkModeIcon(isDark) {
    const icon = darkModeToggle.querySelector("i");
    icon.classList.toggle("bi-moon-fill", !isDark);
    icon.classList.toggle("bi-sun-fill", isDark);
}

// --- Lock toggle ---
lockToggle.addEventListener("click", () => {
    isLocked = !isLocked;
    applyLock(isLocked);
    if (chrome?.storage?.local) chrome.storage.local.set({ isLocked });
});
function applyLock(lockState) {
    isLocked = lockState;
    const icon = lockToggle.querySelector("i");
    icon.classList.toggle("bi-lock-fill", isLocked);
    icon.classList.toggle("bi-unlock-fill", !isLocked);
    // Optional: alert user
    // alert(isLocked ? "Popup locked!" : "Popup unlocked!");
}

// --- New Image button ---
newImageBtn.addEventListener("click", () => {
    imageContainer.classList.add("d-none");
    textContainer.classList.add("d-none");
    preview.src = "";
    fileElem.value = "";
    dropArea.classList.remove("d-none");
});

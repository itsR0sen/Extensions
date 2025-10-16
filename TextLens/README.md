# TextLens – Magnify Text from Images

TextLens is a **lightweight and professional Chrome extension** that lets you **extract text from images and screenshots** quickly and easily. Designed for productivity, it combines a clean interface with fast OCR (Optical Character Recognition) technology so you can turn images into editable text in seconds.

---

## **Key Features**

-   **Drag & Drop / Click / Paste**
    Add images in multiple ways: drag and drop into the popup, click the drop area to select a file, or press `Ctrl+V` to paste a screenshot from your clipboard.

-   **Fast Text Extraction (OCR)**
    Converts images into text using the OCR.space API. Large images are automatically resized for faster processing without losing accuracy.

-   **Image Preview & “New Image” Button**
    Shows a preview of the uploaded image and allows you to start a new conversion without leaving the popup.

-   **Dark Mode with Persistence**
    Switch between light and dark themes with a single click. The extension remembers your preference each time you open it.

-   **Lock/Unlock Popup**
    Keep the popup open while working so you can add images or paste screenshots without it closing unexpectedly.

-   **Copy Text to Clipboard**
    One-click copy for all extracted text. Useful for quickly transferring text into documents, emails, or notes.

-   **Professional & Modern UI**
    Built with **Bootstrap 5** and **Bootstrap Icons**, the interface is clean, responsive, and easy to use.

---

## **How It Works**

1. Click the **TextLens** icon in the Chrome toolbar to open the popup.
2. Add an image by dragging it in, selecting it with a click, or pasting it from the clipboard.
3. The image is automatically resized if necessary and sent to the **OCR.space API** for text extraction.
4. Extracted text appears in the popup, with an option to copy it to the clipboard.
5. Use the **New Image** button to reset the popup and process another image.
6. Optionally, toggle **Dark Mode** for night-friendly use or lock the popup to keep it open while working.

---

## **Technical Overview**

-   **Frontend:**
    Built using HTML, CSS, and JavaScript. Styling and layout are handled with **Bootstrap 5**, and icons use **Bootstrap Icons**.

-   **Image Handling:**

    -   Drag & drop, click selection, and clipboard paste are all supported.
    -   Images are resized on the client side for faster OCR processing.

-   **OCR Integration:**

    -   Uses the **OCR.space API** to extract text from images.
    -   Supports multiple languages (English by default) and handles large screenshots efficiently.

-   **State Management:**

    -   Saves **dark mode** and **popup lock state** using `chrome.storage.local` to remember user preferences between sessions.

---

## **Installation**

1. Download or clone this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the project folder.
5. Pin the TextLens extension for easy access.

---

## **Usage Tips**

-   For best results, use **high-quality screenshots or images** with clear text.
-   You can **paste a screenshot immediately** after taking it (Ctrl+V) without saving the file.
-   Lock the popup when working with multiple images to prevent accidental closure.
-   Dark mode is ideal for late-night usage or low-light environments.

---

## **Dependencies**

-   [**Bootstrap 5**](https://getbootstrap.com/) – for responsive UI
-   [**Bootstrap Icons**](https://icons.getbootstrap.com/) – for modern icons
-   [**OCR.space API**](https://ocr.space/ocrapi) – for converting images to text

---

## **License**

MIT License – free for personal and commercial use.

---

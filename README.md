# 🌐 LingoBridge AI – Language Translation Tool

An AI-powered, modern language translation web application developed as part of the **CodeAlpha Artificial Intelligence Internship (Task 1)**. Built entirely with **Semantic HTML5, Vanilla CSS3, Vanilla JavaScript, Real Translation APIs, and the Web Speech API**.

---

## 📌 Project Overview

**LingoBridge AI** is designed to break language barriers across global boundaries with an intuitive interface. Users can seamlessly type or paste text in any supported language, select a target language, translate using neural translation endpoints, copy results in one click, and listen to authentic pronunciation using native browser speech synthesis.

### 🌟 Key Highlights
- **Zero Frontend Frameworks**: Pure Vanilla JavaScript with zero npm/external dependencies.
- **Client-Side & Secure**: Safe execution without hardcoded credentials.
- **Real Neural Translation API**: Live translation engine supporting 12+ international languages.
- **Text-to-Speech (TTS)**: Built-in voice articulation via the Web Speech API.
- **Modern AI SaaS Design**: Clean light mode, glassmorphism cards, micro-interactions, responsive typography, and mobile-friendly layouts.

---

## ✨ Features

- 🌍 **12+ Global Languages Supported**: Translate between English, Hindi, Marathi, Spanish, French, German, Italian, Portuguese, Japanese, Korean, Chinese, and Arabic.
- ⚡ **Real-time Neural Translation**: Fast API integration with instant feedback and loading states.
- ⇄ **One-Click Language Swap**: Quickly reverse source and target languages along with their text contents.
- 🔊 **Web Speech API Audio Output**: Listen to both source text and translated results with accurate regional accents.
- 📋 **One-Click Copy to Clipboard**: Instant copying with toast feedback.
- 📋 **Paste from Clipboard**: Easy paste button for rapid workflow.
- 🔢 **Live Character Counter**: Real-time counter with length boundary indicators (up to 5,000 characters).
- ⚠️ **Comprehensive Error Handling**: Validates empty inputs, identical language pairs, network drops, and rate limits with user-friendly alerts.
- 📱 **Fully Responsive Layout**: Optimized for Desktop (1200px+), Laptop, Tablet, and Mobile screens.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<select>`, `<textarea>`) for accessibility and SEO.
- **CSS3**: Vanilla CSS with custom properties (CSS variables), Flexbox, CSS Grid, Glassmorphism, and responsive media queries.
- **JavaScript (ES6+)**: Pure Vanilla JS with `async/await`, `Fetch API`, DOM manipulation, and event handling.
- **Translation API**: Real machine translation engine via public neural translation endpoints (MyMemory Translated API).
- **Web Speech API (`SpeechSynthesis`)**: Native browser speech engine for real-time text-to-speech voice playback.

---

## 🚀 How It Works

```
┌─────────────────┐       ┌──────────────────────┐       ┌──────────────────┐
│  01. Enter Text │  ──>  │ 02. Select Languages │  ──>  │  03. Translate   │
│  Type or paste  │       │ Pick source & target │       │ View, listen, or │
│  input text     │       │ or use ⇄ Swap button │       │ copy the result  │
└─────────────────┘       └──────────────────────┘       └──────────────────┘
```

1. **Enter Text**: Input any sentence or paragraph in the source text area.
2. **Select Languages**: Select your source and target languages from the dropdowns or click the quick chips.
3. **Translate**: Click **Translate Now** or press `Ctrl + Enter` (`Cmd + Enter`).
4. **Interact**: Listen to the pronunciation with **Listen (🔊)** or copy the text with **Copy (📋)**.

---

## 🌐 Supported Languages

| Flag | Language | Native Name | Code | TTS Support |
| :---: | :--- | :--- | :---: | :---: |
| 🇬🇧 | English | English | `en` | ✅ `en-US` |
| 🇮🇳 | Hindi | हिन्दी | `hi` | ✅ `hi-IN` |
| 🇮🇳 | Marathi | मराठी | `mr` | ✅ `mr-IN` |
| 🇪🇸 | Spanish | Español | `es` | ✅ `es-ES` |
| 🇫🇷 | French | Français | `fr` | ✅ `fr-FR` |
| 🇩🇪 | German | Deutsch | `de` | ✅ `de-DE` |
| 🇮🇹 | Italian | Italiano | `it` | ✅ `it-IT` |
| 🇵🇹 | Portuguese | Português | `pt` | ✅ `pt-BR` |
| 🇯🇵 | Japanese | 日本語 | `ja` | ✅ `ja-JP` |
| 🇰🇷 | Korean | 한국어 | `ko` | ✅ `ko-KR` |
| 🇨🇳 | Chinese | 中文 | `zh` | ✅ `zh-CN` |
| 🇦🇪 | Arabic | العربية | `ar` | ✅ `ar-SA` |

---

## 📁 Project Structure

```
CodeAlpha_LingoBridgeAI/
├── index.html       # Semantic HTML5 markup, layout, and accessibility tags
├── style.css        # Modern CSS3 design system, responsive styling, and animations
├── script.js        # Vanilla JS logic, API integration, TTS, and event listeners
└── README.md        # Comprehensive documentation and setup instructions
```

---

## 🔐 API Configuration & Security

### Translation API Architecture
This application utilizes the free public tier of the **MyMemory Translation API**, a high-accuracy neural machine translation system:
```javascript
const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
```

### Security Best Practices
> ⚠️ **Important Security Note**: Client-side JavaScript code is publicly inspectable in browser developer tools. 
> 
> - **Never hardcode private API keys or secret tokens** inside `script.js` or HTML files before committing to GitHub.
> - For production environments requiring paid or high-volume tiers (e.g., DeepL Pro, Google Cloud Translation, Microsoft Azure Translator), implement a lightweight backend server or serverless proxy (Node.js/Cloudflare Workers) where secrets remain securely stored in environment variables (`.env`).
> - The current implementation uses public endpoints that require **no client secrets**, making it safe for immediate deployment and public GitHub sharing.

---

## 💻 How to Run Locally

### Option 1: Direct Browser Open (Easiest)
1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/CodeAlpha_LingoBridgeAI.git
   ```
2. Navigate into the project folder:
   ```bash
   cd CodeAlpha_LingoBridgeAI
   ```
3. Double-click `index.html` or open it with any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari, Brave).

### Option 2: Live Server (VS Code Extension)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension by Ritwick Dey.
3. Right-click `index.html` and select **"Open with Live Server"**.
4. The application will launch at `http://127.0.0.1:5500`.

---

## 📸 Screenshots

### 1. Hero & Translation Workspace
> *Placeholder for Desktop Workspace Screenshot*
> 
> ![LingoBridge AI Desktop](https://via.placeholder.com/900x500/4f46e5/ffffff?text=LingoBridge+AI+-+Desktop+Interface)

### 2. Live Translation & Text-to-Speech
> *Placeholder for Live Translation & Voice Playback Screenshot*
> 
> ![Translation & Audio](https://via.placeholder.com/900x500/7c3aed/ffffff?text=LingoBridge+AI+-+Translation+Result)

### 3. Mobile Responsive View
> *Placeholder for Mobile Responsive View Screenshot*
> 
> ![Mobile View](https://via.placeholder.com/400x700/0f172a/ffffff?text=LingoBridge+AI+-+Mobile+View)

---

## 🔮 Future Improvements

- [ ] **Voice Speech-to-Text Input**: Dictate source text directly using the Web Speech Recognition API.
- [ ] **Translation History**: Save recent translations to browser `localStorage` for offline review.
- [ ] **Extended Language Matrix**: Expand to 50+ languages and regional dialects.
- [ ] **Offline Translation Mode**: Integrate lightweight WebAssembly/ONNX models for offline translation.
- [ ] **User Accounts & Synced Favorites**: Cloud sync for starred phrases and vocabulary lists.
- [ ] **Mobile Application**: Wrap as a Progressive Web App (PWA) or native Android/iOS app.

---

## 🎓 CodeAlpha Internship Details

- **Organization**: [CodeAlpha](https://codealpha.tech/)
- **Domain**: Artificial Intelligence Internship
- **Task**: Task 1 — Language Translation Tool (LingoBridge AI)
- **Author**: Internship Candidate
- **License**: MIT License

---

*Made with ❤️ for the CodeAlpha Artificial Intelligence Internship.*

/**
 * ==============================================================================
 * LingoBridge AI – Language Translation Tool
 * CodeAlpha Artificial Intelligence Internship - Task 1
 * Vanilla JavaScript Implementation
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------------------------
    // DOM Element References
    // --------------------------------------------------------------------------
    const sourceLangSelect = document.getElementById('sourceLang');
    const targetLangSelect = document.getElementById('targetLang');
    const swapBtn = document.getElementById('swapBtn');
    
    const sourceText = document.getElementById('sourceText');
    const resultText = document.getElementById('resultText');
    const resultPlaceholder = document.getElementById('resultPlaceholder');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    const translateBtn = document.getElementById('translateBtn');
    const btnSpinner = document.getElementById('btnSpinner');
    
    const sourceLangDisplay = document.getElementById('sourceLangDisplay');
    const targetLangDisplay = document.getElementById('targetLangDisplay');
    
    const charCount = document.getElementById('charCount');
    const clearSourceBtn = document.getElementById('clearSourceBtn');
    const clearResultBtn = document.getElementById('clearResultBtn');
    const pasteBtn = document.getElementById('pasteBtn');
    
    const copyResultBtn = document.getElementById('copyResultBtn');
    const speakResultBtn = document.getElementById('speakResultBtn');
    const speakSourceBtn = document.getElementById('speakSourceBtn');
    const speechIndicator = document.getElementById('speechIndicator');
    
    const errorBanner = document.getElementById('errorBanner');
    const errorMessage = document.getElementById('errorMessage');
    const closeErrorBtn = document.getElementById('closeErrorBtn');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const quickChips = document.querySelectorAll('.quick-chip');
    const langCards = document.querySelectorAll('.lang-card');

    // --------------------------------------------------------------------------
    // Language Metadata & BCP 47 Speech Tags
    // --------------------------------------------------------------------------
    const LANGUAGE_NAMES = {
        en: 'English',
        hi: 'Hindi',
        mr: 'Marathi',
        es: 'Spanish',
        fr: 'French',
        de: 'German',
        it: 'Italian',
        pt: 'Portuguese',
        ja: 'Japanese',
        ko: 'Korean',
        zh: 'Chinese',
        ar: 'Arabic'
    };

    const SPEECH_LANG_MAP = {
        en: 'en-US',
        hi: 'hi-IN',
        mr: 'mr-IN',
        es: 'es-ES',
        fr: 'fr-FR',
        de: 'de-DE',
        it: 'it-IT',
        pt: 'pt-BR',
        ja: 'ja-JP',
        ko: 'ko-KR',
        zh: 'zh-CN',
        ar: 'ar-SA'
    };

    // --------------------------------------------------------------------------
    // State Variables
    // --------------------------------------------------------------------------
    let isTranslating = false;
    let toastTimeout = null;

    // --------------------------------------------------------------------------
    // Utility Functions
    // --------------------------------------------------------------------------
    
    /**
     * Decode HTML entities returned by translation APIs
     */
    function decodeHtmlEntities(str) {
        if (!str) return '';
        const txt = document.createElement('textarea');
        txt.innerHTML = str;
        return txt.value;
    }

    /**
     * Show modern toast message
     */
    function showToast(message) {
        if (!toast || !toastMessage) return;
        toastMessage.textContent = message;
        toast.classList.add('show');

        if (toastTimeout) clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    /**
     * Display friendly error message in alert banner
     */
    function showError(message) {
        if (!errorBanner || !errorMessage) return;
        errorMessage.textContent = message;
        errorBanner.classList.remove('hidden');
        errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Hide error message banner
     */
    function hideError() {
        if (errorBanner) {
            errorBanner.classList.add('hidden');
        }
    }

    /**
     * Update character counter display
     */
    function updateCharacterCount() {
        if (!sourceText || !charCount) return;
        const currentLength = sourceText.value.length;
        charCount.textContent = currentLength.toLocaleString();
    }

    /**
     * Update visual language name labels above the panels
     */
    function updateLanguageLabels() {
        const sourceVal = sourceLangSelect.value;
        const targetVal = targetLangSelect.value;
        
        if (sourceLangDisplay) {
            sourceLangDisplay.textContent = LANGUAGE_NAMES[sourceVal] || sourceVal.toUpperCase();
        }
        if (targetLangDisplay) {
            targetLangDisplay.textContent = LANGUAGE_NAMES[targetVal] || targetVal.toUpperCase();
        }

        // Highlight active quick chip
        quickChips.forEach(chip => {
            if (chip.getAttribute('data-lang') === targetVal) {
                chip.classList.add('active-chip');
            } else {
                chip.classList.remove('active-chip');
            }
        });
    }

    /**
     * Toggle translation loading states
     */
    function showLoading(isLoading) {
        isTranslating = isLoading;
        if (isLoading) {
            if (loadingOverlay) loadingOverlay.classList.remove('hidden');
            if (btnSpinner) btnSpinner.classList.remove('hidden');
            if (translateBtn) translateBtn.setAttribute('disabled', 'true');
        } else {
            if (loadingOverlay) loadingOverlay.classList.add('hidden');
            if (btnSpinner) btnSpinner.classList.add('hidden');
            if (translateBtn) translateBtn.removeAttribute('disabled');
        }
    }

    // --------------------------------------------------------------------------
    // Core Translation Functionality
    // --------------------------------------------------------------------------

    /**
     * Main translation function calling real neural translation API
     */
    async function translateText() {
        hideError();

        const text = sourceText.value.trim();
        const sourceLang = sourceLangSelect.value;
        const targetLang = targetLangSelect.value;

        // Validation 1: Empty input
        if (!text) {
            showError('Please enter some text to translate.');
            sourceText.focus();
            return;
        }

        // Validation 2: Same language pair
        if (sourceLang === targetLang) {
            showError('Source and target languages are identical. Please select a different target language.');
            return;
        }

        showLoading(true);

        try {
            // MyMemory Translation API endpoint (Public, No-Key-Required Free Tier)
            // Format: https://api.mymemory.translated.net/get?q=TEXT&langpair=SRC|TGT
            const langPair = `${sourceLang}|${targetLang}`;
            const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;

            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`API server responded with status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.responseData && data.responseData.translatedText) {
                // Check if MyMemory returned a quota limit error string
                const rawResult = data.responseData.translatedText;
                
                if (data.responseStatus === 403 || rawResult.includes('MYMEMORY WARNING:')) {
                    throw new Error('Translation rate limit reached for the free public pool. Please try a shorter text or try again shortly.');
                }

                const cleanedResult = decodeHtmlEntities(rawResult);

                // Render result
                if (resultPlaceholder) resultPlaceholder.classList.add('hidden');
                if (resultText) {
                    resultText.classList.remove('hidden');
                    resultText.value = cleanedResult;
                }
                
                showToast('Translation completed successfully!');
            } else if (data && data.responseDetails) {
                throw new Error(data.responseDetails);
            } else {
                throw new Error('Could not parse translated response from API.');
            }
        } catch (error) {
            console.error('Translation error:', error);
            showError(`Translation failed: ${error.message || 'Please check your internet connection and try again.'}`);
        } finally {
            showLoading(false);
        }
    }

    /**
     * Swap source and target languages & text
     */
    function swapLanguages() {
        hideError();

        const currentSource = sourceLangSelect.value;
        const currentTarget = targetLangSelect.value;

        sourceLangSelect.value = currentTarget;
        targetLangSelect.value = currentSource;

        // Also swap text if a result exists
        const currentSourceText = sourceText.value;
        const currentResultText = resultText.value;

        if (currentResultText && !resultText.classList.contains('hidden')) {
            sourceText.value = currentResultText;
            resultText.value = currentSourceText;
            updateCharacterCount();
        }

        updateLanguageLabels();
        showToast(`Languages swapped to ${LANGUAGE_NAMES[currentTarget]} → ${LANGUAGE_NAMES[currentSource]}`);
    }

    /**
     * Copy translated text to user's clipboard
     */
    async function copyTranslation() {
        const textToCopy = resultText.value;

        if (!textToCopy || resultText.classList.contains('hidden')) {
            showError('No translated text available to copy.');
            return;
        }

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
            } else {
                // Fallback for older browsers
                resultText.select();
                document.execCommand('copy');
            }
            showToast('📋 Translated text copied to clipboard!');
        } catch (err) {
            console.error('Copy failed:', err);
            showError('Failed to copy to clipboard. Please copy manually.');
        }
    }

    /**
     * Speak text using Web Speech API (SpeechSynthesis)
     */
    function speakText(text, langCode) {
        if (!('speechSynthesis' in window)) {
            showError('Text-to-Speech is not supported by your browser.');
            return;
        }

        if (!text || text.trim() === '') {
            showError('No text to speak.');
            return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const bcp47Lang = SPEECH_LANG_MAP[langCode] || 'en-US';
        utterance.lang = bcp47Lang;
        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        // Try to match appropriate voice if available
        const voices = window.speechSynthesis.getVoices();
        const matchingVoice = voices.find(v => v.lang === bcp47Lang || v.lang.startsWith(langCode));
        if (matchingVoice) {
            utterance.voice = matchingVoice;
        }

        // Animation handling
        if (speechIndicator) speechIndicator.style.display = 'flex';

        utterance.onend = () => {
            if (speechIndicator) speechIndicator.style.display = 'none';
        };

        utterance.onerror = (e) => {
            console.warn('SpeechSynthesis error:', e);
            if (speechIndicator) speechIndicator.style.display = 'none';
        };

        window.speechSynthesis.speak(utterance);
    }

    /**
     * Speak translated result
     */
    function speakTranslation() {
        const text = resultText.value;
        if (!text || resultText.classList.contains('hidden')) {
            showError('No translation result to listen to.');
            return;
        }
        speakText(text, targetLangSelect.value);
    }

    /**
     * Clear all input and result fields
     */
    function clearTranslator() {
        sourceText.value = '';
        resultText.value = '';
        if (resultText) resultText.classList.add('hidden');
        if (resultPlaceholder) resultPlaceholder.classList.remove('hidden');
        if (speechIndicator) speechIndicator.style.display = 'none';
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        updateCharacterCount();
        hideError();
        showToast('Translator cleared.');
    }

    /**
     * Clear only source text
     */
    function clearSource() {
        sourceText.value = '';
        updateCharacterCount();
        sourceText.focus();
    }

    /**
     * Clear only translation result
     */
    function clearResult() {
        resultText.value = '';
        if (resultText) resultText.classList.add('hidden');
        if (resultPlaceholder) resultPlaceholder.classList.remove('hidden');
        if (speechIndicator) speechIndicator.style.display = 'none';
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }

    /**
     * Paste from clipboard into source text
     */
    async function pasteSourceText() {
        try {
            if (navigator.clipboard && navigator.clipboard.readText) {
                const text = await navigator.clipboard.readText();
                if (text) {
                    sourceText.value = text;
                    updateCharacterCount();
                    showToast('Text pasted from clipboard.');
                }
            } else {
                showError('Clipboard reading not supported. Please paste directly using Ctrl+V / Cmd+V.');
            }
        } catch (err) {
            console.error('Paste error:', err);
            showError('Unable to access clipboard. Please paste directly into the box.');
        }
    }

    // --------------------------------------------------------------------------
    // Event Listeners
    // --------------------------------------------------------------------------

    // Translate button click
    if (translateBtn) {
        translateBtn.addEventListener('click', translateText);
    }

    // Enter key to translate (Ctrl+Enter or Cmd+Enter)
    if (sourceText) {
        sourceText.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                translateText();
            }
        });
        sourceText.addEventListener('input', updateCharacterCount);
    }

    // Swap button
    if (swapBtn) {
        swapBtn.addEventListener('click', swapLanguages);
    }

    // Select changes
    if (sourceLangSelect) {
        sourceLangSelect.addEventListener('change', updateLanguageLabels);
    }
    if (targetLangSelect) {
        targetLangSelect.addEventListener('change', updateLanguageLabels);
    }

    // Clear actions
    if (clearSourceBtn) {
        clearSourceBtn.addEventListener('click', clearSource);
    }
    if (clearResultBtn) {
        clearResultBtn.addEventListener('click', clearResult);
    }

    // Paste action
    if (pasteBtn) {
        pasteBtn.addEventListener('click', pasteSourceText);
    }

    // Copy action
    if (copyResultBtn) {
        copyResultBtn.addEventListener('click', copyTranslation);
    }

    // Listen / TTS actions
    if (speakResultBtn) {
        speakResultBtn.addEventListener('click', speakTranslation);
    }
    if (speakSourceBtn) {
        speakSourceBtn.addEventListener('click', () => {
            const text = sourceText.value;
            if (!text.trim()) {
                showError('Please enter text to listen.');
                return;
            }
            speakText(text, sourceLangSelect.value);
        });
    }

    // Error dismiss
    if (closeErrorBtn) {
        closeErrorBtn.addEventListener('click', hideError);
    }

    // Quick Language Chips click
    quickChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const targetLang = chip.getAttribute('data-lang');
            if (targetLang) {
                targetLangSelect.value = targetLang;
                updateLanguageLabels();
                showToast(`Target language set to ${LANGUAGE_NAMES[targetLang]}`);
                // If text is present, translate immediately
                if (sourceText.value.trim().length > 0) {
                    translateText();
                }
            }
        });
    });

    // Supported Languages Grid Card click
    langCards.forEach(card => {
        card.addEventListener('click', () => {
            const code = card.getAttribute('data-code');
            if (code) {
                targetLangSelect.value = code;
                updateLanguageLabels();
                
                // Smooth scroll up to translator workspace
                const workspace = document.getElementById('translator-workspace');
                if (workspace) {
                    workspace.scrollIntoView({ behavior: 'smooth' });
                }
                
                showToast(`Target language set to ${LANGUAGE_NAMES[code]}`);
                sourceText.focus();
            }
        });

        // Accessible keyboard trigger
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Mobile Navigation Drawer Toggle
    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileDrawer.classList.toggle('open');
        });

        // Close drawer when clicking a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
            });
        });
    }

    // Preload speech synthesis voices (fixes empty getVoices on first load in Chrome)
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }

    // Initial setup
    updateLanguageLabels();
    updateCharacterCount();
});

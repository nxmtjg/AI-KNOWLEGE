// 语音识别功能
class VoiceSearch {
    constructor() {
        this.voiceBtn = document.querySelector('.voice-btn');
        this.micIcon = document.querySelector('.mic-icon');
        this.searchInput = document.querySelector('.search-input');
        this.recognition = null;
        this.isRecording = false;

        this.initSpeechRecognition();
        this.addEventListeners();
    }

    initSpeechRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'zh-CN';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.searchInput.value = transcript;
                this.stopRecording();
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.stopRecording();
            };

            this.recognition.onend = () => {
                this.stopRecording();
            };
        } else {
            this.voiceBtn.style.display = 'none';
            console.log('Speech recognition not supported');
        }
    }

    addEventListeners() {
        this.voiceBtn.addEventListener('click', () => {
            if (!this.isRecording) {
                this.startRecording();
            } else {
                this.stopRecording();
            }
        });
    }

    startRecording() {
        if (this.recognition) {
            this.recognition.start();
            this.isRecording = true;
            this.micIcon.classList.add('recording');
            this.voiceBtn.title = '停止录音';
        }
    }

    stopRecording() {
        if (this.recognition) {
            this.recognition.stop();
            this.isRecording = false;
            this.micIcon.classList.remove('recording');
            this.voiceBtn.title = '语音搜索';
        }
    }
}

// 初始化语音搜索
document.addEventListener('DOMContentLoaded', () => {
    new VoiceSearch();
}); 
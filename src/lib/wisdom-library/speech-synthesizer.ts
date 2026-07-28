// Audio Narration & Web Audio Soundscape Engine

export type SoundscapeType = "none" | "sitar" | "rain" | "ocean";

class WisdomAudioEngine {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isPlaying: boolean = false;
  private rate: number = 1.0;
  private voice: SpeechSynthesisVoice | null = null;

  // Web Audio Context for Ambient Soundscapes
  private audioCtx: AudioContext | null = null;
  private activeSoundscapeNode: AudioNode | null = null;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    return this.synth.getVoices();
  }

  public speakText(
    text: string,
    onSentenceChange?: (sentenceIndex: number, sentenceText: string) => void,
    onEnd?: () => void,
    rate: number = 1.0,
    voiceName?: string
  ) {
    if (!this.synth) return;

    this.stop();
    this.rate = rate;

    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let currentSentenceIdx = 0;

    const speakSentence = (index: number) => {
      if (index >= sentences.length) {
        this.isPlaying = false;
        if (onEnd) onEnd();
        return;
      }

      currentSentenceIdx = index;
      const sentenceStr = sentences[index].trim();
      if (onSentenceChange) onSentenceChange(index, sentenceStr);

      const utterance = new SpeechSynthesisUtterance(sentenceStr);
      utterance.rate = this.rate;

      if (voiceName) {
        const voices = this.getVoices();
        const selected = voices.find((v) => v.name === voiceName);
        if (selected) utterance.voice = selected;
      }

      utterance.onend = () => {
        if (this.isPlaying) {
          speakSentence(index + 1);
        }
      };

      utterance.onerror = () => {
        this.isPlaying = false;
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      this.synth!.speak(utterance);
    };

    this.isPlaying = true;
    speakSentence(0);
  }

  public pause() {
    if (this.synth) {
      this.synth.pause();
      this.isPlaying = false;
    }
  }

  public resume() {
    if (this.synth) {
      this.synth.resume();
      this.isPlaying = true;
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isPlaying = false;
      this.currentUtterance = null;
    }
  }

  public setRate(newRate: number) {
    this.rate = newRate;
    if (this.currentUtterance) {
      // restart current with new rate
    }
  }

  // --- AMBIENT SOUNDSCAPE GENERATOR (Web Audio API) ---
  public setSoundscape(type: SoundscapeType) {
    if (typeof window === "undefined") return;

    if (this.activeSoundscapeNode) {
      try {
        (this.activeSoundscapeNode as any).stop?.();
        this.activeSoundscapeNode.disconnect();
      } catch (e) {}
      this.activeSoundscapeNode = null;
    }

    if (type === "none") return;

    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtx();
    }

    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }

    if (type === "sitar") {
      // Sitar Drone Oscillator
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(136.1, this.audioCtx.currentTime); // Om frequency (C# 136.1 Hz)
      gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      this.activeSoundscapeNode = osc as any;
    } else if (type === "rain" || type === "ocean") {
      // Pink Noise Generator for Rain / Waves
      const bufferSize = this.audioCtx.sampleRate * 2;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.03;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;
      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.03, this.audioCtx.currentTime);
      whiteNoise.connect(gain);
      gain.connect(this.audioCtx.destination);
      whiteNoise.start();
      this.activeSoundscapeNode = whiteNoise as any;
    }
  }
}

export const wisdomAudio = new WisdomAudioEngine();

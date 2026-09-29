# NeuroImmune CT Prep & Interactive Simulator 🧬⚡

An interactive, offline-ready biological simulator and class test preparation app built for neuroscience, bio-interfacing, and immunology study.

---

## 📱 Android APK Download

Get the standalone compiled Android application directly from GitHub Releases:
- **Download**: [NeuroImmune-v1.0.0.apk (Releases)](https://github.com/prantopream420/Biology-interactive/releases/latest)
- **Package ID**: `com.pranto.neuroimmune`
- **Supported Android Versions**: Android 7.0+ (API 24 to 34+)

### Install via ADB
```bash
adb install -r Biology-interactive.apk
```

---

## ✨ Features & Interactive Labs

### 🔬 1. Interactive Simulation Hub
- **Action Potential Simulator**: Real-time voltage gate control ($Na^+$, $K^+$, $Na^+/K^+$ pump), phase tracing (Depolarization, Repolarization, Hyperpolarization), and refractory period mechanics.
- **Synaptic Transmission Lab**: Action potential arrival, voltage-gated $Ca^{2+}$ influx, neurotransmitter exocytosis (ACh), synaptic cleft diffusion, receptor binding, and enzymatic degradation (AChE).
- **Brain-Computer Interface (BCI) Pipeline**: End-to-end signal processing visualizer from EEG/ECoG acquisition, preprocessing/filtering, feature extraction (FFT/Wavelet), machine learning classification (SVM/ANN), to robotic effector commands with neurofeedback loop.
- **ANN vs BNN Arena**: Side-by-side comparative architecture benchmark comparing biological neurons (dendrites, soma, axon, synapses, continuous spikes, biochemical energy efficiency) with artificial neural networks (inputs, weights, bias, activation functions, backpropagation).
- **Innate vs Adaptive Immunity Arena**: First & second lines of defense (phagocytes, NK cells, complement) vs third line humoral & cell-mediated responses ($CD4^+$ helper T, $CD8^+$ cytotoxic T, B-cells, plasma cells, memory cells).
- **NK Cell Cytotoxicity Simulator**: "Missing-Self" hypothesis mechanics with inhibitory receptors (MHC Class I detection) and activating receptors, Perforin pore formation, and Granzyme B apoptotic cascades.
- **mRNA Vaccine & Lipid Nanoparticle (LNP) Simulator**: Endocytosis of ionizable LNPs, endosomal escape, cytosolic ribosome translation of target antigen spikes, and dual MHC-I & MHC-II antigen presentation pathways.
- **Vaccine Types Explorer**: Interactive taxonomy of Inactivated, Live-Attenuated, Subunit/Protein, Viral Vector, and mRNA vaccines with efficacy, safety, and cold-chain stability comparison.

---

### 📚 2. Syllabus & Exam Preparation
- **Structured Syllabus Q&A**: Complete question bank with precise clinical and theoretical answers.
- **Random 20 CT Drill**: Timed self-assessment test engine with score calculation, instant feedback, and detailed explanations.
- **Rapid Cheat Sheet**: High-yield tables, key metrics, and exam-focused mnemonics.
- **Persistent Bookmarks**: Save difficult topics and review them anytime offline.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion / Framer Motion, Lucide Icons
- **Bundler**: Vite 8
- **Android Runtime**: Native Android WebView Shell (`android.webkit.WebViewAssetLoader` / secure local asset interceptor over HTTPS)
- **Toolchain**: Standalone Android SDK Platform 34, `aapt2`, `d8`, `javac` (Temurin JDK 17), `apksigner`

---

## 🚀 Building from Source

### Prerequisites
- Node.js 20+ & npm
- JDK 17+
- Android SDK Build-Tools 34.0.0 & Platform 34

### Local Web Development
```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build production web bundle
npm run build
```

### Build Native Android APK
```bash
./android/build_apk.sh
```
The output signed APK will be generated at `android/Biology-interactive.apk`.

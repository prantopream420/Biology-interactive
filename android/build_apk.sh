#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="/home/pranto-pream/Biology-interactive"
BUILD_DIR="$ROOT_DIR/android/build"
SDK="/home/pranto-pream/tools/android-sdk"
AAPT2="$SDK/build-tools/34.0.0/aapt2"
D8="$SDK/build-tools/34.0.0/d8"
APKSIGNER="$SDK/build-tools/34.0.0/apksigner"
ANDROID_JAR="$SDK/platforms/android-34/android.jar"
JAVA_HOME="/home/pranto-pream/tools/jdk17"
JAVAC="$JAVA_HOME/bin/javac"
KEYTOOL="$JAVA_HOME/bin/keytool"

echo "=== 1. Building Vite Web App ==="
cd "$ROOT_DIR"
export PATH="/home/pranto-pream/.nvm/versions/node/v22.23.3/bin:$JAVA_HOME/bin:$PATH"
npm run build

echo "=== 2. Setting up Assets and Build Dir ==="
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/assets" "$BUILD_DIR/bin" "$BUILD_DIR/dex"
cp -r "$ROOT_DIR/dist/"* "$BUILD_DIR/assets/"

echo "=== 3. Compiling Android Resources ==="
"$AAPT2" compile --dir "$ROOT_DIR/android/app/src/main/res" -o "$BUILD_DIR/compiled_res.zip"

echo "=== 4. Linking Resources & Generating R.java ==="
"$AAPT2" link \
    -o "$BUILD_DIR/base.apk" \
    -I "$ANDROID_JAR" \
    --manifest "$ROOT_DIR/android/app/src/main/AndroidManifest.xml" \
    -A "$BUILD_DIR/assets" \
    --java "$BUILD_DIR/gen" \
    "$BUILD_DIR/compiled_res.zip"

echo "=== 5. Compiling Java Classes ==="
mkdir -p "$BUILD_DIR/classes"
"$JAVAC" -cp "$ANDROID_JAR" \
    -d "$BUILD_DIR/classes" \
    $(find "$ROOT_DIR/android/app/src/main/java" -name "*.java") \
    $(find "$BUILD_DIR/gen" -name "*.java" 2>/dev/null || true)

echo "=== 6. Dexing Bytecode ==="
"$D8" --lib "$ANDROID_JAR" --output "$BUILD_DIR/dex" $(find "$BUILD_DIR/classes" -name "*.class")

echo "=== 7. Adding classes.dex to APK ==="
cd "$BUILD_DIR/dex"
zip -u "$BUILD_DIR/base.apk" classes.dex

echo "=== 8. Creating Keystore and Signing APK ==="
cd "$BUILD_DIR"
if [ ! -f "$ROOT_DIR/android/debug.keystore" ]; then
    "$KEYTOOL" -genkeypair -v \
        -keystore "$ROOT_DIR/android/debug.keystore" \
        -storepass android \
        -alias androiddebugkey \
        -keypass android \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -dname "CN=Android Debug,O=Android,C=US"
fi

"$APKSIGNER" sign \
    --ks "$ROOT_DIR/android/debug.keystore" \
    --ks-pass pass:android \
    --key-pass pass:android \
    --out "$ROOT_DIR/android/Biology-interactive.apk" \
    "$BUILD_DIR/base.apk"

echo "=== 9. Verifying APK Signature ==="
"$APKSIGNER" verify -v "$ROOT_DIR/android/Biology-interactive.apk"

echo "=== APK Successfully Built ==="
ls -lh "$ROOT_DIR/android/Biology-interactive.apk"

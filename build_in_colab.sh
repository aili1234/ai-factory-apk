#!/bin/bash
set -e
sudo apt update
sudo apt install -y openjdk-17-jdk unzip wget
./gradlew assembleDebug || gradle assembleDebug
find . -name "*.apk"

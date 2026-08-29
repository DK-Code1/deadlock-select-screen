#!/bin/bash

INPUT_DIR="vo"
OUTPUT_DIR="vo_opus"

find "$INPUT_DIR" -type f -iname "*.mp3" -print0 |
while IFS= read -r -d '' file; do
    relative="${file#$INPUT_DIR/}"
    output="$OUTPUT_DIR/${relative%.mp3}.opus"

    mkdir -p "$(dirname "$output")"

    ffmpeg -i "$file" -c:a libopus -b:a 48k "$output"
done
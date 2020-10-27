#!/bin/sh
if [ $# -lt 1 ]; then
    echo "exit 1"
    exit 1
fi

BASEDIR=$(dirname "$0")
path=$1
filename=$(basename "$path")
extension="${filename##*.}"
uuid=$(uuidgen)
cp -n "$path" $BASEDIR/../images/$uuid.$extension # -n: do not overwrite
echo "![img](/assets/images/$uuid.$extension)"
echo "![img](/assets/images/$uuid.$extension)" | pbcopy
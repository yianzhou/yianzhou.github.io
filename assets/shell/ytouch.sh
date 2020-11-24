ts=""
if [ -z "$2" ]; then
    ts=$(echo `date +%s` | rev)
else 
    ts="$2"
fi
touch ~/Downloads/${ts}."$1"
code ~/Downloads/${ts}."$1";
#! /bin/bash


if [[ $# -ne 3 ]]; then
  echo "usage: $0 [netid] [committer name] [path to list of files to get]" >&2
  exit 2
fi

OUTPUT_FILE="$1.commits.txt"
COMMITTER=$2
FILES_FILE=$3

touch $OUTPUT_FILE

while IFS= read -r line
do
  if [[ -f "$line" ]]; then
    echo "### $line ###" >> $OUTPUT_FILE
    echo >> $OUTPUT_FILE
    git blame $line | grep "$COMMITTER" >> $OUTPUT_FILE
    echo >> $OUTPUT_FILE
    echo >> $OUTPUT_FILE
  else
    echo "can not find file $line" >&2
  fi

done < "$FILES_FILE"

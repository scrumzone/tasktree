#!/bin/bash

# 493c3def (Zavier Miller 2022-09-22 14:00:12 -0400  1) version: '3.7'

if [[ $# -ne 3 ]]; then
  echo "usage: $0 [committer name] [path to list of files you worked on] [date after]" >&2
  exit 2
fi

COMMITTER=$1
FILES_FILE=$2
DATE_AFTER=`date -d $3 +%s`
outline=""

while IFS= read -r file <&3
do
  if [[ -f "$file" ]]; then
    printed=0
    blame_line=`git blame -f $file | grep -E "$COMMITTER"`

    while read -r line; do
      blame_date=`echo $line | awk '{ print $4}'`
      blame_date=`date -d $blame_date +%s`
      if [[ "$blame_date" -ge "$DATE_AFTER" ]]; then
        if [[ $printed = 0 ]]; then
          outline+=`echo "### $file ###"`
          outline+=$'\n'
          printed=1
        fi
        outline+=`echo "$line"`
        outline+=$'\n'
      fi
    done <<< "$blame_line"
    outline+=$'\n'
    outline+=$'\n'

  else
    echo "can not find file $file" >&2
  fi

done 3< "$FILES_FILE"

echo "$outline"

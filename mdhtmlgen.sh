#!/bin/bash

# Takes an input path, output path, and template
# -i, -o, -t

args=("$@")

argIndex=0
input=""
output=""
template=""

for var in "${args[@]}"
do
	case $var in
		-i)
			input="${args[$((argIndex+1))]}"
			;;
		-o)
			output="${args[$((argIndex+1))]}"
			;;
		-t)
			template="${args[$((argIndex+1))]}"
			;;
	esac
			
	argIndex=$((argIndex+1))
done

[[ $input != "" ]] || echo "no input"
[[ $output != "" ]] || echo "no output"
[[ $template != "" ]] || echo "no template"

[[ $input != "" ]] && [[ $output != "" ]] && [[ $template != "" ]] || exit

echo "input: $input"
echo "output: $output"
echo "template: $template"


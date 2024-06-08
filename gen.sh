#!/bin/bash

append_to_json() {
	path="$1"
	title="$(grep -m1 "title: " "$path" | cut -d ' ' -f 2-)"
	url="$(echo "${path%.md}.html" | cut -c3- )"
	page_json_obj=""
	page_json_obj+='"title": "'"$title"'",'
	page_json_obj+='"url": "'"$url"'"'
	jq -n \{"$page_json_obj"\}
}

convert_to_html() {
	path="$1"
	pandoc --template templates/template.html "$path" -o "${path%.md}.html"
}

process_markdown_file() {
	pages_json_array=()

	while read -r md_path; do
		echo "$md_path -> ${md_path%.md}.html"

		convert_to_html "$md_path"
		pages_json_array+=("$(append_to_json "$md_path")")
	done
	printf "%s\n" "${pages_json_array[@]}" | jq -s > pages.json
}

# Finds markdown files, converts the files into html and appends their urls
# and titles to pages.json
find ./articles -name "*.md" | process_markdown_file
echo "ls-techs.md" | process_markdown_file

# Take input files regex with -i
# Take output files format with -o (can use $1, $2, etc from regex)

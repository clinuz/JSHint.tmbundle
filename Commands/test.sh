#!/usr/bin/env bash
[[ -f "${TM_SUPPORT_PATH}/lib/bash_init.sh" ]] && . "${TM_SUPPORT_PATH}/lib/bash_init.sh"

if [[ -e $TM_JSHIN_CONFIG ]]
   then JSHINT_CONFIG=$TM_JSHINT_CONFIG
fi

if [[ -e "$TM_DIRECTORY/.jshintrc" ]]
   then JSHINT_CONFIG="$TM_DIRECTORY/.jshintrc"
fi


echo ${PWD}

# run nodelint on the current file and output as a tool tip summary
cd ${TM_BUNDLE_SUPPORT}/jshint/

echo ${PWD}

output=$(./bin/jshint --config ${JSHINT_CONFIG} ${TM_FILEPATH})

echo $output
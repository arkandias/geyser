_geyser()
{
    local cur prev opts coms
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    prev="${COMP_WORDS[COMP_CWORD-1]}"
    opts="--dev --prod"
    coms="start stop restart update reset"

    if [[ ${cur} == -* ]] ; then
        COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
        return 0
    fi

    if [[ ${prev} == "geyser" ]] ; then
        COMPREPLY=( $(compgen -W "${coms}" -- ${cur}) )
        return 0
    fi
}

complete -F _geyser geyser
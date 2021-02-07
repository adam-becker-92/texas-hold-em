#!/bin/sh

git filter-branch --env-filter '
OLD_EMAIL="sandybecker@sandys-mbp.home"
CORRECT_NAME="Adam Becker"
CORRECT_EMAIL="adambecker3@gmail.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    echo $GIT_COMMITER_EMAIL
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
'
#!/bin/bash
cd /home/kavia/workspace/code-generation/note-organizer-138320-138333/notes_manager_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


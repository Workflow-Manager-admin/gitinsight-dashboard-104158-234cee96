#!/bin/bash
cd /home/kavia/workspace/code-generation/gitinsight-dashboard-104158-234cee96/git_insight_dashboard
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


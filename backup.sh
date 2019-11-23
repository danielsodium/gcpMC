#!/usr/bin/env bash
cat << EOF > .dropbox_uploader
OAUTH_ACCESS_TOKEN=[TOKEN]
EOF
  if [ -d world ]; then
    tar -czvf backup.tar.gz world world_nether world_the_end plugins
    bin/dropbox_uploader.sh upload backup.tar.gz /serverforminecraft
    rm backup.tar.gz
  else
    if bin/dropbox_uploader.sh download /backup.tar.gz /serverforminecraft
    then
      tar -xzvf backup.tar.gz
      rm backup.tar.gz
    fi
  fi
  rm .dropbox_uploader

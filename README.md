# Minecraft Server on Google Cloud Platform

This was made using the compute engine and a cloud function.

First install papermc onto the compute engine. Then copy on backup.sh, .dropboxuploader.sh, and autoshutdown.sh into the main directory of the minecraft server. You may have to put .dropboxuploader.sh in its own folder. You may have to run .dropboxuploader.sh to get the token in.
Open up crontab and have it run backup.sh as well as autoshutdown.sh as often as you like. This will backup the server files to dropbox and then shut down the server if there no people active for 15 minutes.

Finally, make a cloud function for startinstance and copy the contents of index.js into the main script. This will allow you to start the instance by pinging a web address.

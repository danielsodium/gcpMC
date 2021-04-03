# Minecraft Server on Google Cloud Platform

The most cost efficient method I found of running a Minecraft Server on a Google Cloud Compute Engine. By using PaperMC, it minimizes cpu usage as it is a lightweight version that still supports mods. Backup is done with Dropbox for free in order to save the costs of using GCP storage. Autoshutdown runs every 15 minutes (customizable) to shutdown whenever  no one is playing. A web instance runs index.js so that my friends can start up the server without having to ask me to do so.

This was made for use with a compute engine and a cloud function.

First install papermc onto the compute engine. Then copy on backup.sh, .dropboxuploader.sh, and autoshutdown.sh into the main directory of the minecraft server. You may have to put .dropboxuploader.sh in its own folder. You may have to run .dropboxuploader.sh to get the token in.
Open up crontab and have it run backup.sh as well as autoshutdown.sh as often as you like. This will backup the server files to dropbox and then shut down the server if there no people active for 15 minutes.

Finally, make a cloud function for startinstance and copy the contents of index.js into the main script. This will allow you to start the instance by pinging a web address.

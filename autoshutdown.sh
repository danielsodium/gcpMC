#!/bin/sh
SERVICE='paper.jar'
if ps ax | grep -v grep | grep $SERVICE > /dev/null; then
        PLAYERSEMPTY=" There are 0 of a max 20 players online"
        $(screen -S minecraft -p 0 -X stuff "list^M")
        sleep 5
        $(screen -S minecraft -p 0 -X stuff "list^M")
        sleep 5
        PLAYERSLIST=$(tail -n 1 logs/latest.log | cut -f2 -d"/" | cut -f2 -d":")
        echo $PLAYERSLIST
        if [ "$PLAYERSLIST" = "$PLAYERSEMPTY" ]
        then
                $(screen -S minecraft -p 0 -X stuff "list^M")
                sleep 5
                $(screen -S minecraft -p 0 -X stuff "list^M")
                sleep 5
                PLAYERSLIST=$(tail -n 1 logs/latest.log | cut -f2 -d"/" | cut -f2 -d":")
                if [ "$PLAYERSLIST" = "$PLAYERSEMPTY" ]
                then
                        $(screen -S minecraft -p 0 -X stuff "stop^M")
                        $(sudo shutdown now)
                fi
        fi
else
        echo "Screen does not exist, briefly waiting before trying again"
        sleep 5m
        if ! ps ax | grep -v grep | grep $SERVICE > /dev/null; then
                echo "Screen does not exist, shutting down"
                $(sudo shutdown now)
        fi
fi

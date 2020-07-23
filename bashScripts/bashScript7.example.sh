
#BEFORE YOU RUN THE IMAGE YOU PULLED IN bashScript5.sh, if your DB is not running, you will have to run this file first
networkName=[[[Replace with the network your DB is running on]]]
aliasName=[[[Replace with the aliasName your DB is known by, on the network]]]
volumeName=[[[Replace with the volume your DBs data will be persisted to]]]
mongoVersion=[[[Replace with the version of mongo you want to run]]]

docker run -d --network $networkName --network-alias $aliasName -v $volumeName:/etc/mongo mongo:$mongoVersion


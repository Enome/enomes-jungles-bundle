# Enome's Jungles Bundle

Repository you can clone to get started with Jungles Cms with some personal preferences.

## What's included?

- Jade
- Stylus + Nib
- Postgresql datalayer
- Jungles Rest
- Jungles Panel
- Jungles Files
- Jungles Front-end helpers
- Jungles Front-end Middleware
- Jungles Errors
- Jungles Components (file upload)
- Vagrant with Postgresql Database
- Makefile: setup online server (using puppet), dump online database, dump local (vagrant) database, dump online media to local
- Forever ignore file
- Static directory structure
- Visionmedia's Deploy

## Setup

```sh
git clone git://github.com/Enome/enomes-jungles-bundle.git
cd enomes-jungles-bundle
npm install
vagrant up
forever -w -c node.js
```

One-liner

```sh
git clone git://github.com/Enome/enomes-jungles-bundle.git && cd enomes-jungles-bundle && npm install && vagrant up && forever -w -c node.js
```

You can find the admin at /administrator

## Make

Change the ip in the Makefile.

### Commands

```sh
make dump_local
```

This will dump the local database (vagrant) into vagrant/dump.sql.

```sh
make dump_online
```

Dump the online database into vagrant/dump.sql.

```sh
make dump_online_media
```

Copy the online media directory to your local one.

```sh
make setup_server
```

Setup the online server using puppet. You can find the puppet manifest at: https://raw.github.com/Enome/puppet/master/jungles.pp 

#### Note

This will install postgresql on your server but you have to manually create the user and database.

## Deploy

Open the deploy.conf file and adjust the settings.

### Commands

```sh
deploy production setup
```

Setup the directory strucure for deploy and initializes the git repository.

```sh
deploy production
```

Deploy to your server.

```sh
deploy production console
```

ssh into your server.


More info can be found here: https://github.com/visionmedia/deploy

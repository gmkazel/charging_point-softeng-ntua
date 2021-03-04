ev_group32
=========

The cli-client of Charging Point

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![License](https://img.shields.io/npm/l/ev_group32.svg)](https://github.com/ntua/TL20-32/blob/development/LICENSE)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ev_group32
$ ev_group32 COMMAND
running command...
$ ev_group32 (-v|--version|version)
ev_group32/1.0.0 linux-x64 node-v12.18.2
$ ev_group32 --help [COMMAND]
USAGE
  $ ev_group32 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ev_group32 admin`](#ev_group32-admin)
* [`ev_group32 healthcheck`](#ev_group32-healthcheck)
* [`ev_group32 help [COMMAND]`](#ev_group32-help-command)
* [`ev_group32 login`](#ev_group32-login)
* [`ev_group32 logout`](#ev_group32-logout)
* [`ev_group32 resetsessions`](#ev_group32-resetsessions)

## `ev_group32 admin`

system management calls

```
USAGE
  $ ev_group32 admin

OPTIONS
  --apikey=apikey           the api key used for authorization
  --format=json|csv         [default: json] the file type for the data to be returned
  --healthcheck             tests live server for errors
  --passw=passw             Your password
  --resetsessions           reset evcharge data and insert default admin to the db
  --sessionsupd             upload charging session data to the database. should be used with --source
  --source=source           the file to upload to the server. it can only be a csv file
  --usermod                 insert a new user to the database or change an existing user's password. should be used with   --username --passw
  --username=username       Your username
  --users                   get details for a specific user. should be used with --username

DESCRIPTION
  The system calls should be used with the api-key, which authenticates that the account as an adminstrator. The only exceptions are the resetsessions and healthcheck commands, that are provided seperately as well and are for testing purposes.
```

_See code: [src/commands/admin.js](https://github.com/ntua/TL20-32/tree/development/cli-client/ev_group32/src/commands/admin.js)_

## `ev_group32 healthcheck`

tests live server for errors

```
USAGE
  $ ev_group32 healthcheck

OPTIONS
  --format=json|csv         [default: json] the file type for the data to be returned
```

_See code: [src/commands/healthcheck.js](https://github.com/ntua/TL20-32/tree/development/cli-client/ev_group32/src/commands/healthcheck.js)_


## `ev_group32 help [COMMAND]`

display help for ev_group32

```
USAGE
  $ ev_group32 help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `ev_group32 login`

login to the server to get your api-key

```
USAGE
  $ ev_group32 login

OPTIONS
  --passw=passw             (required) Your password
  --username=username       (required) Your username
 
DESCRIPTION
  On successful login, the api-key is saved on {home}/softeng20bAPI.token/

```

_See code: [src/commands/login.js](https://github.com/ntua/TL20-32/tree/development/cli-client/ev_group32/src/commands/login.js)_

## `ev_group32 logout`

logout of the current session

```
USAGE
  $ ev_group32 logout

OPTIONS
  --apikey=apikey           (required) the api key used for authorization
  --format=json|csv         (required) [default: json] the file type for the data to be returned

 
DESCRIPTION
  On successful logout, the api-key is deleted from {home}/softeng20bAPI.token/

```

_See code: [src/commands/logout.js](https://github.com/ntua/TL20-32/tree/development/cli-client/ev_group32/src/commands/logout.js)_

## `ev_group32 resetsessions`

reset evcharge data and insert default admin to the db

```
USAGE
  $ ev_group32 resetsessions

OPTIONS
  --format=json|csv         (required) [default: json] the file type for the data to be returned

```

_See code: [src/commands/resetsessions.js](https://github.com/ntua/TL20-32/tree/development/cli-client/ev_group32/src/commands/resetsessions.js)_

<!-- commandsstop -->

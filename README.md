## Hello GraphQL
This repo is a sample api exploring the basic use of GraphQL. Queries and mutations requested from the client are handled in the [server/resolvers](server/resolvers) directory. The resolvers will then execute database queries from the [server/mysql](server/mysql) directory. Object classes are defined in [server/classes](server/classes).

### Local Setup Prerequsites
First setup your machine with these prerequsites:
- Install Homebrew: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
- Install Docker: `brew cask install docker`
- Start the docker engine: `open /Applications/Docker.app`

### Local Startup
Create the docker-compose stack and allow the app to initialize:
- Create the stack (this will pull/build docker images the first time): `docker-compose up --detach`
- Wait for mysql to initialize (watch progress here): `docker-compose logs -f mysql`
- Run the server-mysql integration tests: `docker-compose exec server npm run test-integration`

### GraphiQL
Load the GraphiQL page in a browser: `localhost:8000/graphql`
Use this interface to execute sample queries. Note that authorized queries will require the `Authorization` header.

### Authorization/Authentication
A successful login query will respond with a `jwt`, which will need to be added to subsequent queries to provide authentication. Example `Authorization: Bearer ${jwt}`. Currently user authentication is limited to objects owned by that user.

### GraphQL Schema
- Check out the graphql schema [here](server/graphql/schema.graphql)
- and example client query operations [here](server/graphql/clientQuery.graphql)

### Mysql Schema
- Check out the database schema [here](mysql/docker-entrypoint-initdb.d/init.sql)
- Mysql data is persisted on disk in the `mysql/data` directory

### Mounting Code
- To mount local code for development purposes uncomment the volume mount in the server service in the [docker-compose.yaml](docker-compose.yaml)
- then recreate the server with `docker-compose up --force-recreate --detach server`
- your local dir will overwrite the container code dir (including the node_modules) so you will need to re-install the dependencies with `docker-compose exec server npm install`
- run the unit tests with `docker-compose exec server npm test`
- and the integration tests with `docker-compose exec server npm test-integration`
- to start an interactive terminal session in the server container run `docker-compose exec server ash`

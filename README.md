# tasktree

welcome to the scrum zone

## Getting started

This section of the guide will help get you up and running with a fresh copy of the repo.

### Prerequisites

Before you can run any apps, you will need to have the following installed:

- local setup
  - the `dotnet` CLI
  - `mysql`
  - `node`
    **OR**
- docker setup
  - docker

#### Local setup

##### Setting up dotnet CLI

When you first set up Visual Studio or Rider to work with our project backend, the dotnet CLI should be automatically installed.
You can now run commands starting with `dotnet ...`. For example, one tool you'll need is the Entity Framework CLI, which is easily installable through the dotnet CLI:

```
dotnet tool install --global dotnet-ef
```

##### Setting up MySQL

On Windows, you can install the MySQL server using the installer found [here](https://dev.mysql.com/downloads/installer/). **Be sure to install version 8.0.xx.**
After doing that, navigate to the install location of the MySQL binary (usually somthing like `C:\ProgramFiles\MySQL\bin\`) and run the following:

```
.\mysql.exe -u root -p
```

You will be asked to provide a password, this is the same one you set up during the install process.

Now, copy the commands in the file `db/init/init-windows.sql` to get the MySQL user set up correctly for talking to the backend.

Finally, you should now navigate to the `backend/TaskTree` directory and run the following command to create the appropriate tables in the database by running migrations:

```
dotnet ef database update
```

**Note: This will need to be run anytime you pull a change that modifies the `backend/TaskTree/Migrations` folder**

And with that, you are now ready to run the backend! It can be started by hitting the 'Run' button in VS. Make sure the database is running by executing the command

```
command from andrew
```

##### Setting up NodeJS

Install the latest version of NodeJS through an installer or CLI. If it is installed correctly, you should be able to run the `node` command and see a JavaScript REPL come up.

Once Node has been installed, navigate to the `frontend` directory and execute `npm install` to get all the dependencies on your local machine.

You should now be able to run the frontend app by executing `npm run start` within the `frontend` directory

#### Docker setup

There are a lot of steps involved with getting everything set up locally, so we have a Docker Compose project to help get started a lot quicker.

To use Docker, on Windows, install Docker Desktop. On Linux, install the Docker daemon from you package manager.

Once you have the `docker` command working, you can simply navigate to this directory and run

```
docker compose up [project]
```

to run the whole project, or just the backend/frontend.

To run just the backend or frontend simply specify that in the command up in the optional `[project]` argument.

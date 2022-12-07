# Tasktree
![logo](https://github.com/scrumzone/tasktree/blob/main/frontend/src/assets/logo.png)

### Members:
* Zack Malkmus (zmalkmus)
* Tyler Nitzsche (PotassiumLover)
* Andrew Rutter
* Ethan Maness (emaness-utk)
* Zavier Miller (zaviermiller)


## Product Overview:
  Sometimes its hard to keep track of tasks you have to do in your day to day lives and organize your productivity based on importance so you get the stuff you want to   get done before the menial, unimportant tasks. Sometimes the tasks are too large and complex to reasonably keep track of without writing it down. This application     would solve a variety of problems in prioritizing, and managing one's time. The website will allow a user to create an account and add a new project to get started.   They will be given the option to edit the name and description of the project, and add tasks corresponding to the project according to their needs. When the user       completes an item, they can mark is as complete by pressing the checkmark and all subtasks will be marked as complete as well. When all subtasks are completed, or     the project itself is marked as complete, the project will visually update as completed for the user. The site will also feature the most recent projects being         worked on, as well as another tab for an extended list of projects. The site will overall have a landing, log in, sign up, home, and projects page to be navigated by   the end user.

# Getting started

This section of the guide will help get you up and running with a fresh copy of the repo.

## Prerequisites

Before you can run any apps, you will need to have the following installed:

- local setup
  - the `dotnet` CLI
  - `mysql`
  - `node`
 
    **OR**
- docker setup
  - `docker`
  - `dotnet` CLI

### Local setup

#### Setting up dotnet CLI (required for both Docker and running locally)

When you first set up Visual Studio or Rider to work with our project backend, the dotnet CLI should be automatically installed.
You can now run commands starting with `dotnet ...`. For example, one tool you'll need is the Entity Framework CLI, which is easily installable through the dotnet CLI:

```
dotnet tool install --global dotnet-ef
```

#### Setting up MySQL

On Windows, you can install the MySQL server using the installer found [here](https://dev.mysql.com/downloads/installer/). **Be sure to install version 8.0.xx.**
After doing that, navigate to the install location of the MySQL binary (usually somthing like `C:\ProgramFiles\MySQL\MySQL Server 8.0\bin\`) and run the following:

```
.\mysql.exe -u root -p
```

You will be asked to provide a password, this is the same one you set up during the install process.

Now, copy the commands in the file `db/init/init-windows.sql` to get the MySQL user set up correctly for talking to the backend.

Finally, you should now navigate to the `backend/TaskTree` directory and run the following command to create the appropriate tables in the database by running migrations:

```
dotnet ef database update
```

**NOTE: This will need to be run anytime you pull a change that modifies the `backend/TaskTree/Migrations` folder**

Before you can run the backend, you need to make sure that the MySQL server is running using the following command:

```
net start mysql80
```

#### Setting up NodeJS

Install the latest version of NodeJS through an installer or CLI. If it is installed correctly, you should be able to run the `node` command and see a JavaScript REPL come up.

Once Node has been installed, navigate to the `frontend` directory and execute `npm install` to get all the dependencies on your local machine.

### Docker setup

There are a lot of steps involved with getting everything set up locally, so we have a Docker Compose project to help get started a lot quicker.

To use Docker, on Windows, install Docker Desktop. On Linux, install the Docker daemon from you package manager.

You will still need to run `dotnet ef database update` from within the backend container to ensure the database is properly set up.

## Running the app

Now that all the prerequisites are satisfied, you can pretty easily run the app.

#### Running locally

##### backend

To run the backend project, all you have to do is open the project in Visual Studio and hit the 'Run' button.

**NOTE: There is not hot-reloading on the backend, so whenever you make a change to it you must restart the server.**

##### frontend

Running the frontend is very simple; just navigate to the `frontend` directory and execute:

```
npm run start
```

#### Using Docker

To run the project with docker, simply navigate to this directory and run:

```
docker compose up [project]
```

to run the whole project, or just the backend/frontend.

To run just the backend or frontend simply specify that in the command up in the optional `[project]` argument.

### License
[License](https://github.com/scrumzone/tasktree/blob/main/LICENSE.txt)

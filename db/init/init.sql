CREATE USER 'tasktree'@'localhost' IDENTIFIED BY 'tasktree';
ALTER USER tasktree WITH SUPERUSER;
ALTER USER tasktree WITH LOGIN;
ALTER USER tasktree WITH CREATEDB;
CREATE DATABASE tasktree;
GRANT ALL PRIVILEGES ON DATABASE tasktree TO tasktree;
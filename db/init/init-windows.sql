CREATE USER 'tasktree'@'localhost' IDENTIFIED BY 'tasktree';
GRANT CREATE ON *.* TO 'tasktree'@'localhost';
CREATE DATABASE tasktree;
GRANT ALL PRIVILEGES ON tasktree.* TO 'tasktree'@'localhost';
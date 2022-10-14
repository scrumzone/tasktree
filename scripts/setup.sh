#!/bin/sh

echo "Installing root-level packages..."
echo
npm install # install husky (hooks), lint-staged (linting changed files)
echo "Done."
echo
npm run prepare # create actual git hook from husky
echo "Done."
echo
echo "Installing dotnet format..."
dotnet tool install -g dotnet-format # install dotnet format for formatting backend
echo
echo "Done."

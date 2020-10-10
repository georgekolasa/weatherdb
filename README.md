# WeatherDB

A React application for interacting with NOAA weather data

## Contributing

Be sure to create your own fork of this repository, utilize the separation of major features into individual branches, and create Pull Requests when major features have been implement. Before creating a pull request, or continuing from your last coding session, be sure to pull any changes from the upstream. If you are unsure of what this would look like to get set up, here is a quick guide:

1. fork this repository using the button underneath your profile picture
2. clone your fork to your machine locally
3. navigate to the clones root directory and add the upstream reference to this repository using the following command: `git remote add upstream https://github.com/weatherdb/weatherdb.git`
4. you can now update your fork with changes merged to this repository! Here's a simple example:

```bash
git commit -m "i did some work, here's my meaning commit message"
git pull upstream <CURRENT_BRANCH>

# uh oh, conflicts... 
# few min later, conflicts resolved

git commit -m "fixed conflicts from updating branch"
git push origin <CURRENT_BRANCH>

# after the feature is complete, toss a PR over to this repo
```

## Installation

Ensure [nodejs](https://nodejs.org/en/), [npm](https://www.npmjs.com/get-npm) and [yarn](https://classic.yarnpkg.com/en/docs/install/) are properly installed and configured. Clone the forked repository, and run the following commands:

```bash
cd weatherdb
yarn
yarn install:all
yarn dev
```

`yarn` will install the top level dependencies, and `yarn install:all` will install both backend and frontend dependencies. `yarn dev` will run in development mode.

## The Team

|               **Andrew Garmon**               |                                                                      **Aaron Leopold**                                                                      |               **George Kolasa**               |              **Octavio Ochoa**               |
| :-------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------: | :------------------------------------------: |
| [![Andrew Garmon]()](https://github.com/TODO) | [![Aaron Leopold](https://avatars3.githubusercontent.com/u/36278431?s=400&u=e081a3c4c5721096cfff9a7f8399eeeee0026338&v=4)](https://github.com/aaronleopold) | [![George Kolasa]()](https://github.com/TODO) | [![Octavio Ochoa]()](http://github.com/TODO) |
|              ` github.com/TODO`               |                                                                 ` github.com/aaronleopold`                                                                  |              ` github.com/TODO`               |              ` github.com/TODO`              |

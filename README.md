# Build


To build this project please use node version >=5. Then install dependencies:

    $ npm install

# Start the site

To start the site please run

    $ npm start

This will run the site locally at http://localhost:3000

Customer IDs are provided in Query Strings, so customers can be identified

    http://localhost:3000?customerID=1
    http://localhost:3000?customerID=2
    http://localhost:3000?customerID=3

# BDD / Functional tests

Test location:

    bdd-tests/

These tests are run using Selenium and WebdriverIO. This requires the hosting machine to have JDK 8 installed.

The following gulp task will install selenium and spin up tests.

    $ npm browser-test

# TDD / Jest

Test location:

    tdd-tests/

TDD tests are provided by Jest and can be run using the following command:

    $ npm test

Jest is written in ES2015 and will need to following packages installed to compliment the .babelrc file

    npm install babel-preset-stage-0
    npm install babel-preset-es2015

# InuitCSS / Sass

If you wish to build Sass with the provided CSS framework navigate to:

    public/build/styles

and run:

    $ npm install

to grab required dependencies.

The following command will compile the Sass from the main directory:

    $ gulp sass

# Build JavaScript modules

If you wish to build the modules in the application, user browserify:

    $ browserify public/scripts/main.js > public/scripts/app.js

# Compress JavaScript

If you wish to build and compress run the following command

    $ gulp compress

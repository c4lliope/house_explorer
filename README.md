# *House* Coding Challenge

This codebase includes a response to the coding challenge
issued by the House of Representatives' Clerk's office.
Namely, building an application to display API records
of members and roll call votes for the 117th congress.

My goals are to build up in iterations a program to explore the records,
mixing and matching as the user pleases.
To accomplish this goal I will use libraries I am experienced with, including:

* [React](https://reactjs.org/)
* styled-components
* Mobx

The program will pull records from the recommended API channels,
plus some additional sources:

* `clerkapi.azure-api.net/Members/v1/...`
* `clerkapi.azure-api.net/Votes/v1/...`
* `congress.gov/img/member/...`

## Goals

* Secure code
  * No recorded API key in the public codebase. (use `.env` file and ask in-app)
* Dense display of records
  * Add a couple of visualizations to ease exploration
    * one mini, dense, high-level graph displaying summary of roll calls
    * one per-member table to see individuals' voting records.
  * Use a datatable, such as `react-table` or `react-data-grid` packages.
  * Display member images from `congress.gov`. (Check: any XSS restrictions? no)
  * Optionally group members by party and caucus affiliation, display breakdown.

> Early designs

![early designs](./images/early_designs.svg =400x600)

## Build Schedule

* Preamble (Day 0)
  * Read challenge.
  * Begin producing README, decide on goals.
  * Begin designing program.
  * Launch codebase; run `create-react-app` and add dependencies.

## Commands

You can run:

* `yarn start`

> Runs the app in the development mode.\
> Open [http://localhost:3000](http://localhost:3000) to view it in the
> browser.

> The page will reload if you make edits.\
> You will also see any lint errors in the console.

* `yarn test`

> Launches the test runner in the interactive watch mode.\
> See the section about [running
> tests](https://facebook.github.io/create-react-app/docs/running-tests) for
> more information.

* `yarn build`

> Builds the app for production to the `build` folder.\
> It correctly bundles React in production mode and optimizes the build for the
> best performance.

> The build is minified and the filenames include the hashes.\
> Your app is ready to be deployed!

> See the section about
> [deployment](https://facebook.github.io/create-react-app/docs/deployment) for
> more information.

* `yarn eject`

> **Note: this is a one-way operation. Once you `eject`, you can’t go back!**

> If you aren’t satisfied with the build tool and configuration choices, you
> can `eject` at any time. This command will remove the single build dependency
> from your project.

> Instead, it will copy all the configuration files and the transitive
> dependencies (webpack, Babel, ESLint, etc) right into your project so you
> have full control over them. All of the commands except `eject` will still
> work, but they will point to the copied scripts so you can tweak them. At
> this point you’re on your own.

> You don’t have to ever use `eject`. The curated feature set is suitable for
> small and middle deployments, and you shouldn’t feel obligated to use this
> feature. However we understand that this tool wouldn’t be useful if you
> couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

* [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
* [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
* [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
* [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
* [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
* [`yarn build` fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

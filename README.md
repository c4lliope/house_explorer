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
  * Display member images from `congress.gov`. (Check: any XSS restrictions?)
  * Optionally group members by party and caucus affiliation, display breakdown.

> Early designs

![early designs](./images/early_designs.svg =400x600)

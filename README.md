# FRNDSAPP

## CONTENTS OF THIS FILE

---

- Introduction
- Tech Stack
- Prerequisites
- Quick Start
- Assumpitons
- Modifying mock data
- File Organization

## INTRODUCTION

---

The FrndsApp module displays the age demographics of the an user's friends.
The app lets an anonymous user to

- To reqister / update / delete a basic profile of an user (i.e. name, age, weight).
- Add / Update other registered users as friends.

## TECH STACK

---

The workspace for this project was generated using [Nx](https://nx.dev/).
The project is written in [Angular](https://angular.io/) v12 framework. The other tech stack for the project are listed below:

- Styling -- Angular Material and Tailwind CSS.
- Asynchronous & event-based programs -- RxJs.
- Global state management -- NgRx.
- Charts -- D3.js
- Unit Testing -- Jest.
- End-to-End Testing -- Cypress.
- Linting -- ESlint, Prettier, Husky
- Versioning -- Standard Version

## PREREQUISITES

---

Install Node 14.

- Install Node and NPM on Windows / Linux / Mac. (https://nodejs.org/en/download/)

Global install of the latest Angular CLI release

- Run `npm install -g @angular/cli`

## QUICK START

---

Clone the repo from github

- Run `git clone https://github.com/athypar01/takeHome` from the CLI

Change directory

- Run `cd secureworks` from the CLI

Install the repo with npm

- Run `npm install` from the CLI

Start the server in local

- Run `npm run start` from the CLI

Build production build

- Run `npm run build` from the CLI

Run unit tests

- Run `nx run-many --target=test --all=true` from the CLI to run all unit tests.

Run end-to-end tests

- Run `nx run-many --target=e2e --all=true` from the CLI to run all end-to-end tests.

## ASSUMPTIONS

---

The following assumpitons were made to the form fields

- Name

  - Name is a required field
  - Name will be a minimum of 2 character and a max of 30 characters
  - Name will be not start or end with special characters
  - Name will not have special characters
  - Name will not contain numbers

- Age

  - Age is a required field
  - Age will be numeric
  - Min Age is 1 and Max Age is 999

- Weight

  - Weight is a required field
  - Weight will be numeric
  - Min weight is 1 and max weight is 9999

- Friends
  - Friends are not a required field
  - API will send friends' list as an array of ID strings
  - UI will drive the business logic of mapping the friends' data from the incoming ID diels.

## MODIFYING MOCK DATA

---

To modify the initial data load, modify the below file

- [data.ts](libs/mock-api-data/src/lib/user-list/data.ts)

## FILE ORGANIZATION

---

The primary app is triggered from the apps folder within the friends-profile folder. The app is a shell that calls the lib module.

The test coverage of the app and feature modules are grouped under the coverage folder.

Feature and reusabled modules are grouped under the libs folder. Some of the feature modules within this project are

- Confirmation Component -- A notification modal to alert the user actions.
- Icons -- A module to display material-icons & non-material icons in the component
- Layout -- A container module to control the layout of the application
- Mock-api-data -- A module that holds mock-data to demonstrate the POC for the application.
- Mock-api-requests -- A module to mock the GET, POST, PUT, DELETE API requests.
- Shared Folder - Global folder for the assets, styles, and environment.
- User -- Core module for this application that CRUD operation of the frndsApp.

* root
  - [README.md](README.md)
  - [angular.json](angular.json)
  - **apps**
    - **friends\-profile**
      - [jest.config.js](apps/friends-profile/jest.config.js)
      - **src**
        - **app**
          - [app.component.html](apps/friends-profile/src/app/app.component.html)
          - [app.component.scss](apps/friends-profile/src/app/app.component.scss)
          - [app.component.spec.ts](apps/friends-profile/src/app/app.component.spec.ts)
          - [app.component.ts](apps/friends-profile/src/app/app.component.ts)
          - [app.module.ts](apps/friends-profile/src/app/app.module.ts)
          - [app.routing.ts](apps/friends-profile/src/app/app.routing.ts)
        - [index.html](apps/friends-profile/src/index.html)
        - [main.ts](apps/friends-profile/src/main.ts)
        - [polyfills.ts](apps/friends-profile/src/polyfills.ts)
        - [test\-setup.ts](apps/friends-profile/src/test-setup.ts)
      - [tsconfig.app.json](apps/friends-profile/tsconfig.app.json)
      - [tsconfig.editor.json](apps/friends-profile/tsconfig.editor.json)
      - [tsconfig.json](apps/friends-profile/tsconfig.json)
      - [tsconfig.spec.json](apps/friends-profile/tsconfig.spec.json)
    - **friends\-profile\-e2e**
      - [cypress.json](apps/friends-profile-e2e/cypress.json)
      - **src**
        - **fixtures**
          - [example.json](apps/friends-profile-e2e/src/fixtures/example.json)
        - **integration**
          - [app.spec.ts](apps/friends-profile-e2e/src/integration/app.spec.ts)
        - **support**
          - [app.po.ts](apps/friends-profile-e2e/src/support/app.po.ts)
          - [commands.ts](apps/friends-profile-e2e/src/support/commands.ts)
          - [index.ts](apps/friends-profile-e2e/src/support/index.ts)
      - [tsconfig.json](apps/friends-profile-e2e/tsconfig.json)
  - [commitlint.config.js](commitlint.config.js)
  - **coverage**
    - **libs**
      - **mock\-api\-data**
        - [base.css](coverage/libs/mock-api-data/base.css)
        - [block\-navigation.js](coverage/libs/mock-api-data/block-navigation.js)
        - [favicon.png](coverage/libs/mock-api-data/favicon.png)
        - [index.html](coverage/libs/mock-api-data/index.html)
        - [prettify.css](coverage/libs/mock-api-data/prettify.css)
        - [prettify.js](coverage/libs/mock-api-data/prettify.js)
        - [sort\-arrow\-sprite.png](coverage/libs/mock-api-data/sort-arrow-sprite.png)
        - [sorter.js](coverage/libs/mock-api-data/sorter.js)
      - **user**
        - **+state**
          - [index.html](coverage/libs/mock-api-data/user/+state/index.html)
          - [users.actions.ts.html](coverage/libs/mock-api-data/user/+state/users.actions.ts.html)
          - [users.effects.ts.html](coverage/libs/mock-api-data/user/+state/users.effects.ts.html)
          - [users.reducer.ts.html](coverage/libs/mock-api-data/user/+state/users.reducer.ts.html)
          - [users.selectors.ts.html](coverage/libs/mock-api-data/user/+state/users.selectors.ts.html)
        - **details**
          - [details.component.html.html](coverage/libs/mock-api-data/user/details/details.component.html.html)
          - [details.component.ts.html](coverage/libs/mock-api-data/user/details/details.component.ts.html)
          - [index.html](coverage/libs/mock-api-data/user/details/index.html)
        - [index.html](coverage/libs/mock-api-data/user/index.html)
        - **list**
          - [index.html](coverage/libs/mock-api-data/user/list/index.html)
          - [list.component.html.html](coverage/libs/mock-api-data/user/list/list.component.html.html)
          - [list.component.ts.html](coverage/libs/mock-api-data/user/list/list.component.ts.html)
        - [user.component.html.html](coverage/libs/mock-api-data/user/user.component.html.html)
        - [user.component.ts.html](coverage/libs/mock-api-data/user/user.component.ts.html)
        - [user.guard.ts.html](coverage/libs/mock-api-data/user/user.guard.ts.html)
        - [user.resolver.ts.html](coverage/libs/mock-api-data/user/user.resolver.ts.html)
        - [user.service.ts.html](coverage/libs/mock-api-data/user/user.service.ts.html)
  - [decorate\-angular\-cli.js](decorate-angular-cli.js)
  - [jest.config.js](jest.config.js)
  - [jest.preset.js](jest.preset.js)
  - **libs**
    - **components**
      - **confirmation**
        - [README.md](libs/components/confirmation/README.md)
        - [jest.config.js](libs/components/confirmation/jest.config.js)
        - **src**
          - [index.ts](libs/components/confirmation/src/index.ts)
          - **lib**
            - [confirmation.module.ts](libs/components/confirmation/src/lib/confirmation.module.ts)
            - [confirmation.service.spec.ts](libs/components/confirmation/src/lib/confirmation.service.spec.ts)
            - [confirmation.service.ts](libs/components/confirmation/src/lib/confirmation.service.ts)
            - [confirmation.types.ts](libs/components/confirmation/src/lib/confirmation.types.ts)
            - **dialog**
              - [dialog.component.html](libs/components/confirmation/src/lib/dialog/dialog.component.html)
              - [dialog.component.spec.ts](libs/components/confirmation/src/lib/dialog/dialog.component.spec.ts)
              - [dialog.component.ts](libs/components/confirmation/src/lib/dialog/dialog.component.ts)
          - [test\-setup.ts](libs/components/confirmation/src/test-setup.ts)
        - [tsconfig.json](libs/components/confirmation/tsconfig.json)
        - [tsconfig.lib.json](libs/components/confirmation/tsconfig.lib.json)
        - [tsconfig.spec.json](libs/components/confirmation/tsconfig.spec.json)
    - **icons**
      - [README.md](libs/icons/README.md)
      - [jest.config.js](libs/icons/jest.config.js)
      - **src**
        - [index.ts](libs/icons/src/index.ts)
        - **lib**
          - [icons.module.ts](libs/icons/src/lib/icons.module.ts)
        - [test\-setup.ts](libs/icons/src/test-setup.ts)
      - [tsconfig.json](libs/icons/tsconfig.json)
      - [tsconfig.lib.json](libs/icons/tsconfig.lib.json)
      - [tsconfig.spec.json](libs/icons/tsconfig.spec.json)
    - **layout**
      - [README.md](libs/layout/README.md)
      - [jest.config.js](libs/layout/jest.config.js)
      - **src**
        - [index.ts](libs/layout/src/index.ts)
        - **lib**
          - **layout**
            - [layout.component.html](libs/layout/src/lib/layout/layout.component.html)
            - [layout.component.scss](libs/layout/src/lib/layout/layout.component.scss)
            - [layout.component.spec.ts](libs/layout/src/lib/layout/layout.component.spec.ts)
            - [layout.component.ts](libs/layout/src/lib/layout/layout.component.ts)
            - [layout.module.ts](libs/layout/src/lib/layout/layout.module.ts)
        - [test\-setup.ts](libs/layout/src/test-setup.ts)
      - [tsconfig.json](libs/layout/tsconfig.json)
      - [tsconfig.lib.json](libs/layout/tsconfig.lib.json)
      - [tsconfig.spec.json](libs/layout/tsconfig.spec.json)
    - **mock\-api\-data**
      - [README.md](libs/mock-api-data/README.md)
      - [jest.config.js](libs/mock-api-data/jest.config.js)
      - **src**
        - [index.ts](libs/mock-api-data/src/index.ts)
        - **lib**
          - **user\-list**
            - [data.ts](libs/mock-api-data/src/lib/user-list/data.ts)
            - [user\-list\-mock\-api.spec.ts](libs/mock-api-data/src/lib/user-list/user-list-mock-api.spec.ts)
            - [user\-list\-mock\-api.ts](libs/mock-api-data/src/lib/user-list/user-list-mock-api.ts)
        - [test\-setup.ts](libs/mock-api-data/src/test-setup.ts)
      - [tsconfig.json](libs/mock-api-data/tsconfig.json)
      - [tsconfig.lib.json](libs/mock-api-data/tsconfig.lib.json)
      - [tsconfig.spec.json](libs/mock-api-data/tsconfig.spec.json)
    - **mock\-api\-requests**
      - [README.md](libs/mock-api-requests/README.md)
      - [jest.config.js](libs/mock-api-requests/jest.config.js)
      - **src**
        - [index.ts](libs/mock-api-requests/src/index.ts)
        - **lib**
          - [mock\-api\-request\-handler.spec.ts](libs/mock-api-requests/src/lib/mock-api-request-handler.spec.ts)
          - [mock\-api\-request\-handler.ts](libs/mock-api-requests/src/lib/mock-api-request-handler.ts)
          - [mock\-api\-requests.interceptor.spec.ts](libs/mock-api-requests/src/lib/mock-api-requests.interceptor.spec.ts)
          - [mock\-api\-requests.interceptor.ts](libs/mock-api-requests/src/lib/mock-api-requests.interceptor.ts)
          - [mock\-api\-requests.module.ts](libs/mock-api-requests/src/lib/mock-api-requests.module.ts)
          - [mock\-api\-requests.service.spec.ts](libs/mock-api-requests/src/lib/mock-api-requests.service.spec.ts)
          - [mock\-api\-requests.service.ts](libs/mock-api-requests/src/lib/mock-api-requests.service.ts)
          - [mock\-api\-requests.types.ts](libs/mock-api-requests/src/lib/mock-api-requests.types.ts)
        - [test\-setup.ts](libs/mock-api-requests/src/test-setup.ts)
      - [tsconfig.json](libs/mock-api-requests/tsconfig.json)
      - [tsconfig.lib.json](libs/mock-api-requests/tsconfig.lib.json)
      - [tsconfig.spec.json](libs/mock-api-requests/tsconfig.spec.json)
    - **shared**
      - **assets**
        - [README.md](libs/shared/assets/README.md)
        - [favicon.ico](libs/shared/assets/favicon.ico)
        - **icons**
          - [heroicons\-outline.svg](libs/shared/assets/icons/heroicons-outline.svg)
          - [heroicons\-solid.svg](libs/shared/assets/icons/heroicons-solid.svg)
          - [material\-twotone.svg](libs/shared/assets/icons/material-twotone.svg)
      - **environments**
        - [README.md](libs/shared/environments/README.md)
        - [jest.config.js](libs/shared/environments/jest.config.js)
        - **src**
          - [index.ts](libs/shared/environments/src/index.ts)
          - **lib**
            - [environment.prod.ts](libs/shared/environments/src/lib/environment.prod.ts)
            - [environment.ts](libs/shared/environments/src/lib/environment.ts)
          - [test\-setup.ts](libs/shared/environments/src/test-setup.ts)
        - [tsconfig.json](libs/shared/environments/tsconfig.json)
        - [tsconfig.lib.json](libs/shared/environments/tsconfig.lib.json)
        - [tsconfig.spec.json](libs/shared/environments/tsconfig.spec.json)
      - **styles**
        - [README.md](libs/shared/styles/README.md)
        - [\_global.scss](libs/shared/styles/_global.scss)
        - [index.scss](libs/shared/styles/index.scss)
        - **theme**
          - [\_overrides.scss](libs/shared/styles/theme/_overrides.scss)
          - [\_pallete.scss](libs/shared/styles/theme/_pallete.scss)
          - [\_tailwind.scss](libs/shared/styles/theme/_tailwind.scss)
    - **user**
      - [README.md](libs/user/README.md)
      - [jest.config.js](libs/user/jest.config.js)
      - **src**
        - [index.ts](libs/user/src/index.ts)
        - **lib**
          - **user**
            - **+state**
              - **actions**
                - [frnds\-query.actions.spec.ts](libs/user/src/lib/user/+state/actions/frnds-query.actions.spec.ts)
                - [frnds\-query.actions.ts](libs/user/src/lib/user/+state/actions/frnds-query.actions.ts)
                - [frnds_charts.actions.spec.ts](libs/user/src/lib/user/+state/actions/frnds_charts.actions.spec.ts)
                - [frnds_charts.actions.ts](libs/user/src/lib/user/+state/actions/frnds_charts.actions.ts)
                - [frnds_detail.actions.spec.ts](libs/user/src/lib/user/+state/actions/frnds_detail.actions.spec.ts)
                - [frnds_detail.actions.ts](libs/user/src/lib/user/+state/actions/frnds_detail.actions.ts)
                - [frnds_init.actions.spec.ts](libs/user/src/lib/user/+state/actions/frnds_init.actions.spec.ts)
                - [frnds_init.actions.ts](libs/user/src/lib/user/+state/actions/frnds_init.actions.ts)
                - [frnds_new_user.actions.spec.ts](libs/user/src/lib/user/+state/actions/frnds_new_user.actions.spec.ts)
                - [frnds_new_user.actions.ts](libs/user/src/lib/user/+state/actions/frnds_new_user.actions.ts)
                - [frnds_select_user.actions.ts](libs/user/src/lib/user/+state/actions/frnds_select_user.actions.ts)
              - **effects**
                - [frnds\-newuser.effects.ts](libs/user/src/lib/user/+state/effects/frnds-newuser.effects.ts)
                - [frnds\-query.effects.spec.ts](libs/user/src/lib/user/+state/effects/frnds-query.effects.spec.ts)
                - [frnds\-query.effects.ts](libs/user/src/lib/user/+state/effects/frnds-query.effects.ts)
                - [frnds\-selectuser.effects.ts](libs/user/src/lib/user/+state/effects/frnds-selectuser.effects.ts)
                - [frnds_init.effects.spec.ts](libs/user/src/lib/user/+state/effects/frnds_init.effects.spec.ts)
                - [frnds_init.effects.ts](libs/user/src/lib/user/+state/effects/frnds_init.effects.ts)
              - **reducers**
                - [frnds_app_init.reducer.spec.ts](libs/user/src/lib/user/+state/reducers/frnds_app_init.reducer.spec.ts)
                - [frnds_app_init.reducer.ts](libs/user/src/lib/user/+state/reducers/frnds_app_init.reducer.ts)
              - **selectors**
                - [frnds_app.selectors.ts](libs/user/src/lib/user/+state/selectors/frnds_app.selectors.ts)
            - **components**
              - **charts**
                - [charts.component.html](libs/user/src/lib/user/components/charts/charts.component.html)
                - [charts.component.scss](libs/user/src/lib/user/components/charts/charts.component.scss)
                - [charts.component.spec.ts](libs/user/src/lib/user/components/charts/charts.component.spec.ts)
                - [charts.component.ts](libs/user/src/lib/user/components/charts/charts.component.ts)
                - [data.interface.ts](libs/user/src/lib/user/components/charts/data.interface.ts)
                - [data.service.ts](libs/user/src/lib/user/components/charts/data.service.ts)
              - **details**
                - [details.component.html](libs/user/src/lib/user/components/details/details.component.html)
                - [details.component.spec.ts](libs/user/src/lib/user/components/details/details.component.spec.ts)
                - [details.component.ts](libs/user/src/lib/user/components/details/details.component.ts)
              - **list**
                - [list.component.html](libs/user/src/lib/user/components/list/list.component.html)
                - [list.component.spec.ts](libs/user/src/lib/user/components/list/list.component.spec.ts)
                - [list.component.ts](libs/user/src/lib/user/components/list/list.component.ts)
              - [user.component.html](libs/user/src/lib/user/components/user.component.html)
              - [user.component.spec.ts](libs/user/src/lib/user/components/user.component.spec.ts)
              - [user.component.ts](libs/user/src/lib/user/components/user.component.ts)
            - [frnds\-app.routing.ts](libs/user/src/lib/user/frnds-app.routing.ts)
            - [frnds_app.module.ts](libs/user/src/lib/user/frnds_app.module.ts)
            - **guards**
              - [user.guard.spec.ts](libs/user/src/lib/user/guards/user.guard.spec.ts)
              - [user.guard.ts](libs/user/src/lib/user/guards/user.guard.ts)
            - **services**
              - [frnds_app.service.spec.ts](libs/user/src/lib/user/services/frnds_app.service.spec.ts)
              - [frnds_app.service.ts](libs/user/src/lib/user/services/frnds_app.service.ts)
            - **types**
              - **actions**
                - [chart\-action.types.ts](libs/user/src/lib/user/types/actions/chart-action.types.ts)
                - [friends\-app\-action.types.ts](libs/user/src/lib/user/types/actions/friends-app-action.types.ts)
              - [frnds\-app\-state.interface.ts](libs/user/src/lib/user/types/frnds-app-state.interface.ts)
              - [request.interface.ts](libs/user/src/lib/user/types/request.interface.ts)
        - [test\-setup.ts](libs/user/src/test-setup.ts)
      - [tsconfig.json](libs/user/tsconfig.json)
      - [tsconfig.lib.json](libs/user/tsconfig.lib.json)
      - [tsconfig.spec.json](libs/user/tsconfig.spec.json)
  - [node_modules](node_modules)
  - [nx.json](nx.json)
  - [package\-lock.json](package-lock.json)
  - [package.json](package.json)
  - [tailwind.config.js](tailwind.config.js)
  - **tools**
    - **generators**
    - [tsconfig.tools.json](tools/tsconfig.tools.json)
  - [tsconfig.base.json](tsconfig.base.json)

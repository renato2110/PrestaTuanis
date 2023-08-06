# PrestaTuanis

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Certainly! Here's a concise `README.md` file that instructs other users on how to deploy the Angular application to GitHub Pages:

---

# Deployment Instructions for `prestaTuanis` to GitHub Pages

Follow these steps to deploy the `prestaTuanis` Angular application to GitHub Pages:

## 1. Prerequisites

Ensure you have the `angular-cli-ghpages` tool installed globally:

```bash
npm install -g angular-cli-ghpages
```

## 2. Update Git Remote URL (if required)

If you've regenerated your GitHub token or need to set the repository's remote URL with a new token, run the following command:

```bash
git remote set-url origin https://ghp_YOUR_TOKEN@github.com/mecanos28/prestaTuanis.git
```

Replace `YOUR_TOKEN` with your actual GitHub token.

## 3. Build the Angular Project

Build the Angular project for production with the correct configurations:

```bash
ng build --configuration production
```

This command generates the production-ready files in the `dist/presta-tuanis` directory.

## 4. Deploy to GitHub Pages

Use the `angular-cli-ghpages` tool to deploy the contents of the `dist/presta-tuanis` directory to GitHub Pages:

```bash
ngh --dir=dist/presta-tuanis -S
```

The `-S` flag ensures that the deployment is made to the repository's root. This is particularly useful if the repository is a project repository (as opposed to a user or organization pages repository).

## 5. Verify Deployment

After deploying, navigate to `https://mecanos28.github.io/prestaTuanis/` in your web browser to verify that the application is live and functioning correctly.

---

Save this content in a `README.md` file at the root of your project. Users can refer to it for deployment instructions.

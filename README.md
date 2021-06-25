## CONEECTA

1.  **MINIMUM REQUIREMENTES.**

    Node >= 10.14.1
    NPM >= 6.4.1

1.  **INSTALLATION.**

    Clone this repository. You will need node and npm installed globally on your machine.
    Once the repository is cloned run the next command from the root of the project.

    ```shell
    # Install all project dependencies
    npm install
    ```
1.  **SETUP.**

    Create the necessary .env files in the root directory of the project with the content below.

    **.env.development** file to work locally for development
    **.env.production** for production builds

    Fill each of them with the appropiate envars values for each environment.

    ```shell
    # URL to API. Eg. https://dev.coneecta.com/api
    GATSBY_API_URL=""
    # Specify the path if app is not served from the root web server directory
    # Eg. "/reservas"
    PATH_PREFIX=""
    # Specify the google api key
    GOOGLE_API_KEY=""
    ```

1.  **DEVELOPMENT.**

    ```shell
    # Start local server development
    npm start
    ```

    Visit the app on http://localhost:8000/

1.  **TEST.**

    ```shell
    # Run tests
    npm test
    ```

1.  **PRODUCTION.**

    ```shell
    # Build for production if app is served from root web server directory "/"
    npm run build
    # Build for production if app is served from a subdirectory web server
    npm run build -- --prefix-paths
    ```

    The build is done in /public directory

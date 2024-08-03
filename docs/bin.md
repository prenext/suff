## `bin` Folder Overview

The `bin` folder contains essential scripts for managing and setting up your project using the framework. These scripts include `init.mjs` for initializing a new project and `cli.mjs` for running various commands related to development, building, starting, and testing your application. Below is a detailed explanation of each script and how to use them.

### `init.mjs`

The `init.mjs` script is used to initialize a new project with the framework. This script sets up the project directory structure, installs necessary dependencies, and configures the project based on user inputs.

#### Usage

To initialize a new project, run the following command:

```bash
node bin/init.mjs [project-directory]
```

- `[project-directory]` (optional): Specify a directory where the new project will be created. If not provided, the current directory will be used.

#### Prompts

During initialization, you will be prompted to choose:

1. **Language**: Choose between JavaScript or TypeScript.
2. **Database**: Select the database of your choice (e.g., Mongoose or Prisma).

#### Outputs

- **Project Directory**: Sets up the project structure in the specified directory.
- **Dependencies**: Installs required packages (`express`, `dotenv`, etc.) and adds them as native dependencies (not appearing in the user's `package.json`).
- **Scripts**: Adds custom scripts to the `package.json` for building, starting, developing, and testing the project.

### `cli.mjs`

The `cli.mjs` script provides commands for managing your application. It handles building, starting, developing, and testing the application. This script ensures that the `.server` directory is created if it does not exist and manages the application environment based on `NODE_ENV`.

#### Usage

Run the following commands to manage your application:

```bash
node bin/cli.mjs build
node bin/cli.mjs start
node bin/cli.mjs dev
node bin/cli.mjs test
```

#### Commands

1. **`build`**: Builds the project by executing the main server file.
   - Ensures that the `.server` directory exists.
   - Runs the build process using Node.js.

2. **`start`**: Starts the project.
   - Ensures that the `.server` directory exists.
   - Sets up routes dynamically by importing route files from the `routes` directory.
   - Uses `node` or `ts-node` to run the server based on the language specified in `package.json`.

3. **`dev`**: Starts the project in development mode.
   - Ensures that the `.server` directory exists.
   - Sets up routes dynamically.
   - Uses `nodemon` to watch for file changes and restart the server automatically. Handles TypeScript using `ts-node` if needed.

4. **`test`**: Runs the tests defined in your project.
   - Executes the `npm test` command.

#### Environment Variable Handling

- **`NODE_ENV`**: The script checks the `NODE_ENV` environment variable to determine the environment (`development` or `production`). The routes directory is resolved relative to the base directory determined by this environment setting.

### Notes

- **Dynamic Route Setup**: The `cli.mjs` script imports route files dynamically based on the contents of the `routes` directory. It sets up middleware and routes by reading from files named `get.js`, `post.js`, etc., within each route folder.
- **Error Handling**: If the required directories or files are missing, appropriate error messages are displayed, and the script exits.

For any issues or further customization, please refer to the documentation or seek assistance from the framework's support channels.

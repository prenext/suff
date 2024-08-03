# suff

Welcome to `suff` – a powerful and flexible framework designed to streamline the creation of REST APIs with Node.js and Express. Whether you’re a beginner looking for a quick setup or an experienced developer seeking a customizable solution, `suff` simplifies the process of building and configuring your APIs.

## Overview

`suff` automates the setup of common backend components, so you can focus on developing your application instead of spending time on boilerplate code and configuration. With `suff`, you can choose your preferred language (TypeScript or JavaScript) and database (Mongoose or Prisma) during installation. The framework also provides a well-structured folder layout and integrates useful tools like `dotenv` for environment management and logging capabilities.

## Features

- **Choose Your Language:** Options for TypeScript or JavaScript.
- **Flexible Database Integration:** Supports Mongoose for MongoDB or Prisma for various databases.
- **Automatic Configuration:** Sets up Express, MongoDB, and other dependencies.
- **Structured Project Layout:** Creates folders for routes, controllers, models, utilities, and configuration.
- **Open Source:** Contribute and collaborate with the community.

## Project Structure

When you set up your project with `suff`, the following folder structure will be created:

```
my-api-project/
├── config/          # Configuration files (e.g., environment settings)
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Utility functions and helpers
├── .env             # Environment variables
├── package.json     # Project dependencies and scripts
├── tsconfig.json    # TypeScript configuration (if TypeScript is chosen)
├── index.js         # Entry point for the application
└── README.md        # Project documentation
```

## Installation and Usage

To get started with `suff`, follow these steps:

1. **Install the Framework:**

   Use `npx` to run the installation command:

   ```bash
   npx create-suff-server
   ```

   You'll be prompted to select your preferred language and database.

2. **Navigate to Your Project Directory:**

   ```bash
   cd my-api-project
   ```

3. **Start the Development Server:**

   Run the development server with:

   ```bash
   npm run dev
   ```

4. **Configure Your Environment:**

   Edit the `.env` file to set up your environment variables and database connection settings. Make sure to specify the `NODE_ENV` variable:

   ```env
   NODE_ENV=development
   ```

5. **Develop Your API:**

   - Define your routes in the `routes` folder.
   - Implement your business logic in the `controllers` folder.
   - Define your data models in the `models` folder.
   - Use utilities from the `utils` folder as needed.

## Configuration

- **Environment Configuration:**
  
  `suff` uses environment variables specified in the `.env` file. The `NODE_ENV` variable determines if the application is running in development mode or production mode, affecting the setup of routes and other configurations.

- **Commands:**

  The framework provides several commands to interact with your project:
  
  - **`create-suff-server`**: Initializes a new `suff` project.
  - **`suff`**: CLI tool with various commands:
    - `dev`: Starts the development server with `nodemon` for auto-reloading.
    - `build`: Builds the project for production.
    - `start`: Starts the project in production mode.
    - `test`: Runs tests for your project.

## Contributing

We welcome contributions from the community! If you’d like to help improve `suff`, please follow these guidelines:

- **Fork the Repository:** Create your own copy of the repository.
- **Clone Your Fork:** Clone your fork to your local machine.
- **Create a Branch:** Create a new branch for your changes.
- **Commit Your Changes:** Commit your changes with a clear message.
- **Push to GitHub:** Push your changes to your fork.
- **Open a Pull Request:** Submit a pull request with a description of your changes.

## License

`suff` is open source and available under the [MIT License](LICENSE).

## Contact

For any questions or feedback, please contact us at [mail@prenext.com].
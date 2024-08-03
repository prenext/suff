# `api-js` Documentation

Welcome to the `api-js` documentation! This guide will help you understand how to work with the `api-js` framework, set up your environment, and get started with building REST APIs.

## Introduction

`api-js` is a framework designed to simplify the process of creating REST APIs using Node.js and Express. It allows you to choose between different database options (like Mongoose or Prisma) and supports both JavaScript and TypeScript. The framework automates the setup of various configurations and provides a structured folder layout to organize your code efficiently.

## Table of Contents

- [`api-js` Documentation](#api-js-documentation)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Initial Configuration](#initial-configuration)
  - [Folder Structure](#folder-structure)
  - [Database Setup](#database-setup)
  - [Configuration Options](#configuration-options)
  - [Common Tasks](#common-tasks)
  - [Additional Resources](#additional-resources)

## Getting Started

To start using `api-js`, follow these steps:

1. **Installation**: Use the CLI tool to initialize a new project. It will guide you through the setup process.
2. **Project Structure**: Understand the default folder structure created by the framework.
3. **Run Your Server**: Learn how to start your server and make sure everything is working correctly.

## Initial Configuration

After installing `api-js`, you'll need to configure your project. Here’s what you should do:

1. **Environment Variables**: Set up your `.env` file to configure environment-specific settings.
2. **Database Configuration**: Choose your database and configure it according to your preferences.

## Folder Structure

The default folder structure provided by `api-js` is designed to keep your code organized:

- `bin/`: CLI scripts for setting up and managing the project.
- `lib/`: Core logic, setup scripts, and utilities for the framework.
- `templates/`: Templates for JavaScript and TypeScript projects, including folders for configuration, controllers, models, routes, and utilities.

## Database Setup

`api-js` supports multiple databases. You can choose between Mongoose for MongoDB and Prisma for SQL databases. Follow the relevant setup guides:

- [Mongoose Setup](docs/mongoose-setup.md)
- [Prisma Setup](docs/prisma-setup.md)

## Configuration Options

Configure various aspects of your project through the `.env` file. This includes database settings, logging options, and more. For detailed configuration options, refer to:

- [Configuration Guide](docs/configuration.md)

## Common Tasks

Here are some common tasks you might perform with `api-js`:

- **Adding Routes**: Learn how to define and manage routes.
- **Creating Models**: Understand how to set up models and interact with your database.
- **Logging**: Set up and use logging for better debugging and monitoring.

## Additional Resources

For more detailed documentation, tutorials, and examples, visit the following resources:

- [API Documentation](docs/api-docs.md)
- [Getting Started Guide](docs/getting-started.md)
- [Contributing Guide](docs/contributing.md)

We hope this guide helps you get started with `api-js`. If you have any questions or need further assistance, feel free to reach out to the community or check out our [GitHub repository](https://github.com/your-username/api-js).

Happy coding!

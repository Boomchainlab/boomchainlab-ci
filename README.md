# boomchainlab-ci

## Overview

`boomchainlab-ci` is a custom CI/CD module built with the Dagger CI platform using the TypeScript SDK. This repository aims to streamline the CI pipeline with modular, production-grade stages, including linting, testing, Docker builds, deployment triggers, and more. It is designed to facilitate continuous integration and delivery for projects within the Boomchainlab ecosystem.

### Key Features:
- **Modular Pipeline Stages**: The CI pipeline is split into reusable, modular stages, such as:
  - **Linting**: Runs ESLint for static code analysis.
  - **Testing**: Runs unit and integration tests across different environments.
  - **Docker Build & Publish**: Automates the building and publishing of Docker images.
  - **Deployment Triggers**: Supports deployment triggers for platforms like Vercel, Render, etc.
- **TypeScript SDK**: Fully written in TypeScript to leverage modern tooling and type safety.
- **Customizable**: Easily adaptable to various use cases and environments.
- **Optimized for Boomchainlab Projects**: Specifically tailored for seamless integration with repositories in the Boomchainlab ecosystem.

## Installation

To use this module in your CI pipeline, you can either integrate it as part of your project repository or run it as a standalone CI tool. 

### Prerequisites:
- **Node.js** (v16+)
- **Docker** (for Docker-related stages)
- **Dagger CI**: You need an active Dagger account and a running Dagger instance for deploying CI pipelines.

### Steps to Install:

1. Clone the repository:
   ```bash
   git clone https://github.com/Boomchainlab/boomchainlab-ci.git
   cd boomchainlab-ci

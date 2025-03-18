# Portfolio Deployment Guide

This guide explains how to deploy the portfolio application using Docker and Portainer.

## Prerequisites

- Docker and Docker Compose installed on your server
- Access to Portainer

## Deployment Steps

### Option 1: Using Docker Compose

1. Copy all project files to your server
2. Navigate to the project directory
3. Build and start the container:
   ```bash
   docker-compose up -d
   ```
4. The application will be available at http://your-server-ip:8080

### Option 2: Using Portainer

1. Copy all project files to your server
2. In Portainer, navigate to Stacks
3. Click "Add stack"
4. Give your stack a name (e.g., "momo-portfolio")
5. Upload the docker-compose.yml file or paste its contents
6. Click "Deploy the stack"
7. The application will be available at http://your-server-ip:8080

## Configuration

- To change the port, edit the `ports` section in the docker-compose.yml file
- The default configuration uses port 8080, but you can change it to any available port

## Troubleshooting

- If the site doesn't appear, check if the container is running:
  ```bash
  docker ps
  ```
- To view logs:
  ```bash
  docker logs momo-portfolio
  ```
- If you make changes to the application, rebuild the Docker image:
  ```bash
  docker-compose up -d --build
  ```

## Security Considerations

- Consider adding HTTPS by configuring a reverse proxy like Traefik or Nginx
- Review your Nginx configuration for security best practices
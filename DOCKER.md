# Docker Setup for Square UI

This setup allows you to run all Square UI templates in Docker containers.

## Quick Start

### Run all templates

```bash
docker-compose up -d
```

This will start:
- **Home** (Gallery): http://localhost:3000
- **Calendar**: http://localhost:3001
- **Chat**: http://localhost:3002
- **Emails**: http://localhost:3003
- **Dashboard**: http://localhost:3004
- **Task Management**: http://localhost:3005
- **Projects Timeline**: http://localhost:3006

### Run specific templates

```bash
# Run only the home gallery
docker-compose up -d square-ui-home

# Run only the chat template
docker-compose up -d square-ui-chat

# Run multiple specific templates
docker-compose up -d square-ui-home square-ui-chat square-ui-calendar
```

### Stop all containers

```bash
docker-compose down
```

### View logs

```bash
# All containers
docker-compose logs -f

# Specific container
docker logs -f square-ui-chat
```

### Rebuild after changes

```bash
# Rebuild all
docker-compose build --no-cache

# Rebuild specific template
docker-compose build --no-cache square-ui-chat

# Rebuild and restart
docker-compose up -d --build
```

## Template Ports

| Template           | Port | URL                      |
|--------------------|------|--------------------------|
| Home (Gallery)     | 3000 | http://localhost:3000    |
| Calendar           | 3001 | http://localhost:3001    |
| Chat               | 3002 | http://localhost:3002    |
| Emails             | 3003 | http://localhost:3003    |
| Dashboard          | 3004 | http://localhost:3004    |
| Task Management    | 3005 | http://localhost:3005    |
| Projects Timeline  | 3006 | http://localhost:3006    |

## Development

For development without Docker, use the individual template directories:

```bash
# Calendar
cd templates/calendar
npm install
npm run dev

# Chat
cd templates/chat
npm install
npm run dev

# etc...
```

Each template runs on port 3000 by default in development mode.

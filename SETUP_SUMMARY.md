# Square UI - Template Selector Setup

## What's New

I've set up a complete template selector system for Square UI with Docker support. Here's what's been implemented:

### 1. Template Gallery Page (`/templates`)
- Created a new page at `/templates` that displays all available templates in a beautiful grid layout
- Each template card shows:
  - Preview image
  - Template name and icon
  - Description
  - Designer credit
  - Live demo button (links to the running container)
  - GitHub link

### 2. Templates Button on Home Page
- Added a floating "View All Templates" button on the home page
- Located in the bottom-right corner for easy access
- Links directly to the template gallery

### 3. Docker Setup for All Templates
- Updated `docker-compose.yml` to run all templates simultaneously
- Each template runs on its own port:
  - **Home (Gallery)**: Port 3000 - http://localhost:3000
  - **Calendar**: Port 3001 - http://localhost:3001
  - **Chat**: Port 3002 - http://localhost:3002
  - **Emails**: Port 3003 - http://localhost:3003
  - **Dashboard**: Port 3004 - http://localhost:3004
  - **Task Management**: Port 3005 - http://localhost:3005
  - **Projects Timeline**: Port 3006 - http://localhost:3006

### 4. Standalone Docker Build
- Created `Dockerfile.template` for building individual templates
- Updated all template `next.config.ts` files with `output: 'standalone'`
- Each template can be built and run independently

## How to Use

### Run All Templates
```bash
docker-compose up -d
```

### Run Specific Templates
```bash
# Just the home gallery
docker-compose up -d square-ui-home

# Home and Chat
docker-compose up -d square-ui-home square-ui-chat
```

### Access Templates
1. Go to http://localhost:3000 (home page)
2. Click "View All Templates" button
3. Click "Live Demo" on any template card
4. The template opens in a new tab on its dedicated port

## Files Modified/Created

### New Files
- `/home/src/components/template-selector.tsx` - Template selector component
- `/home/src/components/templates-button.tsx` - Floating button on home
- `/home/src/app/templates/page.tsx` - Template gallery page
- `/home/src/lib/utils.ts` - Utility functions (cn)
- `/Dockerfile.template` - Generic Dockerfile for templates
- `/DOCKER.md` - Docker documentation

### Modified Files
- `/docker-compose.yml` - Updated with all templates
- `/home/src/components/Layout.tsx` - Added templates button
- `/home/next.config.mjs` - Added standalone output
- `/templates/*/next.config.ts` - Added standalone output (all 6 templates)

## Next Steps

To start using the system:

```bash
# Build all containers (first time or after changes)
docker-compose build

# Start all containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all containers
docker-compose down
```

Visit http://localhost:3000 to see the home page with the new "View All Templates" button!

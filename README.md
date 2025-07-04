# Inventory Management App

> A full-stack inventory management application featuring a Laravel API, MySQL database, and a ReactJS frontend. Built for continuous learning and practical experience with modern development tools.

## 🧰 Technologies Used

- PHP (Laravel)
- MySQL
- ReactJS
- Docker & Docker Compose

## 📦 Installation & Usage

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/) (optional, for convenience)

### Quick Setup

```bash
# Clone repo
git clone https://github.com/EltonBata/inventory-managment-app.git

cd ./inventory-managment-app

# Setup envs files
cp ./env.example ./env # mysql and others envs
cp ./api/.env.example ./api/.env.example # laravel api env

# Build Docker images and start containers
make setup      # Builds and starts all Docker images

# Run migrations
make migrate #or
make artisan migrate --seed
```

### Manual Docker Commands

```bash
# Start all services in detached mode
docker-compose up -d

# Stop all running containers
docker-compose down

# Build or rebuild services
docker-compose build
```

### Database & Artisan Commands

```bash
# Run fresh migrations and seed the database
make migrate

# Run any artisan command
make artisan <command>
```

### Composer & Bash Access

```bash
# Run any composer command inside the app container
make composer <command>

# Open a bash shell inside the app container
make bash
```


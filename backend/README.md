# Multiomic Data Orchestrator (MDO) - Backend

FastAPI backend for harmonizing and validating multiomic data.

## Overview

The MDO backend provides a RESTful API for:
- Uploading CSV files with multiomic data
- Mapping columns to canonical schema templates
- Harmonizing data into a standardized entity graph
- Validating data against defined rules
- Exporting harmonized data bundles

## Architecture

The backend follows a monolithic FastAPI architecture with clear separation of concerns:

- **API Layer** (`app/api/endpoints/`): REST endpoints
- **Service Layer** (`app/services/`): Business logic for harmonization, validation, and export
- **Data Layer** (`app/models/`): Pydantic models and MongoDB schemas
- **Core** (`app/core/`): Configuration and shared utilities
- **Database** (`app/db/`): MongoDB connection management

## Prerequisites

- Python 3.11 or higher
- MongoDB 4.4 or higher
- pip or poetry for dependency management

## Installation

1. **Create a virtual environment:**

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies:**

```bash
pip install -r requirements.txt
```

3. **Set up environment variables:**

Create a `.env` file in the backend directory:

```env
# MongoDB Configuration
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB_NAME=mdo_database

# Application Settings
DEBUG=True
APP_NAME=Multiomic Data Orchestrator
APP_VERSION=1.0.0

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# File Upload Settings
MAX_UPLOAD_SIZE=104857600  # 100MB in bytes
UPLOAD_DIR=./uploads
```

4. **Start MongoDB:**

Make sure MongoDB is running on your system:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Linux (systemd)
sudo systemctl start mongod

# Or run directly
mongod --dbpath /path/to/data/directory
```

## Running the Application

### Development Mode

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- API: http://localhost:8000
- Interactive API docs (Swagger): http://localhost:8000/docs
- Alternative API docs (ReDoc): http://localhost:8000/redoc

### Production Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Endpoints

### Health Check
- `GET /` - Root endpoint
- `GET /health` - Health check

### Runs
- `POST /api/v1/runs` - Create a new harmonization run
- `GET /api/v1/runs/{run_id}` - Get run details
- `POST /api/v1/runs/{run_id}/files` - Upload a file
- `POST /api/v1/runs/{run_id}/mapping` - Set column mapping
- `GET /api/v1/runs/{run_id}/mapping` - Get column mapping
- `POST /api/v1/runs/{run_id}/harmonize` - Trigger harmonization
- `GET /api/v1/runs/{run_id}/validation` - Get validation results
- `GET /api/v1/runs/{run_id}/export` - Export data bundle

### Schemas
- `GET /api/v1/schemas` - List available schema templates
- `GET /api/v1/schemas/{schema_id}` - Get schema template details

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── api/
│   │   ├── __init__.py
│   │   └── endpoints/
│   │       ├── __init__.py
│   │       ├── runs.py         # Run management endpoints
│   │       └── schemas.py      # Schema template endpoints
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py           # Configuration management
│   ├── db/
│   │   ├── __init__.py
│   │   └── database.py         # MongoDB connection
│   ├── models/
│   │   ├── __init__.py
│   │   └── run.py              # Pydantic models
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── templates/          # Schema template JSON files
│   └── services/
│       ├── __init__.py
│       ├── harmonization.py    # Harmonization logic
│       ├── validation.py       # Validation rules engine
│       └── export.py           # Data export logic
├── tests/                      # Test files
├── .env                        # Environment variables (not in git)
├── .gitignore
├── requirements.txt
└── README.md
```

## MongoDB Collections

The application uses the following MongoDB collections:

- **runs**: Harmonization run metadata
- **uploaded_files**: File upload metadata
- **mappings**: Column mapping configurations
- **validation_results**: Validation results and errors
- **audit_logs**: Audit trail
- **canonical_entities**: Harmonized entity data

## Development

### Running Tests

```bash
pytest
```

### Code Quality

```bash
# Format code
black app/

# Lint code
flake8 app/

# Type checking
mypy app/
```

## Entity Hierarchy

The canonical data model follows this hierarchy:

```
Block → Slide → ROI/FOV → Library → Run
```

Each entity type has specific fields and relationships that are validated during harmonization.

## Next Steps

1. Implement file upload handling with storage
2. Complete harmonization service logic
3. Implement validation rules engine
4. Add schema template JSON files
5. Implement export functionality
6. Add comprehensive tests
7. Add authentication and authorization
8. Add rate limiting and security headers
9. Set up logging and monitoring
10. Create Docker configuration

## Contributing

Please follow these guidelines:
- Use type hints for all function parameters and return values
- Write docstrings for all public functions and classes
- Add tests for new features
- Follow PEP 8 style guidelines
- Use async/await for all database operations

## License

[Add license information]
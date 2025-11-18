"""
Main FastAPI application for Multiomic Data Orchestrator (MDO).
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.db.database import connect_to_mongo, close_mongo_connection
from app.api.endpoints import runs, schemas


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for startup and shutdown events.
    """
    # Startup
    await connect_to_mongo()
    yield
    # Shutdown
    await close_mongo_connection()


# Initialize FastAPI app
app = FastAPI(
    title="Multiomic Data Orchestrator API",
    description="Backend API for harmonizing and validating multiomic data",
    version="1.0.0",
    lifespan=lifespan,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(runs.router, prefix="/api/v1/runs", tags=["runs"])
app.include_router(schemas.router, prefix="/api/v1/schemas", tags=["schemas"])


@app.get("/")
async def root():
    """
    Root endpoint for health check.
    """
    return {
        "message": "Multiomic Data Orchestrator API",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/health")
async def health_check():
    """
    Health check endpoint.
    """
    return {"status": "healthy"}
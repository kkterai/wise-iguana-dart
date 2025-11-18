"""
MongoDB database connection and utilities using Motor (async driver).
"""
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from typing import Optional

from app.core.config import settings


class Database:
    """
    Database connection manager.
    """
    client: Optional[AsyncIOMotorClient] = None
    db: Optional[AsyncIOMotorDatabase] = None


db = Database()


async def connect_to_mongo() -> None:
    """
    Connect to MongoDB on application startup.
    """
    print(f"Connecting to MongoDB at {settings.MONGODB_URL}...")
    db.client = AsyncIOMotorClient(settings.MONGODB_URL)
    db.db = db.client[settings.MONGODB_DB_NAME]
    print(f"Connected to MongoDB database: {settings.MONGODB_DB_NAME}")


async def close_mongo_connection() -> None:
    """
    Close MongoDB connection on application shutdown.
    """
    if db.client:
        print("Closing MongoDB connection...")
        db.client.close()
        print("MongoDB connection closed")


def get_database() -> AsyncIOMotorDatabase:
    """
    Get the database instance.
    
    Returns:
        AsyncIOMotorDatabase: The MongoDB database instance
    """
    if db.db is None:
        raise RuntimeError("Database not initialized. Call connect_to_mongo() first.")
    return db.db


# Collection names
COLLECTIONS = {
    "runs": "runs",
    "uploaded_files": "uploaded_files",
    "mappings": "mappings",
    "validation_results": "validation_results",
    "audit_logs": "audit_logs",
    "canonical_entities": "canonical_entities",
}
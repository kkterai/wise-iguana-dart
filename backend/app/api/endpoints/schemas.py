"""
API endpoints for managing schema templates.
"""
from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
import json
import os
from pathlib import Path


router = APIRouter()


@router.get("/", response_model=List[Dict[str, Any]])
async def list_schemas():
    """
    Get a list of available schema templates.
    
    Returns:
        List[Dict]: List of available schema templates with metadata
    """
    schemas_dir = Path(__file__).parent.parent.parent / "schemas" / "templates"
    
    if not schemas_dir.exists():
        return []
    
    schemas = []
    for schema_file in schemas_dir.glob("*.json"):
        try:
            with open(schema_file, "r") as f:
                schema_data = json.load(f)
                schemas.append({
                    "id": schema_data.get("id"),
                    "name": schema_data.get("name"),
                    "version": schema_data.get("version"),
                    "description": schema_data.get("description", ""),
                })
        except Exception as e:
            print(f"Error loading schema {schema_file}: {e}")
            continue
    
    return schemas


@router.get("/{schema_id}", response_model=Dict[str, Any])
async def get_schema(schema_id: str):
    """
    Get a specific schema template by ID.
    
    Args:
        schema_id: The schema template ID
        
    Returns:
        Dict: The complete schema template
    """
    schemas_dir = Path(__file__).parent.parent.parent / "schemas" / "templates"
    schema_file = schemas_dir / f"{schema_id}.json"
    
    if not schema_file.exists():
        raise HTTPException(status_code=404, detail=f"Schema '{schema_id}' not found")
    
    try:
        with open(schema_file, "r") as f:
            schema_data = json.load(f)
            return schema_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading schema: {str(e)}")
"""
API endpoints for managing harmonization runs.
"""
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import List, Optional
from datetime import datetime

from app.db.database import get_database, COLLECTIONS
from app.models.run import Run, RunCreate, RunResponse, FileUploadResponse
from app.services.harmonization import HarmonizationService
from app.services.validation import ValidationService
from app.services.export import ExportService


router = APIRouter()


@router.post("/", response_model=RunResponse, status_code=201)
async def create_run(run_data: RunCreate):
    """
    Create a new harmonization run.
    
    Args:
        run_data: Run creation data including user_id
        
    Returns:
        RunResponse: Created run information
    """
    db = get_database()
    
    # Create new run document
    run_doc = {
        "user_id": run_data.user_id,
        "created_at": datetime.utcnow(),
        "status": "uploading",
        "files": [],
        "mapping_id": None,
        "validation_result_id": None,
    }
    
    result = await db[COLLECTIONS["runs"]].insert_one(run_doc)
    run_doc["_id"] = result.inserted_id
    
    return RunResponse(**run_doc)


@router.get("/{run_id}", response_model=RunResponse)
async def get_run(run_id: str):
    """
    Get a specific run by ID.
    
    Args:
        run_id: The run ID
        
    Returns:
        RunResponse: Run information
    """
    db = get_database()
    
    # TODO: Implement ObjectId conversion and query
    raise HTTPException(status_code=501, detail="Not implemented yet")


@router.post("/{run_id}/files", response_model=FileUploadResponse)
async def upload_file(
    run_id: str,
    file: UploadFile = File(...),
    schema_template_id: str = Form(...)
):
    """
    Upload a file for a specific run.
    
    Args:
        run_id: The run ID
        file: The uploaded file
        schema_template_id: The schema template to use for this file
        
    Returns:
        FileUploadResponse: Upload confirmation with file metadata
    """
    # TODO: Implement file upload logic
    raise HTTPException(status_code=501, detail="Not implemented yet")


@router.post("/{run_id}/mapping")
async def set_mapping(run_id: str):
    """
    Set the column mapping for a run.
    
    Args:
        run_id: The run ID
        
    Returns:
        dict: Confirmation message
    """
    # TODO: Implement mapping logic
    raise HTTPException(status_code=501, detail="Not implemented yet")


@router.get("/{run_id}/mapping")
async def get_mapping(run_id: str):
    """
    Get the column mapping for a run.
    
    Args:
        run_id: The run ID
        
    Returns:
        dict: Mapping information
    """
    # TODO: Implement get mapping logic
    raise HTTPException(status_code=501, detail="Not implemented yet")


@router.post("/{run_id}/harmonize")
async def harmonize_run(run_id: str):
    """
    Trigger the harmonization process for a run.
    
    Args:
        run_id: The run ID
        
    Returns:
        dict: Harmonization status
    """
    # TODO: Implement harmonization logic using HarmonizationService
    raise HTTPException(status_code=501, detail="Not implemented yet")


@router.get("/{run_id}/validation")
async def get_validation_results(run_id: str):
    """
    Get validation results for a run.
    
    Args:
        run_id: The run ID
        
    Returns:
        dict: Validation results
    """
    # TODO: Implement validation results retrieval
    raise HTTPException(status_code=501, detail="Not implemented yet")


@router.get("/{run_id}/export")
async def export_run(run_id: str):
    """
    Export the harmonized data bundle for a run.
    
    Args:
        run_id: The run ID
        
    Returns:
        FileResponse: The exported data bundle
    """
    # TODO: Implement export logic using ExportService
    raise HTTPException(status_code=501, detail="Not implemented yet")
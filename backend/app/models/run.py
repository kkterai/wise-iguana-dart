"""
Pydantic models for Run entities.
"""
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from bson import ObjectId


class PyObjectId(ObjectId):
    """
    Custom type for MongoDB ObjectId that works with Pydantic.
    """
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")


class RunCreate(BaseModel):
    """
    Model for creating a new run.
    """
    user_id: str = Field(..., description="User ID who created the run")


class RunResponse(BaseModel):
    """
    Model for run response data.
    """
    id: str = Field(alias="_id", description="Run ID")
    user_id: str = Field(..., description="User ID")
    created_at: datetime = Field(..., description="Creation timestamp")
    status: str = Field(..., description="Current status of the run")
    files: List[str] = Field(default_factory=list, description="List of file IDs")
    mapping_id: Optional[str] = Field(None, description="Mapping ID if set")
    validation_result_id: Optional[str] = Field(None, description="Validation result ID if available")

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class Run(BaseModel):
    """
    Internal model for Run document.
    """
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_id: str
    created_at: datetime
    status: str
    files: List[PyObjectId] = Field(default_factory=list)
    mapping_id: Optional[PyObjectId] = None
    validation_result_id: Optional[PyObjectId] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class FileUploadResponse(BaseModel):
    """
    Model for file upload response.
    """
    file_id: str = Field(..., description="Uploaded file ID")
    filename: str = Field(..., description="Original filename")
    schema_template_id: str = Field(..., description="Schema template used")
    created_at: datetime = Field(..., description="Upload timestamp")


class UploadedFile(BaseModel):
    """
    Internal model for uploaded file document.
    """
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    run_id: PyObjectId
    filename: str
    s3_path: str  # or local path for MVP
    schema_template_id: str
    created_at: datetime

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class Mapping(BaseModel):
    """
    Internal model for mapping document.
    """
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    user_id: str
    name: str
    schema_template_id: str
    mapping: dict  # {"canonical_field": "csv_column"}
    created_at: datetime

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class ValidationError(BaseModel):
    """
    Model for a single validation error.
    """
    file_id: str
    row_index: int
    column_name: str
    severity: str  # 'Blocker', 'Warning', 'Info'
    rule_id: str
    description: str


class ValidationResult(BaseModel):
    """
    Internal model for validation result document.
    """
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    run_id: PyObjectId
    status: str  # 'passed', 'failed'
    blocker_count: int = 0
    warning_count: int = 0
    info_count: int = 0
    errors: List[ValidationError] = Field(default_factory=list)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class CanonicalEntity(BaseModel):
    """
    Internal model for canonical entity document.
    """
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    run_id: PyObjectId
    entity_type: str  # 'Block', 'Slide', 'ROI', 'Library', 'Run'
    data: dict  # The harmonized data for the entity

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
"""
Export service for generating data bundles from harmonized data.
"""
from typing import Dict, List, Any, BinaryIO
import json
import zipfile
from io import BytesIO
from datetime import datetime
from bson import ObjectId

from app.db.database import get_database, COLLECTIONS


class ExportService:
    """
    Service for exporting harmonized data bundles.
    
    Exports include:
    - Canonical entity data (JSON)
    - Validation report
    - Metadata and audit trail
    """
    
    def __init__(self):
        self.db = None
    
    async def initialize(self):
        """Initialize database connection."""
        self.db = get_database()
    
    async def export_run(self, run_id: str) -> BytesIO:
        """
        Export a complete data bundle for a run.
        
        Args:
            run_id: The run ID to export
            
        Returns:
            BytesIO: ZIP file containing the data bundle
        """
        if not self.db:
            await self.initialize()
        
        # Create in-memory ZIP file
        zip_buffer = BytesIO()
        
        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            # TODO: Implement export logic
            # 1. Load run metadata
            # 2. Load all canonical entities
            # 3. Load validation results
            # 4. Generate manifest
            # 5. Add all files to ZIP
            
            # Add placeholder manifest
            manifest = {
                "run_id": run_id,
                "export_date": datetime.utcnow().isoformat(),
                "version": "1.0.0",
                "status": "not_implemented"
            }
            zip_file.writestr("manifest.json", json.dumps(manifest, indent=2))
        
        zip_buffer.seek(0)
        return zip_buffer
    
    async def export_entities(self, run_id: str) -> Dict[str, List[Dict[str, Any]]]:
        """
        Export canonical entities organized by type.
        
        Args:
            run_id: The run ID
            
        Returns:
            Dict mapping entity types to lists of entities
        """
        if not self.db:
            await self.initialize()
        
        # Query all entities for the run
        entities = await self.db[COLLECTIONS["canonical_entities"]].find(
            {"run_id": ObjectId(run_id)}
        ).to_list(length=None)
        
        # Organize by entity type
        organized = {
            "Block": [],
            "Slide": [],
            "ROI": [],
            "Library": [],
            "Run": []
        }
        
        for entity in entities:
            entity_type = entity.get("entity_type")
            if entity_type in organized:
                # Convert ObjectId to string for JSON serialization
                entity["_id"] = str(entity["_id"])
                entity["run_id"] = str(entity["run_id"])
                organized[entity_type].append(entity)
        
        return organized
    
    async def export_validation_report(self, run_id: str) -> Dict[str, Any]:
        """
        Export validation report for a run.
        
        Args:
            run_id: The run ID
            
        Returns:
            Dict containing validation report
        """
        if not self.db:
            await self.initialize()
        
        # Load validation results
        validation = await self.db[COLLECTIONS["validation_results"]].find_one(
            {"run_id": ObjectId(run_id)}
        )
        
        if not validation:
            return {
                "status": "no_validation",
                "message": "No validation results found for this run"
            }
        
        # Convert ObjectIds to strings
        validation["_id"] = str(validation["_id"])
        validation["run_id"] = str(validation["run_id"])
        
        return validation
    
    async def export_metadata(self, run_id: str) -> Dict[str, Any]:
        """
        Export run metadata and audit trail.
        
        Args:
            run_id: The run ID
            
        Returns:
            Dict containing metadata
        """
        if not self.db:
            await self.initialize()
        
        # Load run
        run = await self.db[COLLECTIONS["runs"]].find_one({"_id": ObjectId(run_id)})
        
        if not run:
            return {"error": "Run not found"}
        
        # Load audit logs
        audit_logs = await self.db[COLLECTIONS["audit_logs"]].find(
            {"run_id": ObjectId(run_id)}
        ).to_list(length=None)
        
        # Convert ObjectIds to strings
        run["_id"] = str(run["_id"])
        if run.get("mapping_id"):
            run["mapping_id"] = str(run["mapping_id"])
        if run.get("validation_result_id"):
            run["validation_result_id"] = str(run["validation_result_id"])
        run["files"] = [str(f) for f in run.get("files", [])]
        
        for log in audit_logs:
            log["_id"] = str(log["_id"])
            log["run_id"] = str(log["run_id"])
        
        return {
            "run": run,
            "audit_logs": audit_logs
        }
    
    def _generate_manifest(self, run_id: str, entities: Dict, validation: Dict, metadata: Dict) -> Dict[str, Any]:
        """
        Generate export manifest.
        
        Args:
            run_id: The run ID
            entities: Exported entities
            validation: Validation report
            metadata: Run metadata
            
        Returns:
            Dict containing manifest information
        """
        entity_counts = {k: len(v) for k, v in entities.items()}
        
        return {
            "run_id": run_id,
            "export_date": datetime.utcnow().isoformat(),
            "version": "1.0.0",
            "entity_counts": entity_counts,
            "validation_status": validation.get("status"),
            "files": [
                "manifest.json",
                "entities.json",
                "validation_report.json",
                "metadata.json"
            ]
        }
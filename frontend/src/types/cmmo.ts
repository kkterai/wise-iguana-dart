export type SeverityLevel = 'blocker' | 'warning' | 'info';

export interface ValidationIssue {
  id: string;
  severity: SeverityLevel;
  rule: string;
  message: string;
  row?: number;
  column?: string;
  value?: string;
  suggestion?: string;
}

export interface SchemaCandidate {
  name: string;
  version: string;
  confidence: number;
  rationale: string;
}

export interface FieldMapping {
  sourceField: string;
  targetField: string;
  confidence: number;
  required: boolean;
  mapped: boolean;
}

export interface EntityRelationship {
  from: string;
  to: string;
  type: string;
  valid: boolean;
}

export interface MetadataFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  rows: number;
  columns: number;
}

export interface HarmonizationSummary {
  totalRows: number;
  canonicalIds: {
    specimen: number;
    block: number;
    slide: number;
    roi: number;
    library: number;
    run: number;
  };
  relationships: EntityRelationship[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'complete' | 'error';
  canProgress: boolean;
}

export interface ExportBundle {
  canonicalTables: string[];
  joinIndex: string;
  mappingFile: string;
  validationReport: string;
  manifest: {
    schemaVersion: string;
    rulesetVersion: string;
    timestamp: string;
    hashes: Record<string, string>;
  };
}
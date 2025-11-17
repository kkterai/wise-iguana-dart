import { ValidationIssue, FieldMapping, HarmonizationSummary, MetadataFile } from '@/types/cmmo';

export const predefinedSchemas = [
  { id: 'cosmx-v1.2', name: 'CosMx Spatial Transcriptomics v1.2', vendor: 'NanoString' },
  { id: 'geomx-v2.0', name: 'GeoMx DSP v2.0', vendor: 'NanoString' },
  { id: 'visium-v1.5', name: 'Visium HD v1.5', vendor: '10x Genomics' },
  { id: 'illumina-run-v3.0', name: 'Illumina Sequencing Run v3.0', vendor: 'Illumina' },
  { id: 'xenium-v1.0', name: 'Xenium In Situ v1.0', vendor: '10x Genomics' }
];

export const mockFieldMappings: FieldMapping[] = [
  { sourceField: 'Sample_Name', targetField: 'Specimen_ID', confidence: 0.95, required: true, mapped: false },
  { sourceField: 'Block_Number', targetField: 'Block_ID', confidence: 0.88, required: true, mapped: false },
  { sourceField: 'Slide_Barcode', targetField: 'Slide_ID', confidence: 0.98, required: true, mapped: false },
  { sourceField: 'ROI', targetField: 'ROI_ID', confidence: 0.92, required: true, mapped: false },
  { sourceField: 'Library_Name', targetField: 'Library_ID', confidence: 0.85, required: true, mapped: false },
  { sourceField: 'Sequencing_Run', targetField: 'Run_ID', confidence: 0.90, required: true, mapped: false },
  { sourceField: 'Tissue_Type', targetField: 'Tissue_Type', confidence: 0.99, required: false, mapped: false },
  { sourceField: 'Collection_Date', targetField: 'Collection_Date', confidence: 0.87, required: false, mapped: false },
  { sourceField: 'Platform', targetField: 'Platform', confidence: 0.94, required: true, mapped: false },
  { sourceField: 'Chemistry_Version', targetField: 'Kit_Version', confidence: 0.72, required: false, mapped: false }
];

export const mockValidationIssues: ValidationIssue[] = [
  {
    id: 'B001',
    severity: 'blocker',
    rule: 'REF_INTEGRITY_001',
    message: 'Slide_ID "SLD-2024-0042" referenced in ROI table does not exist in Slide table',
    row: 127,
    column: 'Slide_ID',
    value: 'SLD-2024-0042',
    suggestion: 'Create missing Slide record or correct Slide_ID reference'
  },
  {
    id: 'B002',
    severity: 'blocker',
    rule: 'REQUIRED_FIELD_002',
    message: 'Required field "Block_ID" is empty',
    row: 89,
    column: 'Block_ID',
    value: '',
    suggestion: 'Provide valid Block_ID value'
  },
  {
    id: 'B003',
    severity: 'blocker',
    rule: 'FORMAT_003',
    message: 'Slide barcode format invalid - expected pattern: SLD-YYYY-####',
    row: 203,
    column: 'Slide_ID',
    value: 'SLIDE_042',
    suggestion: 'Reformat to: SLD-2024-0042'
  },
  {
    id: 'W001',
    severity: 'warning',
    rule: 'ENUM_VALIDATION_001',
    message: 'Tissue_Type value "FFPE Tumor" not in canonical enum - using synonym mapping',
    row: 45,
    column: 'Tissue_Type',
    value: 'FFPE Tumor',
    suggestion: 'Will normalize to: "FFPE_Tumor"'
  },
  {
    id: 'W002',
    severity: 'warning',
    rule: 'DATE_FORMAT_002',
    message: 'Date format inconsistent - found MM/DD/YYYY, expected ISO-8601',
    row: 156,
    column: 'Collection_Date',
    value: '03/15/2024',
    suggestion: 'Will normalize to: 2024-03-15'
  },
  {
    id: 'W003',
    severity: 'warning',
    rule: 'WHITESPACE_001',
    message: 'Leading/trailing whitespace detected',
    row: 78,
    column: 'Library_ID',
    value: ' LIB-2024-001 ',
    suggestion: 'Will trim to: "LIB-2024-001"'
  },
  {
    id: 'I001',
    severity: 'info',
    rule: 'OPTIONAL_FIELD_001',
    message: 'Optional field "Notes" is empty - this is acceptable',
    row: 12,
    column: 'Notes',
    value: ''
  },
  {
    id: 'I002',
    severity: 'info',
    rule: 'CASE_NORMALIZATION_001',
    message: 'Platform name will be normalized to canonical case',
    row: 234,
    column: 'Platform',
    value: 'cosmx',
    suggestion: 'Will normalize to: "CosMx"'
  }
];

export const mockHarmonization: HarmonizationSummary = {
  totalRows: 1247,
  canonicalIds: {
    specimen: 42,
    block: 38,
    slide: 156,
    roi: 892,
    library: 234,
    run: 12
  },
  relationships: [
    { from: 'Specimen', to: 'Block', type: 'has_many', valid: true },
    { from: 'Block', to: 'Slide', type: 'has_many', valid: true },
    { from: 'Slide', to: 'ROI', type: 'has_many', valid: true },
    { from: 'ROI', to: 'Library', type: 'has_many', valid: false },
    { from: 'Library', to: 'Run', type: 'belongs_to', valid: true }
  ]
};

export const mockUploadedFile: MetadataFile = {
  id: 'file-001',
  name: 'CosMx_Metadata_2024Q1.csv',
  size: 2847392,
  type: 'text/csv',
  uploadedAt: new Date('2024-01-15T10:30:00'),
  rows: 1247,
  columns: 18
};

export const mockUploadedColumns = [
  'Sample_Name',
  'Block_Number',
  'Slide_Barcode',
  'ROI',
  'Library_Name',
  'Sequencing_Run',
  'Tissue_Type',
  'Collection_Date',
  'Platform',
  'Chemistry_Version',
  'Operator',
  'Notes',
  'QC_Status',
  'Processing_Date',
  'Batch_ID',
  'Project_ID',
  'Institution',
  'Study_ID'
];

export const sampleTableData = [
  {
    Specimen_ID: 'SPEC-2024-001',
    Block_ID: 'BLK-2024-001',
    Slide_ID: 'SLD-2024-0001',
    ROI_ID: 'ROI-001',
    Library_ID: 'LIB-2024-001',
    Run_ID: 'RUN-2024-001',
    Tissue_Type: 'FFPE_Tumor',
    Platform: 'CosMx'
  },
  {
    Specimen_ID: 'SPEC-2024-001',
    Block_ID: 'BLK-2024-001',
    Slide_ID: 'SLD-2024-0001',
    ROI_ID: 'ROI-002',
    Library_ID: 'LIB-2024-002',
    Run_ID: 'RUN-2024-001',
    Tissue_Type: 'FFPE_Tumor',
    Platform: 'CosMx'
  },
  {
    Specimen_ID: 'SPEC-2024-002',
    Block_ID: 'BLK-2024-002',
    Slide_ID: 'SLD-2024-0002',
    ROI_ID: 'ROI-003',
    Library_ID: 'LIB-2024-003',
    Run_ID: 'RUN-2024-002',
    Tissue_Type: 'FFPE_Normal',
    Platform: 'Illumina'
  }
];
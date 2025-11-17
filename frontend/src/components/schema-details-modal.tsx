import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface SchemaDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schemaName: string;
  schemaVersion: string;
}

export const SchemaDetailsModal = ({ open, onOpenChange, schemaName, schemaVersion }: SchemaDetailsModalProps) => {
  const requiredFields = [
    { name: 'Specimen_ID', description: 'Unique identifier for biological specimen', type: 'string' },
    { name: 'Block_ID', description: 'FFPE block identifier', type: 'string' },
    { name: 'Slide_ID', description: 'Slide barcode or identifier', type: 'string' },
    { name: 'ROI_ID', description: 'Region of interest identifier', type: 'string' },
    { name: 'Library_ID', description: 'Library preparation identifier', type: 'string' },
    { name: 'Run_ID', description: 'Sequencing run identifier', type: 'string' }
  ];

  const optionalFields = [
    { name: 'Tissue_Type', description: 'Type of tissue (e.g., FFPE_Tumor, FFPE_Normal)', type: 'enum' },
    { name: 'Collection_Date', description: 'Date of specimen collection', type: 'date' },
    { name: 'Platform', description: 'Technology platform used', type: 'string' },
    { name: 'Kit_Version', description: 'Chemistry or kit version', type: 'string' }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{schemaName}</DialogTitle>
          <DialogDescription>
            Version {schemaVersion} - Canonical schema specification
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <h3 className="text-lg font-semibold mb-3">Required Fields</h3>
            <div className="space-y-3">
              {requiredFields.map((field, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-medium text-sm">{field.name}</span>
                    <Badge variant="destructive" className="text-xs">Required</Badge>
                    <Badge variant="outline" className="text-xs">{field.type}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{field.description}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Optional Fields</h3>
            <div className="space-y-3">
              {optionalFields.map((field, index) => (
                <div key={index} className="border rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-medium text-sm">{field.name}</span>
                    <Badge variant="secondary" className="text-xs">Optional</Badge>
                    <Badge variant="outline" className="text-xs">{field.type}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">{field.description}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-3">Validation Rules</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>All required fields must be present and non-empty</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Identifiers must follow canonical naming patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Referential integrity enforced across entity relationships</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Enum fields validated against canonical vocabularies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Date fields normalized to ISO-8601 format</span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
import React, { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';

// Define the interface for a single document
interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  version: string;
  status: 'approved' | 'review' | 'draft' | 'pending';
  lastModified: string;
  author: string;
  framework: string;
  approver: string | null;
  downloadCount: number;
}

// Define the interface for a folder/filter option
interface Folder {
  id: string;
  name: string;
  count: number;
}

const DocumentRepository: React.FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Document data with type annotation
  const documents: Document[] = [
    {
      id: 1,
      name: 'TCFD Climate Risk Assessment 2024',
      type: 'pdf',
      size: '2.4 MB',
      version: '3.2',
      status: 'approved',
      lastModified: '2024-09-20T10:30:00Z',
      author: 'Sarah Chen',
      framework: 'TCFD',
      approver: 'Michael Rodriguez',
      downloadCount: 15,
    },
    {
      id: 2,
      name: 'GRI Sustainability Report Draft',
      type: 'docx',
      size: '1.8 MB',
      version: '2.1',
      status: 'review',
      lastModified: '2024-09-22T14:15:00Z',
      author: 'Emma Thompson',
      framework: 'GRI',
      approver: null,
      downloadCount: 8,
    },
    {
      id: 3,
      name: 'SBTi Target Validation Data',
      type: 'xlsx',
      size: '856 KB',
      version: '1.5',
      status: 'draft',
      lastModified: '2024-09-23T09:45:00Z',
      author: 'David Park',
      framework: 'SBTi',
      approver: null,
      downloadCount: 3,
    },
    {
      id: 4,
      name: 'CDP Water Security Response',
      type: 'pdf',
      size: '3.1 MB',
      version: '4.0',
      status: 'approved',
      lastModified: '2024-09-18T16:20:00Z',
      author: 'Lisa Wang',
      framework: 'CDP',
      approver: 'Sarah Chen',
      downloadCount: 22,
    },
    {
      id: 5,
      name: 'Emissions Data Validation Report',
      type: 'pdf',
      size: '1.2 MB',
      version: '1.0',
      status: 'pending',
      lastModified: '2024-09-23T11:30:00Z',
      author: 'Michael Rodriguez',
      framework: 'TCFD',
      approver: null,
      downloadCount: 0,
    },
  ];

  // Folder data with type annotation and counts
  const folders: Folder[] = [
    { id: 'all', name: 'All Documents', count: documents.length },
    { id: 'TCFD', name: 'TCFD', count: documents.filter((d) => d.framework === 'TCFD').length },
    { id: 'GRI', name: 'GRI', count: documents.filter((d) => d.framework === 'GRI').length },
    { id: 'SBTi', name: 'SBTi', count: documents.filter((d) => d.framework === 'SBTi').length },
    { id: 'CDP', name: 'CDP', count: documents.filter((d) => d.framework === 'CDP').length },
  ];

  // Function to get the status color class
  const getStatusColor = (status: 'approved' | 'review' | 'draft' | 'pending'): string => {
    switch (status) {
      case 'approved':
        return 'bg-success text-success-foreground';
      case 'review':
        return 'bg-warning text-warning-foreground';
      case 'draft':
        return 'bg-secondary text-secondary-foreground';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // Function to get the file icon name
  const getFileIcon = (type: string): string => {
    switch (type) {
      case 'pdf':
        return 'FileText';
      case 'docx':
        return 'FileText';
      case 'xlsx':
        return 'Sheet';
      default:
        return 'File';
    }
  };

  // Function to format the date string
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filter documents based on the selected folder
  const filteredDocuments: Document[] =
    selectedFolder === 'all'
      ? documents
      : documents.filter((doc) => doc.framework === selectedFolder);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Document Repository</h2>
          <p className="text-sm text-muted-foreground">Manage compliance documents and approvals</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Upload">
            Upload
          </Button>
          <Button variant="default" size="sm" iconName="Plus">
            New Document
          </Button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="space-y-1">
            {folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedFolder === folder.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Folder" size={16} />
                  <span>{folder.name}</span>
                </div>
                <span className="text-xs">{folder.count}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h3 className="text-sm font-medium text-card-foreground mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
                <Icon name="Download" size={14} />
                <span>Bulk Download</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
                <Icon name="Archive" size={14} />
                <span>Archive Old</span>
              </button>
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors">
                <Icon name="Share" size={14} />
                <span>Share Folder</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {filteredDocuments.length} documents
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-muted' : 'hover:bg-muted'
                }`}
              >
                <Icon name="List" size={16} className="text-muted-foreground" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-muted' : 'hover:bg-muted'
                }`}
              >
                <Icon name="Grid3X3" size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-muted rounded-md">
                      <Icon name={getFileIcon(doc.type)} size={20} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-card-foreground hover:text-primary cursor-pointer">
                        {doc.name}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span>v{doc.version}</span>
                        <span>{doc.size}</span>
                        <span>by {doc.author}</span>
                        <span>{formatDate(doc.lastModified)}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            doc.status
                          )}`}
                        >
                          {doc.status}
                        </span>
                        {doc.approver && (
                          <span className="text-xs text-muted-foreground">
                            Approved by {doc.approver}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right text-sm text-muted-foreground">
                      <div>{doc.downloadCount} downloads</div>
                    </div>
                    <button className="p-2 hover:bg-muted rounded-md transition-colors">
                      <Icon name="Download" size={16} className="text-muted-foreground" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-md transition-colors">
                      <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentRepository;
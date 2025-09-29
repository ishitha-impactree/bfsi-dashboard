import React, { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';
import Button from '../../../components/ui/Button';

interface Requirement {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'at-risk' | 'pending';
  assignee: string;
  dueDate: string;
  completedDate: string | null;
  evidence: string[];
}

interface Section {
  id: string;
  name: string;
  description: string;
  progress: number;
  requirements: Requirement[];
}

interface ChecklistData {
  [key: string]: {
    sections: Section[];
  };
}

const ComplianceChecklist = () => {
  const [selectedFramework, setSelectedFramework] = useState<string>('TCFD');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['governance']));

  const checklistData: ChecklistData = {
    TCFD: {
      sections: [
        {
          id: 'governance',
          name: 'Governance',
          description: 'Climate-related governance and oversight',
          progress: 85,
          requirements: [
            {
              id: 'gov-1',
              title: 'Board oversight of climate risks',
              description: 'Document board-level oversight of climate-related risks and opportunities',
              status: 'completed',
              assignee: 'Sarah Chen',
              dueDate: '2024-09-15',
              completedDate: '2024-09-12',
              evidence: ['Board meeting minutes Q3 2024', 'Climate committee charter']
            },
            {
              id: 'gov-2',
              title: 'Management role in climate assessment',
              description: 'Describe management processes for assessing climate risks',
              status: 'in-progress',
              assignee: 'Michael Rodriguez',
              dueDate: '2024-09-30',
              completedDate: null,
              evidence: []
            }
          ]
        },
        {
          id: 'strategy',
          name: 'Strategy',
          description: 'Climate-related risks and opportunities impact on strategy',
          progress: 60,
          requirements: [
            {
              id: 'str-1',
              title: 'Climate risks and opportunities identification',
              description: 'Identify climate-related risks and opportunities over short, medium, and long term',
              status: 'completed',
              assignee: 'Emma Thompson',
              dueDate: '2024-09-20',
              completedDate: '2024-09-18',
              evidence: ['Risk assessment report', 'Opportunity analysis']
            },
            {
              id: 'str-2',
              title: 'Impact on business and strategy',
              description: 'Describe impact of climate risks on business, strategy, and financial planning',
              status: 'pending',
              assignee: 'David Park',
              dueDate: '2024-10-15',
              completedDate: null,
              evidence: []
            },
            {
              id: 'str-3',
              title: 'Scenario analysis',
              description: 'Conduct climate scenario analysis including 2°C scenario',
              status: 'at-risk',
              assignee: 'Lisa Wang',
              dueDate: '2024-10-01',
              completedDate: null,
              evidence: []
            }
          ]
        },
        {
          id: 'risk-management',
          name: 'Risk Management',
          description: 'Climate risk identification, assessment, and management processes',
          progress: 40,
          requirements: [
            {
              id: 'risk-1',
              title: 'Risk identification processes',
              description: 'Describe processes for identifying climate-related risks',
              status: 'in-progress',
              assignee: 'Michael Rodriguez',
              dueDate: '2024-10-10',
              completedDate: null,
              evidence: []
            },
            {
              id: 'risk-2',
              title: 'Risk assessment and prioritization',
              description: 'Describe processes for assessing and prioritizing climate risks',
              status: 'pending',
              assignee: 'Sarah Chen',
              dueDate: '2024-10-20',
              completedDate: null,
              evidence: []
            }
          ]
        },
        {
          id: 'metrics',
          name: 'Metrics & Targets',
          description: 'Climate-related metrics and targets used to assess performance',
          progress: 75,
          requirements: [
            {
              id: 'met-1',
              title: 'Climate-related metrics disclosure',
              description: 'Disclose metrics used to assess climate risks and opportunities',
              status: 'completed',
              assignee: 'Emma Thompson',
              dueDate: '2024-09-25',
              completedDate: '2024-09-22',
              evidence: ['Metrics framework document', 'KPI dashboard']
            },
            {
              id: 'met-2',
              title: 'GHG emissions reporting',
              description: 'Report Scope 1, 2, and relevant Scope 3 emissions',
              status: 'in-progress',
              assignee: 'David Park',
              dueDate: '2024-10-05',
              completedDate: null,
              evidence: ['Scope 1&2 emissions data']
            }
          ]
        }
      ]
    },
    GRI: {
      sections: [
        {
          id: 'organizational-profile',
          name: 'Organizational Profile',
          description: 'Basic organizational information and reporting practices',
          progress: 95,
          requirements: [
            {
              id: 'org-1',
              title: 'Organization name and legal form',
              description: 'Report the name of the organization and its legal form',
              status: 'completed',
              assignee: 'Lisa Wang',
              dueDate: '2024-09-10',
              completedDate: '2024-09-08',
              evidence: ['Corporate registration documents']
            }
          ]
        }
      ]
    }
  };

  const frameworks: string[] = ['TCFD', 'GRI', 'SBTi', 'CDP'];

  const getStatusColor = (status: Requirement['status']): string => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'in-progress':
        return 'text-primary';
      case 'at-risk':
        return 'text-warning';
      case 'pending':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const toggleSection = (sectionId: string): void => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate: string): number => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const currentData = checklistData[selectedFramework] || { sections: [] };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Compliance Checklist</h2>
          <p className="text-sm text-muted-foreground">Track requirement completion by framework</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
        </div>
      </div>
      
      {/* Framework selector */}
      <div className="flex items-center space-x-1 mb-6 border-b border-border">
        {frameworks.map((framework) => (
          <button
            key={framework}
            onClick={() => setSelectedFramework(framework)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              selectedFramework === framework
                ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {framework}
          </button>
        ))}
      </div>

      {/* Checklist sections */}
      <div className="space-y-4">
        {currentData.sections.map((section) => (
          <div key={section.id} className="border border-border rounded-lg">
            {/* Section header - simplified without progress bar */}
            <div 
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={expandedSections.has(section.id) ? "ChevronDown" : "ChevronRight"} 
                  size={16} 
                  className="text-muted-foreground" 
                />
                <div>
                  <h3 className="font-medium text-card-foreground">{section.name}</h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
              </div>
            </div>

            {expandedSections.has(section.id) && (
              <div className="border-t border-border">
                {section.requirements.map((req, index) => (
                  <div key={req.id} className={`p-4 ${index < section.requirements.length - 1 ? 'border-b border-border' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {/* Checkbox instead of status icon */}
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                          req.status === 'completed' 
                            ? 'bg-success border-success' 
                            : 'border-muted-foreground'
                        }`}>
                          {req.status === 'completed' && (
                            <Icon name="Check" size={12} color="white" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-medium text-card-foreground">{req.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{req.description}</p>
                          
                          {/* Compact metadata row */}
                          <div className="flex items-center space-x-4 mt-3 text-sm">
                            <div className="flex items-center space-x-1">
                              <Icon name="User" size={14} className="text-muted-foreground" />
                              <span className="text-muted-foreground">{req.assignee}</span>
                            </div>
                            
                            {/* Due date styling matching the image */}
                            <div className="flex items-center space-x-1">
                              <Icon 
                                name={req.status === 'completed' ? "CheckCircle" : "Calendar"} 
                                size={14} 
                                className={req.status === 'completed' ? "text-success" : "text-muted-foreground"} 
                              />
                              <span className={req.status === 'completed' ? "text-success" : "text-muted-foreground"}>
                                {req.status === 'completed' ? 'Completed' : 'Due'} {formatDate(req.status === 'completed' ? req.completedDate : req.dueDate)}
                                {req.status !== 'completed' && (
                                  <span className="ml-1 text-muted-foreground">
                                    ({getDaysUntilDue(req.dueDate)} days)
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>

                          {/* Evidence section */}
                          {req.evidence.length > 0 && (
                            <div className="mt-3">
                              <h5 className="text-xs font-medium text-card-foreground mb-2">Evidence:</h5>
                              <div className="flex flex-wrap gap-2">
                                {req.evidence.map((evidence, idx) => (
                                  <span key={idx} className="inline-flex items-center px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
                                    <Icon name="Paperclip" size={10} className="mr-1" />
                                    {evidence}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex items-center space-x-2 ml-4">
                        <button className="p-1 hover:bg-muted rounded transition-colors">
                          <Icon name="MessageSquare" size={14} className="text-muted-foreground" />
                        </button>
                        <button className="p-1 hover:bg-muted rounded transition-colors">
                          <Icon name="MoreVertical" size={14} className="text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceChecklist;
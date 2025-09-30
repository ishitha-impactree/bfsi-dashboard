import React, { useState } from 'react';
import Icon from '../../../components/ui/AppIcon';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface TimelineItem {
  id: number;
  phase: string;
  framework: string;
  startDate: string;
  endDate: string;
  status: 'in-progress' | 'pending' | 'completed' | 'at-risk' | 'upcoming';
  progress: number;
  assignee: string;
  tasks?: Task[];
}

const ReportingTimeline = () => {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);

  const timelineData: TimelineItem[] = [
    {
      id: 1,
      phase: 'Data Collection',
      framework: 'TCFD',
      startDate: '2024-09-15',
      endDate: '2024-10-15',
      status: 'in-progress',
      progress: 65,
      assignee: 'Sarah Chen',
      tasks: [
        { id: 1, name: 'Scope 1 emissions data', completed: true },
        { id: 2, name: 'Scope 2 emissions data', completed: true },
        { id: 3, name: 'Scope 3 emissions data', completed: false },
        { id: 4, name: 'Financial data alignment', completed: false },
      ],
    },
    {
      id: 2,
      phase: 'Risk Assessment',
      framework: 'TCFD',
      startDate: '2024-10-01',
      endDate: '2024-10-30',
      status: 'pending',
      progress: 0,
      assignee: 'Michael Rodriguez',
      tasks: [
        { id: 5, name: 'Physical risk analysis', completed: false },
        { id: 6, name: 'Transition risk analysis', completed: false },
        { id: 7, name: 'Scenario modeling', completed: false },
      ],
    },
    {
      id: 3,
      phase: 'Report Generation',
      framework: 'GRI',
      startDate: '2024-09-20',
      endDate: '2024-10-05',
      status: 'completed',
      progress: 100,
      assignee: 'Emma Thompson',
      tasks: [
        { id: 8, name: 'Sustainability metrics compilation', completed: true },
        { id: 9, name: 'Stakeholder engagement summary', completed: true },
        { id: 10, name: 'Report formatting', completed: true },
      ],
    },
    {
      id: 4,
      phase: 'Validation & Review',
      framework: 'SBTi',
      startDate: '2024-10-10',
      endDate: '2024-10-25',
      status: 'at-risk',
      progress: 25,
      assignee: 'David Park',
      tasks: [
        { id: 11, name: 'Third-party verification', completed: false },
        { id: 12, name: 'Internal review process', completed: true },
        { id: 13, name: 'Executive approval', completed: false },
      ],
    },
    {
      id: 5,
      phase: 'Submission',
      framework: 'CDP',
      startDate: '2024-10-20',
      endDate: '2024-11-01',
      status: 'upcoming',
      progress: 0,
      assignee: 'Lisa Wang',
      tasks: [
        { id: 14, name: 'Platform submission', completed: false },
        { id: 15, name: 'Confirmation receipt', completed: false },
      ],
    },
  ];

  const getStatusColor = (status: TimelineItem['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-accent-success';
      case 'in-progress':
        return 'bg-accent-info';
      case 'at-risk':
        return 'bg-accent-warning';
      case 'pending':
        return 'bg-accent-danger';
      case 'upcoming':
        return 'bg-text-muted';
      default:
        return 'bg-text-muted';
    }
  };

  const getFrameworkColor = (framework: string): string => {
    switch (framework) {
      case 'TCFD':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'GRI':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'SBTi':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'CDP':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getDaysRemaining = (endDate: string): number => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-primary-foreground border border-border rounded-lg p-6 shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">Reporting Timeline</h2>
          <p className="text-sm text-text-muted">
            Track milestones and deadlines across all frameworks
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-muted rounded-md transition-colors">
            <Icon name="Filter" size={16} className="text-text-muted" />
          </button>
          <button className="p-2 hover:bg-muted rounded-md transition-colors">
            <Icon name="Download" size={16} className="text-text-muted" />
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {timelineData.map((item, index) => (
          <div key={item.id} className="relative">
            {/* Timeline connector */}
            {index < timelineData.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-8 bg-border" />
            )}

            <div
              className={`border border-border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-elevation-2 ${
                selectedPhase === item.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedPhase(selectedPhase === item.id ? null : item.id)}
            >
              <div className="flex items-start space-x-4">
                {/* Status indicator */}
                <div className={`w-3 h-3 rounded-full mt-2 ${getStatusColor(item.status)}`} />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-card-foreground">{item.phase}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getFrameworkColor(item.framework)}`}
                        >
                          {item.framework}
                        </span>
                        <span className="text-sm text-text-muted">
                          {formatDate(item.startDate)} - {formatDate(item.endDate)}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-medium text-card-foreground">
                        {item.progress}%
                      </div>
                      <div className="text-sm text-text-muted">
                        {getDaysRemaining(item.endDate) > 0
                          ? `${getDaysRemaining(item.endDate)} days left`
                          : 'Overdue'}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar - Fixed implementation */}
                  <div
                    className="w-full bg-muted rounded-full h-2 mb-3"
                    style={{ backgroundColor: 'var(--muted, #f3f4f6)' }}
                  >
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getStatusColor(item.status)}`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="User" size={14} className="text-muted-foreground" />
                      <span className="text-sm">{item.assignee}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-text-muted">
                        {item.tasks?.filter((task) => task.completed).length}/{item.tasks?.length}{' '}
                        tasks
                      </span>
                      <Icon
                        name={selectedPhase === item.id ? 'ChevronUp' : 'ChevronDown'}
                        size={16}
                        className="text-muted-foreground"
                      />
                    </div>
                  </div>

                  {/* Expanded task details */}
                  {selectedPhase === item.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="text-md font-medium text-card-foreground mb-3">
                        Task Details
                      </h4>
                      <div className="space-y-2">
                        {item.tasks?.map((task) => (
                          <div key={task.id} className="flex items-center space-x-3">
                            <div
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                task.completed
                                  ? 'bg-success border-success'
                                  : 'border-muted-foreground'
                              }`}
                            >
                              {task.completed && <Icon name="Check" size={10} color="white" />}
                            </div>
                            <span
                              className={`text-sm ${
                                task.completed
                                  ? 'text-muted-foreground line-through'
                                  : 'text-card-foreground'
                              }`}
                            >
                              {task.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportingTimeline;

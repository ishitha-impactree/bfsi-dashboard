import Icon from '../../components/ui/AppIcon';
import React from 'react';

function RiskMitigationCard({ title, description, icon, status }: any) {
  return (
    <div className="flex items-start space-x-3 p-3 bg-success/10 rounded-lg border border-success/20">
      <Icon name={icon} size={16} className={`${status} mt-0.5`} />
      <div>
        <h4 className="text-md font-bold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default RiskMitigationCard;

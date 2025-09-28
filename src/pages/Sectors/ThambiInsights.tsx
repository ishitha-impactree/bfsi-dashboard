import React from 'react';

interface ThambiInsightsProps {
  className?: string;
}

const ThambiInsights = ({ className }: ThambiInsightsProps) => {
  const taskList: any = [
    {
      id: 1,
      taskName: 'Review Pending',
      taskDescription: 'Q3 Emissions Report for Pama Sports.',
    },
    {
      id: 2,
      taskName: 'Task Due',
      taskDescription: 'Quarterly Risk Review for the "Chemicals" Sector.',
    },
    {
      id: 3,
      taskName: 'Data Gap',
      taskDescription: 'Missing Scope 3 emissions data for Abibas.',
    },
    {
      id: 4,
      taskName: 'Risk Score Alert',
      taskDescription: "Haldisita's risk score increased 15% to High Risk.",
    },
    {
      id: 5,
      taskName: 'Media Alert',
      taskDescription: 'Environmental violation flagged for BCBCB Bank.',
    },
    {
      id: 6,
      taskName: 'Risk Alert',
      taskDescription: 'Environmental violation flagged for BCBCB Bank.',
    },
  ];
  return (
    <div
      className={`flex flex-col justify-start items-center w-full bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200 ${className || ''}`}
      style={{ background: 'white' }}
    >
      <div className="flex justify-start items-center w-full bg-background-light py-[14px] px-[6px]">
        <img src="/images/img_2027.png" alt="Thambi Insights logo" className="w-5 h-5" />
        <span className="text-md font-bold leading-lg text-left text-primary-dark font-['Inter'] ml-[5px]">
          Thambi Insights
        </span>
      </div>

      <div
        className="w-full pace-y-3 sm:space-y-6 lg:space-y-0 bg-card rounded-lg shadow-elevation-1 hover:shadow-elevation-2 transition-shadow duration-200"
        style={{ background: 'white' }}
      >
        {taskList?.map((task: any) => {
          return (
            <div
              key={task?.id}
              className="flex items-center gap-3 sm:gap-4 lg:gap-3 p-3 sm:p-6 lg:p-3 border border-background-overlay rounded-base"
            >
              <img src="/images/purple-diamond.svg" alt="Review Pending" className="w-6 h-6" />
              <div className="flex-1">
                <div className="text-md sm:text-base font-semibold text-text-primary">
                  {task?.taskName}
                </div>
                <div className="text-sm sm:text-sm font-normal text-text-primary">
                  {task?.taskDescription}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/*      <div className="flex justify-start items-center w-[96%]">
        <div className="flex justify-start items-center w-full">
          <div className="flex gap-[10px] justify-start items-center w-full px-3">
            <img
              src="/images/red-diamond.svg"
              alt="Insight icon"
              className="w-4 h-4 rounded-xs self-center"
            />
            <div className="flex flex-col justify-start items-start w-full py-1.5">
              <span className="text-base font-semibold leading-lg text-left text-text-primary font-['Inter']">
                RISK SCORE ALERT
              </span>
              <span className="text-base font-normal leading-lg text-left text-text-primary font-['Inter']">
                Haldisita's risk score increased 15% to High Risk.
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ThambiInsights;

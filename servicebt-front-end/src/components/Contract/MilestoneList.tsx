interface Milestone {
    milestone_id: number;
    title: string;
    description: string;
    amount: number;
    deadline: string;
  }
  
const MilestoneList = ({ milestones }: { milestones: Milestone[] }) => (
    <div className="space-y-3">
      {milestones.map(({ milestone_id, title, description, amount, deadline }) => (
        <div key={milestone_id} className="bg-blue-50 p-4 rounded-md">
          <div className="flex justify-between">
            <span className="font-medium">{title}</span>
            <span className="font-medium">${amount.toLocaleString()}</span>
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
          <div className="text-sm text-gray-500">Due: {new Date(deadline).toLocaleDateString()}</div>
        </div>
      ))}
    </div>
  );
  
  export default MilestoneList;
  
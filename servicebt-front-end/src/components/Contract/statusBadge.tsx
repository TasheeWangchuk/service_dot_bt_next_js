import { Badge } from '@/components/ui/badge';

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case 'PENDING': return 'bg-yellow-500';
    case 'COMPLETED': return 'bg-green-500';
    case 'ACCEPTED': return 'bg-blue-500';
    case 'CANCELLED': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const StatusBadge = ({ status }: { status: string }) => (
  <Badge className={`${getStatusColor(status)} text-white`}>
    {status}
  </Badge>
);

export default StatusBadge;

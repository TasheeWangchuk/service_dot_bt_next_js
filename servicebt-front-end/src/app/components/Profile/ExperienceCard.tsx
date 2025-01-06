interface ExperienceCardProps {
  experience: Experience;
  onDelete: () => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{experience.role}</h3>
          <p className="text-sm text-gray-600">{experience.company}</p>
          <p className="text-sm text-gray-600">{experience.startDate} - {experience.endDate}</p>
        </div>
        <button
          onClick={onDelete}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExperienceCard;

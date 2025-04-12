import { Check } from "lucide-react";

const AchievementBadge = ({
  type,
  title,
  description,
  earned,
  progress = 0,
  maxProgress = 1
}) => {
  const badgeColors = {
    bronze: "bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700",
    silver: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-700",
    gold: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700",
    platinum: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700"
  };

  const progressPercentage = Math.min(100, Math.round((progress / maxProgress) * 100));

  return (
    <div className={`border rounded-lg p-4 transition-all duration-300 hover:shadow-md ${
      earned 
        ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
        : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-70"
    }`}>
      <div className="flex items-start space-x-4">
        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${
          badgeColors[type]
        } ${earned ? "animate-bounce-small" : ""}`}>
          {earned ? (
            <Check className="h-6 w-6" />
          ) : (
            <span className="text-sm font-bold">{progressPercentage}%</span>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          
          {!earned && maxProgress > 1 && (
            <div className="mt-3">
              <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    type === 'bronze' ? 'bg-amber-500' :
                    type === 'silver' ? 'bg-gray-500' :
                    type === 'gold' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}
                  style={{ width: `${progressPercentage}%` }} 
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {progress} / {maxProgress} completed
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;

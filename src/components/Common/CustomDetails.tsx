import LoadingSpinner from "./LoadingSpinner";

interface DetailsSectionProps {
    title: string;
    children: React.ReactNode;
    isLoading?: boolean;
}

interface DetailsItemProps {
    title: string;
    value: string | undefined;
}

export function DetailsSection({ title, children, isLoading }: DetailsSectionProps) {
    return (
        <div className="bg-resident-details-section-bg rounded-lg p-4 shadow-sm border border-resident-details-border theme-transition">
            <h4 className="font-semibold text-resident-details-section-title mb-3 pb-2 border-b border-resident-details-border">
                {title}
            </h4>
            <div className="space-y-1">
                {isLoading ? <LoadingSpinner size="lg" /> : children}
            </div>
        </div>
    );
}

export function DetailsItem({ title, value }: DetailsItemProps) {
    return (
        <div className="flex items-baseline justify-between py-1 rounded px-2 -mx-2 theme-transition">
            <span className="text-sm font-medium text-resident-details-text">{title}</span>
            <span className={`text-sm font-medium text-resident-details-text`}>
                {value || 'N/A'}
            </span>
        </div>
    );
}
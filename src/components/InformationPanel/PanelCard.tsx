import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LoadingSpinner from "../Common/LoadingSpinner";

interface PanelCardProps {
	title: string, 
	condition?: any, // eg: residents ? residents.length : 0 | Type any for now till i can narrow it down a bit better 
	subTitle?: string // text under the condition
	isLoading?: boolean
}

export default function PanelCard({ title, condition, subTitle, isLoading }: PanelCardProps) {
	return (
		<>
			<Card className="bg-infopanel-card-bg border-infopanel-card-border theme-transition">
				<CardHeader>
					<CardTitle className="text-infopanel-card-title">{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-3xl font-bold text-infopanel-card-text dark:text-infopanel-card-text">{isLoading ? <LoadingSpinner size="md" /> : condition}</div>
					<p className="text-infopanel-card-text dark:text-infopanel-card-text ">{subTitle}</p>
				</CardContent>
			</Card>
		</>
	)
}
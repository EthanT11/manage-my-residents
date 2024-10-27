import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PanelCardProps {
	title: string, 
	condition?: any, // eg: residents ? residents.length : 0 | Type any for now till i can narrow it down a bit better 
	subTitle?: string // text under the condition
}

export default function PanelCard({ title, condition, subTitle }: PanelCardProps) {
	return (
		<>
			<Card className="bg-blue-100">
				<CardHeader>
					<CardTitle className="text-blue-700">{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-3xl font-bold text-blue-900">{condition}</div>
					<p className="text-blue-600">{subTitle}</p>
				</CardContent>
			</Card>
		</>
	)
}
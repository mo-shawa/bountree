import RecruitModal from '@/components/Modals/RecruitModal'
import { useSession } from 'next-auth/react'

export default function SecretTestPage() {
	const { data: session } = useSession()
	if (!session) return null

	return (
		<RecruitModal
			opportunityId="64381dcae7bb57479945895b"
			userId={session.user.id}
		/>
	)
}

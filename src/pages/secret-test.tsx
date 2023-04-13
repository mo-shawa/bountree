import RecruitModal from '@/components/Modals/RecruitModal'
import { useSession } from 'next-auth/react'

export default function SecretTestPage() {
	const { data: session } = useSession()
	if (!session) return null

	return <h1>soon, {session.user.name}</h1>
}

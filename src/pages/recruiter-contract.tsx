import Link from 'next/link'
import Image from 'next/image'

export default function RecruiterContract() {
	return (
		<div className="py-12 px-4 w-full max-w-4xl mx-auto">
			<Link href="/">
				<Image
					src="/static/svg/logo-dark.svg"
					alt="Bountree logo"
					height={54}
					width={232}
					className=" mb-10"
				/>
			</Link>
			<h1 className="text-4xl">Recruiting Contract</h1>
			<p className="my-5">
				This Recruiting Contract (the "Contract") is entered into between
				Bountree, Inc. ("Bountree") and the individual or entity accepting this
				Contract as a recruiter ("Recruiter" or "Referrer"), effective as of the
				date the Recruiter creates an account on the Bountree website (the
				"Site") and accepts the Terms of Use as directed by Bountree.
			</p>
			<ol className="list-decimal mx-6">
				<li className="my-5">
					Services. Bountree provides an online platform (the "Platform") that
					connects potential job candidates ("Candidates") with companies
					seeking to fill open positions ("Clients"). The Recruiter may submit a
					referral ("Referral") through the Platform for a Candidate to be
					considered for a position with a Client. The Recruiter agrees to
					provide accurate and complete information about the Candidate in the
					Referral.
				</li>
				<li className="my-5">
					Fees. Bountree shall pay the Recruiter a fee (the "Fee") for the
					successful placement of the Candidate referred by the Recruiter. The
					Fee shall be paid to the Recruiter within 30 days of Bountree&apos;s
					receipt of payment from the Client for the placement. The Recruiter is
					responsible for any taxes or other fees related to the Fee.
				</li>
				<li className="my-5">
					Confidentiality. The Recruiter agrees to maintain the confidentiality
					of any information received from Bountree or any Client through the
					Platform, including but not limited to Candidate information and
					Client job openings. The Recruiter shall not disclose such information
					to any third party without the prior written consent of Bountree or
					the Client.
				</li>
				<li className="my-5">
					Non-Solicitation. The Recruiter agrees that during the term of this
					Contract and for a period of one year thereafter, the Recruiter shall
					not directly or indirectly solicit or attempt to solicit any Client or
					Candidate introduced to the Recruiter through the Platform for the
					purpose of providing recruiting services or any other services that
					compete with those provided by Bountree.
				</li>
				<li className="my-5">
					Intellectual Property. The Recruiter acknowledges that Bountree owns
					all right, title, and interest in and to the Platform, including all
					intellectual property rights. The Recruiter shall not copy, modify,
					distribute, sell, or otherwise transfer any part of the Platform or
					its content without the prior written consent of Bountree.
				</li>
				<li className="my-5">
					Limitation of Liability. Bountree shall not be liable to the Recruiter
					for any indirect, special, incidental, or consequential damages
					arising out of or in connection with this Contract, even if Bountree
					has been advised of the possibility of such damages.
				</li>
				<li className="my-5">
					Governing Law. This Contract shall be governed by and construed in
					accordance with the laws of the State of California, without giving
					effect to any principles of conflicts of law.
				</li>
				<li className="my-5">
					Entire Agreement. This Contract constitutes the entire agreement
					between Bountree and the Recruiter and supersedes all prior and
					contemporaneous agreements and understandings, whether written or
					oral, relating to the subject matter of this Contract.
				</li>
				<li className="my-5">
					Term and Termination. This Contract shall remain in effect until
					terminated by either party. Either party may terminate this Contract
					at any time, with or without cause, upon written notice to the other
					party. Upon termination, the Recruiter shall immediately cease using
					the Platform and return or destroy all Confidential Information
					received from Bountree or any Client.
				</li>
				<li className="my-5">
					Amendments. This Contract may be amended or modified only by a written
					instrument executed by both Bountree and the Recruiter.
				</li>
			</ol>
			<p className="my-5">
				By accepting this Recruiting Contract, the Recruiter represents and
				warrants that the Recruiter has read and understands this Contract, has
				the authority to enter into this Contract, and agrees to be bound by its
				terms and conditions.
			</p>

			<Link href="/">
				<button className="btn btn-block no-animation">Back to home</button>
			</Link>
		</div>
	)
}

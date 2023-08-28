import Link from "next/link"
import Image from "next/image"

export default function RecruiterContract() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <Link href="/">
        <Image
          src="/static/svg/logo-dark.svg"
          alt="Bountree logo"
          height={54}
          width={232}
          className="mb-10"
        />
      </Link>
      <h1 className="text-4xl">Recruiting Contract</h1>
      <small>Last updated: 11th May 2023</small>
      <p className="my-5">
        This Recruiting Contract (the "Contract") is entered into between
        Bountree, Inc. ("Bountree") and the individual or entity accepting this
        Contract as a recruiter ("Recruiter" or "Referrer"), effective as of the
        date the Recruiter creates an account on the Bountree website (the
        "Site") and accepts the Terms of Use as directed by Bountree.
      </p>
      <h2 className="text-2xl font-semibold">Services.</h2>
      <p className="my-5">
        Bountree provides an online platform (the "Platform") that connects
        potential job candidates ("Candidates") with companies seeking to fill
        open positions ("Clients"). The Recruiter may submit a referral
        ("Referral") through the Platform for a Candidate to be considered for a
        position with a Client. The Recruiter agrees to provide accurate and
        complete information about the Candidate in the Referral.
      </p>
      <h2 className="text-2xl font-semibold">Fees.</h2>

      <p className="my-5">
        Bountree shall pay the Recruiter a fee (the "Fee") for the successful
        placement of the Candidate referred by the Recruiter.
      </p>
      <p className="my-5">
        The Fee will be paid through an installment model, which includes a
        90-day guarantee period. During this time, if the Candidate leaves or is
        terminated, some or all of the Fee paid by Bountree may be refunded.
      </p>
      <p className="my-5">
        The total referral bonus amount will be divided into three installments,
        with the first installment being paid within 14 business days of the
        Candidate's joining date. The second installment will be paid on the
        60th day of the guarantee period, and the third and final installment
        will be paid on the 90th day, which marks the end of the guarantee
        period.
      </p>
      <p className="my-5">
        If the Candidate leaves or is terminated by the Employer within the
        guarantee period, the Recruiter will still be able to keep the
        installment(s) that he/she/they have already received.
      </p>
      <p className="my-5">
        The Recruiter may decide to payout (withdraw rewards on his/her/their
        Bountree account) at any time after the funds become available by
        utilizing any of the available payout methods.
      </p>
      <p className="my-5">
        By agreeing to the terms, the Recruiter gives permission to retain
        and/or share the submitted account information with financial
        institutions and payment processing firms, including any institutions or
        firms that Bountree may retain in the future, to process the payment.
      </p>
      <h2 className="text-2xl font-semibold">Confidentiality.</h2>

      <p className="my-5">
        The Recruiter agrees to maintain the confidentiality of any information
        received from Bountree or any Client through the Platform, including but
        not limited to Candidate information and Client job openings. The
        Recruiter shall not disclose such information to any third party without
        the prior written consent of Bountree or the Client.
      </p>
      <h2 className="text-2xl font-semibold">Non-Solicitation. </h2>

      <p className="my-5">
        The Recruiter agrees that during the term of this Contract and for a
        period of one year thereafter, the Recruiter shall not directly or
        indirectly solicit or attempt to solicit any Client or Candidate
        introduced to the Recruiter through the Platform for the purpose of
        providing recruiting services or any other services that compete with
        those provided by Bountree.
      </p>
      <h2 className="text-2xl font-semibold">Intellectual Property.</h2>

      <p className="my-5">
        The Recruiter acknowledges that Bountree owns all right, title, and
        interest in and to the Platform, including all intellectual property
        rights. The Recruiter shall not copy, modify, distribute, sell, or
        otherwise transfer any part of the Platform or its content without the
        prior written consent of Bountree.
      </p>
      <h2 className="text-2xl font-semibold">Limitation of Liability.</h2>

      <p className="my-5">
        Bountree shall not be liable to the Recruiter for any indirect, special,
        incidental, or consequential damages arising out of or in connection
        with this Contract, even if Bountree has been advised of the possibility
        of such damages.
      </p>
      <h2 className="text-2xl font-semibold">Governing Law.</h2>

      <p className="my-5">
        This Contract shall be governed by and construed in accordance with the
        laws of the State of California, without giving effect to any principles
        of conflicts of law.
      </p>
      <h2 className="text-2xl font-semibold">Entire Agreement.</h2>

      <p className="my-5">
        This Contract constitutes the entire agreement between Bountree and the
        Recruiter and supersedes all prior and contemporaneous agreements and
        understandings, whether written or oral, relating to the subject matter
        of this Contract.
      </p>
      <h2 className="text-2xl font-semibold">Term and Termination.</h2>

      <p className="my-5">
        This Contract shall remain in effect until terminated by either party.
        Either party may terminate this Contract at any time, with or without
        cause, upon written notice to the other party. Upon termination, the
        Recruiter shall immediately cease using the Platform and return or
        destroy all Confidential Information received from Bountree or any
        Client.
      </p>
      <h2 className="text-2xl font-semibold">Amendments.</h2>

      <p className="my-5">
        This Contract may be amended or modified only by a written instrument
        executed by both Bountree and the Recruiter.
      </p>
      <p className="my-5">
        By accepting this Recruiting Contract, the Recruiter represents and
        warrants that the Recruiter has read and understands this Contract, has
        the authority to enter into this Contract, and agrees to be bound by its
        terms and conditions.
      </p>

      <Link href="/">
        <button className="no-animation btn-block btn">Back to home</button>
      </Link>
    </div>
  )
}

import Head from "next/head"
import Footer from "./Footer"
import { ReactNode, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import PrivacyandTermsModal from "../Modals/PrivacyandTermsModal"
import { Loader } from "../Loader/Loader"
import Navigation from "./Navigation"

type Props = {
  children?: ReactNode
  classNames?: string
}

export default function Layout({ children, classNames }: Props): JSX.Element {
  const { data: session, status, update: updateSession } = useSession()
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    if (
      status === "authenticated" &&
      !session?.user.acceptedTerms &&
      !session?.user.acceptedPrivacy
    ) {
      setShowModal(true)
      document.body.style.overflow = "hidden"
    }

    if (
      status === "unauthenticated" ||
      (status === "authenticated" &&
        session?.user.acceptedTerms &&
        session?.user.acceptedPrivacy)
    ) {
      setShowModal(false)
      document.body.style.overflow = "unset"
    }
  }, [
    showModal,
    status,
    session?.user.acceptedPrivacy,
    session?.user.acceptedTerms,
  ])

  if (status === "loading") return <Loader />

  return (
    <>
      <Head>
        <title>Bountree - Startup Recruitment, but Good</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <Navigation />
      <main className={classNames}>{children}</main>
      {showModal && (
        <PrivacyandTermsModal
          showModal={showModal}
          setShowModal={setShowModal}
          userId={session?.user.id}
          updateSession={updateSession}
        />
      )}
      <Footer />
    </>
  )
}

import Layout from "@/components/Layout/Layout"
import ArrowButton from "@/components/Misc/ArrowButton"
import Image from "next/image"
import JobDescriptionGenerator from "@/components/JobDescriptionGenerator"

export default function ProductPage() {
  return (
    <Layout classNames=" pt-28">
      <section className="flex flex-col items-center justify-center">
        <div className="flex w-full max-w-7xl flex-col gap-2 p-4 py-28 lg:flex-row">
          <div className="flex w-full max-w-7xl flex-col items-center gap-8 text-center lg:items-start lg:text-left">
            <h1 className="max-w-sm text-5xl font-bold">
              There's a better way to hire
            </h1>
            <p className="max-w-lg text-xl">
              Skip the headache of recruitment and let the{" "}
              <span className="font-bold text-b-yellow">bountree</span> referral
              network find your dream team.
            </p>
            <ArrowButton target="_blank" href="https://calendly.com/wdib">
              Book a Demo
            </ArrowButton>
            <p className="mb-8 text-2xl font-bold lg:mb-0 ">
              Or try out our magic{" "}
              <span className="text-b-yellow">job description generator</span>
              <span className="hidden lg:inline">👉</span>
              <span className="inline lg:hidden">👇</span>
            </p>
          </div>
          <div className="w-full">
            <JobDescriptionGenerator />
            <p className="mt-2 text-justify">
              Hire top talent without spending all your time crafting the
              perfect job description with bountree's Job Description Generator!
              Create tailored and professional job postings that reflect your
              company's unique voice.
            </p>
          </div>
        </div>

        <small className="mb-5">Trusted by</small>
        <div className="mx-4 mb-20 grid max-w-5xl grid-cols-3 gap-4 md:grid-cols-6">
          <Image
            src="/static/product/coinmena.png"
            alt="company logo"
            width={200}
            height={200}
            className="mx-auto h-full max-h-16 w-full rounded-full bg-white object-contain p-3"
          />
          <Image
            src="/static/product/clara.png"
            alt="company logo"
            width={200}
            height={200}
            className="mx-auto h-full max-h-16 w-full rounded-full bg-white object-contain p-3"
          />
          <Image
            src="/static/product/syarah.png"
            alt="company logo"
            width={200}
            height={200}
            className="mx-auto h-full max-h-16 w-full rounded-full bg-white object-contain p-3"
          />
          <Image
            src="/static/product/zest.png"
            alt="company logo"
            width={200}
            height={200}
            className="mx-auto h-full max-h-16 w-full rounded-full bg-white object-contain p-3"
          />
          <Image
            src="/static/product/pluto.png"
            alt="company logo"
            width={200}
            height={200}
            className="mx-auto h-full max-h-16 w-full rounded-full bg-white object-contain p-3"
          />
          <Image
            src="/static/product/stake.png"
            alt="company logo"
            width={200}
            height={200}
            className="mx-auto h-full max-h-16 w-full rounded-full bg-white object-contain p-3"
          />
        </div>
      </section>
    </Layout>
  )
}

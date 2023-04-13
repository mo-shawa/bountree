import Link from 'next/link'
import Image from 'next/image'

export default function CookiePolicy() {
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
			<h1 className="text-4xl">Cookie Policy</h1>

			<span className="text-sm">Last updated: 11th April 2023</span>
			<p className="my-5">
				This Cookie Policy explains how Bountree, Inc. (“Bountree,” “we,” “us,”
				or “our”) uses cookies and similar technologies to collect, store, and
				share information about your use of our website(s), products, services,
				and applications (the “Services”).
			</p>

			<h2 className="text-2xl">What are cookies?</h2>
			<p className="my-5">
				Cookies are small data files that are placed on your device or computer
				when you visit a website. Cookies may be used to collect and store
				information about your device and your use of the website, including but
				not limited to your IP address, browser type, internet service provider,
				referring/exit pages, operating system, date/time stamp, and clickstream
				data.
			</p>

			<h2 className="text-2xl">Types of cookies</h2>

			<p className="my-5">
				We may use the following types of cookies: Necessary cookies: These
				cookies are necessary for the website to function and cannot be switched
				off in our systems. They are usually only set in response to actions
				made by you which amount to a request for services, such as setting your
				privacy preferences, logging in or filling in forms. You can set your
				browser to block or alert you about these cookies, but some parts of the
				site will not then work. These cookies do not store any personally
				identifiable information. Performance cookies: These cookies allow us to
				count visits and traffic sources so we can measure and improve the
				performance of our site. They help us to know which pages are the most
				and least popular and see how visitors move around the site. All
				information these cookies collect is aggregated and therefore anonymous.
				If you do not allow these cookies we will not know when you have visited
				our site, and will not be able to monitor its performance. Functional
				cookies: These cookies enable the website to provide enhanced
				functionality and personalisation. They may be set by us or by third
				party providers whose services we have added to our pages. If you do not
				allow these cookies then some or all of these services may not function
				properly. Targeting cookies: These cookies may be set through our site
				by our advertising partners. They may be used by those companies to
				build a profile of your interests and show you relevant adverts on other
				sites. They do not store directly personal information but are based on
				uniquely identifying your browser and internet device. If you do not
				allow these cookies, you will experience less targeted advertising.
			</p>

			<h2 className="text-2xl">How we use cookies</h2>

			<p className="my-5">
				We use cookies to: Remember your preferences and settings Understand how
				you interact with our Services Monitor and analyze the performance,
				operation, and effectiveness of our Services Provide personalized
				content and advertising We may also use cookies from third-party service
				providers to assist us in providing and analyzing our Services.
			</p>

			<h2 className="text-2xl">How to manage cookies</h2>
			<p className="my-5">
				You can manage your cookie preferences through your browser settings.
				However, please note that disabling cookies may affect your ability to
				access certain features of our Services.
			</p>

			<h2 className="text-2xl">Contact us</h2>
			<p className="my-5">
				If you have any questions or concerns about this Cookie Policy or our
				use of cookies, please contact us at help@bountree.com.
			</p>
			<Link href="/">
				<button className="btn btn-block no-animation">Back to home</button>
			</Link>
		</div>
	)
}

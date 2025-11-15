// Config
// ------------
// Description: The configuration file for the website.

export interface Logo {
	src: string
	srcDark: string
	alt: string
}

export type Mode = 'auto' | 'light' | 'dark'

export interface Config {
	siteTitle: string
	siteDescription: string
	ogImage: string
	logo: Logo
	canonical: boolean
	noindex: boolean
	mode: Mode
	scrollAnimations: boolean
}

export const configData: Config = {
	siteTitle: 'Solid Boston - Your Site Title',
	siteDescription:
		'Your site description goes here. Update this with information about your business or organization.',
	ogImage: '/og.jpg',
	logo: {
		src: '/logo-light.webp',
		srcDark: '/logo-dark.webp',
		alt: 'Site logo'
	},
	canonical: true,
	noindex: false,
	mode: 'auto',
	scrollAnimations: true
}

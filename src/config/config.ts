// Config
// ------------
// Description: The configuration file for the website.

// buiild tst

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
	siteTitle: 'Solid Boston - We build like we mean it.',
	siteDescription:
		'Boston based construction company specializing in residential and commercial construction.',
	ogImage: '/og.jpg',
	logo: {
		src: '/solid-builders-logo.svg',
		srcDark: '/solid-builders-logo-dark.svg',
		alt: 'Site logo'
	},
	canonical: true,
	noindex: false,
	mode: 'auto',
	scrollAnimations: true
}

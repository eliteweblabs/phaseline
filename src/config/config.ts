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
	siteTitle: 'PhaseLine Painting - Professional Painting Services',
	siteDescription:
		'Professional painting company specializing in residential and commercial painting services.',
	ogImage: '/og.jpg',
	logo: {
		src: '/phaseline-logo.png',
		srcDark: '/phaseline-logo-dark.png',
		alt: 'PhaseLine Painting logo'
	},
	canonical: true,
	noindex: false,
	mode: 'auto',
	scrollAnimations: true
}

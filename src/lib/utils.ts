/**
 * Utilities.
 */

import { Socials } from './types';

/** Generate a link to a social media profile.
 *
 * @param {string} network The social media network name.
 * @returns {string} The link to the social media profile.
 */
export function socialLink(network: string, value: string): string {
	const socialLinkBases: Socials = {
		twitter: 'https://twitter.com/',
		linkedin: 'https://www.linkedin.com/in/',
		instagram: 'https://www.instagram.com/',
		facebook: '',
	};

	if (!(network in socialLinkBases)) {
		return '';
	}

	return socialLinkBases[network] + value;
}

/**
 * Generate a full name from a first and last name.
 *
 * @param {string} firstName The first name.
 * @param {string} lastName The last name.
 * @returns {string} The full name.
 */
export function fullName(firstName: string, lastName: string): string {
	if (firstName && lastName) return `${firstName} ${lastName}`;
	else if (firstName && !lastName) return firstName;
	else return lastName;
}

import {
	UserParams,
	CandidateData,
	UserProfileParams,
	CreditParams,
	Socials,
	PositionTerm,
	SkillTerm,
} from './types';

/**
 * A basic user.
 *
 * @class User
 * @param {Object} params
 * @implements {UserParams}
 */
export class User {
	id!: number;
	firstName: string = '';
	lastName: string = '';

	constructor(params?: UserParams) {
		Object.assign(this, params, {
			id: params && params.id ? Number(params.id) : 0,
		});
	}
}

/**
 * A candidate.
 * @class Candidate
 * @param {CandidateData} params
 * @implements {CandidateData}
 */
export class Candidate extends User {
	fullName: string = '';
	selfTitle?: string;
	image?: string;

	constructor(params: CandidateData) {
		super({
			id: params.id,
			firstName: params.firstName,
			lastName: params.lastName,
		});

		Object.assign(this, params);
	}
}

/**
 * A user profile
 * @param {Object} params
 * @implements {UserProfileParams}
 * @implements {Socials}
 */
// TODO Does this really need to extend the `User` class?
export class UserProfile extends User {
	name: string = '';
	contactEmail: string = '';
	selfTitle?: string;
	image?: string;
	pronouns?: string;
	phone?: string;
	description?: string;
	websiteUrl?: string;
	location?: string;
	resume?: string;
	willTravel?: boolean | null;
	education?: string[];
	unions?: string[];
	media?: string[];
	socials?: Socials;
	credits?: Credit[];

	constructor(userParams: UserProfileParams, credits?: CreditParams[]) {
		super({
			id: userParams.id,
			firstName: userParams.firstName,
			lastName: userParams.lastName,
		});

		Object.assign(this, userParams, {
			name: `${userParams.firstName} ${userParams.lastName}`,
			education: userParams.education ? userParams.education.split('##') : [],
			media: userParams.media ? userParams.media.split('##') : [],
			credits: credits && credits.length > 0 ? [...credits] : [],
			socials: {
				twitter: userParams.twitter || '',
				linkedin: userParams.linkedin || '',
				instagram: userParams.instagram || '',
				facebook: userParams.facebook || '',
			},
		});
	}
}

/**
 * A production credit.
 * @param {CreditParams} params
 * @implements {CreditParams}
 */
export class Credit {
	title!: string;
	venue: string = '';
	year: string = '';
	positions: PositionTerm[]; // TODO Split this collection into departments and jobs.
	skills: SkillTerm[] = [];

	constructor(params: CreditParams) {
		this.title = params.title;
		this.venue = params.venue;
		this.year = params.year;
		this.positions = params.positions.nodes;
		this.skills = params.skills.nodes;
	}
}

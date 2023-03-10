/**
 * useRelatedSkills hook.
 *
 * // TODO Document me.
 */

import { gql, useQuery } from '@apollo/client';
import { omit } from 'lodash';
import { WPItemParams } from '../../lib/types';
import { WPItem } from '../../lib/classes';

const QUERY_RELATED_SKILLS = gql`
	query RelatedSkillsQuery($jobs: [ID!]) {
		jobSkills(jobs: $jobs) {
			id: databaseId
			name
			slug
		}
	}
`;

/**
 * usePositions hook.
 *
 * Queries `skill` terms related to a job (`position` taxonomy)
 *
 * @param {Array} jobs - An array of job IDs.
 * @returns {Array} A tuple of a prepared data object and a query result object.
 */
export const useRelatedSkills = (jobs: string[] = []): [WPItem[], any] => {
	const result = useQuery(QUERY_RELATED_SKILLS, {
		variables: {
			jobs,
		},
	});

	const preparedResult = result.data?.jobSkills.map((skill: WPItemParams) => new WPItem(skill));

	return [preparedResult, omit(result, ['data'])];
};

import { useContext, useEffect } from 'react';
import { Heading, Wrap, useCheckboxGroup } from '@chakra-ui/react';
import { PositionTerm } from '../lib/types';
import { usePositions } from '../hooks/queries/usePositions';

import { SearchContext } from '../context/SearchContext';
import { CheckboxButton } from './common/CheckboxButton';

interface Props {
	heading: string;
}

export default function SearchFilterDepartment({ heading }: Props) {
	const { search, searchDispatch } = useContext(SearchContext);
	const { data, loading, error } = usePositions(parseInt(search.position.department));

	const handleToggleTerm = (terms: string[]) => {
		searchDispatch({
			type: 'SET_JOBS',
			payload: {
				jobs: terms,
			},
		});
	};

	// Subscribe to Reset events in the Search Context
	// BUG Clicking a main department term doesn't stick, and immediately resets.
	// useEffect(() => {
	// 	if (search.position.jobs.length === 0) {
	// 		setValue([]);
	// 	}
	// }, [search.position.jobs]);

	const { getCheckboxProps, setValue } = useCheckboxGroup({
		defaultValue: [],
		onChange: handleToggleTerm,
	});

	return !loading && !error ? (
		<>
			<Heading size='md' mb={3} width='full' borderBottom='2px' borderColor='gray.600'>
				{heading}
			</Heading>
			<Wrap justifyContent='flex-start' alignItems='center' width='full' gap={4} mb={4}>
				{data.positions.nodes.map((term: PositionTerm) => {
					const checkbox = getCheckboxProps({ value: term.id.toString() });

					return (
						<CheckboxButton key={term.id} {...checkbox}>
							{term.name}
						</CheckboxButton>
					);
				})}
			</Wrap>
		</>
	) : loading ? (
		<>Loading...</>
	) : error ? (
		<>Error</>
	) : (
		<>Nada</>
	);
}

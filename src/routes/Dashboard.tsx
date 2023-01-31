import React from 'react';
import { Container, Grid, GridItem, Text } from '@chakra-ui/react';

import Page from '../components/common/Page';
import GridCard from '../components/common/GridCard';
import SearchList from '../components/common/SearchList';
import CandidateList from '../components/CandidateList';

// TODO: Remove this when we have real data
import { _devSavedSearches, _devRecentSearches } from '../lib/_devData';

// TODO probably kill <GridCard> and just use <GridItem> directly

export default function Dashboard() {
	return (
		<Page title="Hi, Firstname!">
			<Container maxW="4xl">
				<Grid templateColumns="2" templateRows="3" gap={6}>
					<GridItem colSpan={2}>
						<GridCard heading="Notes and Bulletins">
							<Text>Notes and Bulletins go here</Text>
						</GridCard>
					</GridItem>
					<GridItem colSpan={2}>
						<GridCard heading="Saved candidates">
							<CandidateList />
						</GridCard>
					</GridItem>
					<GridItem colSpan={{ base: 2, sm: 1 }}>
						<GridCard heading="Saved Searches">
							<SearchList items={_devSavedSearches} />
						</GridCard>
					</GridItem>
					<GridItem colSpan={{ base: 2, sm: 1 }}>
						<GridCard heading="Recent Searches">
							<SearchList items={_devRecentSearches} />
						</GridCard>
					</GridItem>
				</Grid>
			</Container>
		</Page>
	);
}
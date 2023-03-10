import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from '@chakra-ui/react';
import Page from '../components/Page';
import ProfileView from '../views/ProfileView';
import ErrorAlert from '../components/common/ErrorAlert';

import { AuthContext } from '../context/AuthContext';
import { useUserProfile } from '../hooks/queries/useUserProfile';

import { isEqualNumberlike, maybeParseInt } from '../lib/utils';
import { CreditParams } from '../lib/types';
import { Credit, UserProfile } from '../lib/classes';

export default function Profile() {
	const {
		loggedInUser: { id: loggedInId },
	} = useContext(AuthContext);
	const params = useParams();

	// If no user ID is in the route, use the logged in user's ID.
	const userId = params.userId ? maybeParseInt(params.userId) : loggedInId;
	const isLoggedInUser = isEqualNumberlike(userId, loggedInId);

	const { data, loading, error } = useUserProfile(userId);

	const preparedCredits = data?.credits.nodes.map((credit: CreditParams) => new Credit(credit));

	const profile = data ? new UserProfile(data.user, preparedCredits) : null;

	const EditButton = () => (
		<Button as={Link} to='/profile/edit'>
			Edit Profile
		</Button>
	);

	return (
		<Page
			title={isLoggedInUser ? 'My Profile' : ''}
			actions={isLoggedInUser ? <EditButton /> : null}
		>
			{profile && !loading && !error ? (
				<ProfileView profile={profile} loading={loading} />
			) : loading ? (
				<Spinner />
			) : error ? (
				<ErrorAlert message={error.message} />
			) : (
				''
			)}
		</Page>
	);
}

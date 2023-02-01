import React from 'react';
import {
	Box,
	Heading,
	Image,
	Flex,
	Text,
	ButtonGroup,
	Button,
	Stack,
	List,
	ListItem,
	Card,
	useMediaQuery,
	Avatar,
	Tag,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import { isEmpty } from 'lodash';
import { Credit, UserProfile } from '../lib/classes';
import HeadingCenterline from '../components/common/HeadingCenterline';
import SocialLinks from '../components/common/SocialLinks';

interface Props {
	profile: UserProfile;
	credits: Credit[];
}

/**
 * @param {UserProfile} profile The user profile data.
 * @returns {JSX.Element} The Props component.
 */
export default function ProfileView({ profile, credits }: Props): JSX.Element | null {
	const [isLargerThanMd] = useMediaQuery('(min-width: 48em)');

	/**
	 * Generate the text to display for the 'will travel' field.
	 * @returns {string} The text to display.
	 */
	const willTravelText = (): string => {
		const str = 'Willing to travel';
		return profile.willTravel ? str : `Not ${str.toLowerCase()}`;
	};

	return profile ? (
		<Stack direction='column' flexWrap='nowrap' gap={6}>
			<Card py={6} bg='blackAlpha.100'>
				<Flex
					gap={5}
					flexWrap={{ base: 'wrap', md: 'nowrap' }}
					justifyContent={{ base: 'center', md: 'flex-start' }}
				>
					{isLargerThanMd ? (
						<Image
							src={profile.image}
							alt={`${profile.name}'s picture`}
							loading='eager'
							fit='cover'
						/>
					) : (
						<Avatar size='2xl' src={profile.image} name={`${profile.name}'s picture`} />
					)}

					<Stack
						direction='column'
						textAlign='left'
						justifyContent='flex-start'
						gap={1}
						lineHeight={1}
					>
						<Flex alignItems='center'>
							<Heading size='xl' mr={2}>
								{profile.name}
							</Heading>
							<Tag colorScheme='cyan' size='sm'>
								{profile.pronouns}
							</Tag>
						</Flex>
						<Box>
							<Text fontSize='xl' lineHeight='short'>
								{profile.selfTitle && profile.selfTitle}
							</Text>
						</Box>

						{profile.socials && !isEmpty(profile.socials) && (
							<Box>
								<SocialLinks socials={profile.socials} website={profile.website} />
							</Box>
						)}

						<Box>
							<Heading size='md'>Unions/Guilds</Heading>
							<Text>{profile.unions?.join(', ')}</Text>
						</Box>
						<Stack direction='row' flexWrap='wrap' alignItems='flex-end'>
							<Box w='auto'>
								<Heading size='md'>Location/Homebase</Heading>
								<Stack direction='row' justifyContent='flex-start' alignItems='center'>
									<Text my={1} flex='1' mr={2}>
										{profile.location}
									</Text>
									{profile.willTravel !== undefined && (
										<Tag size='md' colorScheme={profile.willTravel ? 'green' : 'orange'}>
											{willTravelText()}
										</Tag>
									)}
								</Stack>
							</Box>
						</Stack>
						<ButtonGroup colorScheme='blue' flexWrap='wrap' gap={2} justifyContent='flex-start'>
							<Button>Resume{/* profile.resume */}</Button>
							<Button>Email{/* profile.email */}</Button>
							<Button>Phone{/* profile.phone */}</Button>
							<Button>Save{/* bookmark this user */}</Button>
						</ButtonGroup>
					</Stack>
				</Flex>
			</Card>

			{credits && credits.length && (
				// MAYBE click-to-expand more Credit details?
				<Box>
					<HeadingCenterline lineColor='brand.cyan'>Credits</HeadingCenterline>
					<List textAlign='left' fontSize='lg' mt={2} spacing={1}>
						{credits.map((credit: Credit, index: React.Key) => (
							<ListItem key={index}>
								<Box as='span' fontStyle='italic' fontSize='xl'>
									{credit.title}
								</Box>{' '}
								({credit.jobTitle}) &bull; {credit.venue} &bull; {credit.year}
							</ListItem>
						))}
					</List>
				</Box>
			)}

			{profile.bio && (
				<Box>
					<HeadingCenterline lineColor='brand.pink'>About</HeadingCenterline>
					<Text>{profile.bio}</Text>
				</Box>
			)}

			{profile.education && (
				<Box>
					<HeadingCenterline lineColor='brand.green'>Education</HeadingCenterline>
					<List textAlign='left' fontSize='lg' spacing={1} mt={2}>
						{profile.education.map((item: string, index: React.Key) => (
							<ListItem key={index}>{item}</ListItem>
						))}
					</List>
				</Box>
			)}

			{profile.media && profile.media.length && (
				<Box>
					<HeadingCenterline lineColor='brand.cyan'>Media</HeadingCenterline>
					<List mt={4}>
						{profile.media.map((item: string, index: React.Key) => (
							<ListItem key={index}>
								<ReactPlayer url={item} controls={true} />
							</ListItem>
						))}
					</List>
				</Box>
			)}
		</Stack>
	) : null;
}

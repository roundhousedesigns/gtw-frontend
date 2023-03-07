import { useContext, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
	Box,
	IconButton,
	Image,
	Container,
	useDisclosure,
	LightMode,
	Spacer,
	Link,
	Stack,
	useMediaQuery,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuDivider,
	MenuOptionGroup,
} from '@chakra-ui/react';

import { FiSearch, FiMenu, FiLogOut, FiSettings, FiHome, FiUser } from 'react-icons/fi';

import SearchDrawer from './SearchDrawer';
import logo from '../../assets/images/gtw-logo-horizontal.svg';
import LoggedIn from '../LoggedIn';

import { useLogout } from '../../hooks/mutations/useLogout';
import { AuthContext } from '../../context/AuthContext';
import { SearchContext } from '../../context/SearchContext';
import Badge from '../common/Badge';

export default function Header() {
	const { isOpen: drawerIsOpen, onOpen: drawerOnOpen, onClose: drawerOnClose } = useDisclosure();
	const drawerButtonRef = useRef(null);

	const { setLoggedInUser } = useContext(AuthContext);
	const {
		search: { searchActive, results },
	} = useContext(SearchContext);
	const { logoutMutation } = useLogout();

	const [isLargerThanMd] = useMediaQuery('(min-width: 48rem)');

	const handleLogout = () => {
		logoutMutation().then(() => {
			setLoggedInUser({ id: 0, firstName: '', lastName: '' });
		});
	};

	return (
		<Box flex='0 0 auto' w='full'>
			<LightMode>
				<Box id='header' w='full' bg='black' py={3} color='white'>
					<Container centerContent w='full' maxW='9xl'>
						<Stack
							direction='row'
							w='100%'
							justifyContent='space-between'
							align='center'
							flexWrap='wrap'
						>
							<LoggedIn>
								<Box position='relative'>
									<IconButton
										ref={drawerButtonRef}
										icon={<FiSearch />}
										aria-label='Search for candidates'
										variant='invisible'
										fontSize='4xl'
										onClick={drawerOnOpen}
									/>
									{searchActive && results.length ? (
										<Badge bg='none' color='orange'>
											{results.length}
										</Badge>
									) : null}
								</Box>
							</LoggedIn>
							<Link as={RouterLink} to='/'>
								<Image src={logo} alt='Get To Work logo' loading='eager' w='auto' h='40px' />
							</Link>
							<LoggedIn redirect={false}>
								{isLargerThanMd ? (
									<>
										<Spacer />
										<Stack
											direction='row'
											spacing={4}
											mr={6}
											align='center'
											fontSize='lg'
											textTransform='uppercase'
										>
											<Link ref={drawerButtonRef} onClick={drawerOnOpen}>
												Search
											</Link>
											<Link as={RouterLink} to='/profile'>
												My Profile
											</Link>
										</Stack>
									</>
								) : null}

								<Box pl={2}>
									{
										// HACK Wrapping <Menu> in <Box> removes Chakra CSS warning bug.
										// @link {https://github.com/chakra-ui/chakra-ui/issues/3440}
									}
									<Menu>
										<MenuButton
											aria-label='Menu'
											as={IconButton}
											variant='round'
											bg='brand.blue'
											_active={{ bg: 'brand.cyan' }}
											icon={<FiMenu />}
											size='lg'
										/>
										<MenuList color='black'>
											{isLargerThanMd ? (
												<>
													<MenuOptionGroup>
														<MenuItem as={RouterLink} to='/profile' icon={<FiUser />}>
															My Profile
														</MenuItem>
														<MenuItem as={RouterLink} to='/search' icon={<FiSearch />}>
															Search
														</MenuItem>
													</MenuOptionGroup>
													<MenuDivider />
												</>
											) : null}
											<MenuOptionGroup>
												<MenuItem as={RouterLink} to='/' icon={<FiHome />}>
													Dashboard
												</MenuItem>
												<MenuItem as={RouterLink} to='/settings' icon={<FiSettings />}>
													Settings
												</MenuItem>
											</MenuOptionGroup>
											<MenuDivider />
											<MenuItem icon={<FiLogOut />} onClick={handleLogout}>
												Logout
											</MenuItem>
										</MenuList>
									</Menu>
								</Box>
							</LoggedIn>
						</Stack>
					</Container>
				</Box>
			</LightMode>

			<SearchDrawer isOpen={drawerIsOpen} onClose={drawerOnClose} />
		</Box>
	);
}

import { createContext, useReducer } from 'react';

// TODO convert `filters` to an instance of `SearchFilters` class

interface SearchState {
	filters: {
		position: {
			department: string;
			jobs: string[];
		};
		skills: string[];
	};
	searchActive: boolean;
	results: number[];
}

interface SearchAction {
	type: string;
	payload?: {
		department?: string;
		jobs?: string[];
		skills?: string[];
		results?: number[];
	};
}

const initialSearchState: SearchState = {
	filters: {
		position: {
			department: '',
			jobs: [],
		},
		skills: [],
	},
	searchActive: false,
	results: [],
};

export const SearchContext = createContext({
	search: initialSearchState,
	searchDispatch: ({}: SearchAction) => {},
});

function searchContextReducer(state: SearchState, action: SearchAction): SearchState {
	switch (action.type) {
		case 'SET_DEPARTMENT':
			if (!action.payload?.department) return state;

			return {
				...state,
				filters: {
					...state.filters,
					position: {
						...state.filters.position,
						department: action.payload.department,
						// Clear jobs
						jobs: [],
					},
				},
				searchActive: true,
			};

		case 'SET_JOBS':
			if (!action.payload?.jobs) return state;

			return {
				...state,
				filters: {
					...state.filters,
					position: {
						...state.filters.position,
						jobs: action.payload.jobs,
					},
					// Clear skills
					skills: [],
				},
				searchActive: true,
			};

		case 'SET_SKILLS':
			if (!action.payload?.skills) return state;

			return {
				...state,
				filters: {
					...state.filters,
					skills: action.payload.skills,
				},
				searchActive: true,
			};

		case 'SET_RESULTS':
			if (!action.payload?.results) return state;

			return {
				...state,
				results: action.payload.results,
			};

		case 'RESET':
			return initialSearchState;

		default:
			console.info('SearchContext default case... this probably indicates a bug, friendo.');
			return state;
	}
}

interface Props {
	children: React.ReactNode;
}

export const SearchContextProvider = ({ children }: Props) => {
	const [search, searchDispatch] = useReducer(searchContextReducer, initialSearchState);

	return (
		<SearchContext.Provider value={{ search, searchDispatch }}>{children}</SearchContext.Provider>
	);
};

import { editableAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
	editableAnatomy.keys
);

const baseStyle = definePartsStyle({
	preview: {
		borderWidth: '3px',
		borderColor: 'gray.500',
		borderStyle: 'dashed',
		borderRadius: 'lg',
		cursor: 'pointer',
		px: 4,
		py: 1,
		m: 1,
	},
	input: {
		borderWidth: '3px',
		borderStyle: 'solid',
		borderRadius: 'lg',
		px: 4,
		py: 1,
		m: 1,
	},
	textarea: {
		borderWidth: '3px',
		borderStyle: 'solid',
		borderRadius: 'lg',
	},
});

export default defineMultiStyleConfig({ baseStyle });

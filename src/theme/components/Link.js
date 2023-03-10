import { defineStyleConfig } from '@chakra-ui/react';

export default defineStyleConfig({
	baseStyle: {
		my: 2,
		textUnderlineOffset: '0.2em',
		color: 'blackAlpha.800',
		_dark: {
			color: 'whiteAlpha.800',
		},
	},
	variants: {
		nav: {
			textDecoration: 'none',
			_hover: {
				textDecoration: 'none'
			}
		},
		dotted: {
			textDecoration: 'underline',
			textDecorationStyle: 'dotted',
			textDecorationThickness: '1px',
			lineHeight: 'tall',
			_hover: {
				textDecorationStyle: 'solid',
			},
		},
	},
});

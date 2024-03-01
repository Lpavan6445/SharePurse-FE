import { createTheme } from "@material-ui/core";

const BUTTON_BG_COLOR = "#5E5DF0";
const defaultTheme = createTheme({
	breakpoints: {
		xs: 0,
		sm: 600,
		md: 900,
		lg: 1200,
		xl: 1536,
  	},
	moduleColurs: {
		greencolor: "rgb(34,197,94)",
		redcolor: "rgb(245,57,57)",
		warningcolor: "rgb(249,115,22)",
		globalcolor: BUTTON_BG_COLOR,
		appBackgroundColor: "rgb(238,241,252)",
	},
	appBoxShadows: {
		cardShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(112, 144, 176, 0.08) 14px 17px 40px 4px',
	},
	typography: {
		fontFamily: "DM Sans, sans-serif",
	},
	overrides: {
		MuiButton: {
			root: {
				// Some CSS
				fontSize: '1rem',
				backgroundColor: BUTTON_BG_COLOR,
				color: "#ffffff",
				borderRadius: "0.75rem",
				padding: "0.5rem 1rem",
				fontWeight: "600",
				textTransform: "auto",
				'&:hover': {
					backgroundColor: "#3f28f7e6"
				}
			},
			'contained': {
				backgroundColor: BUTTON_BG_COLOR,
				color: "#ffffff",
				borderRadius: "0.75rem",
				padding: "0.5rem 1rem",
				boxShadow: "#5E5DF0 0 10px 20px -10px",

				'&:hover': {
					backgroundColor: "#3f28f7e6"
				}
			}
		},
		MuiInputBase: {
			root: {
				padding: '0.2rem 0.5rem',
				borderRadius: '9px',
				backgroundColor: '#FFFFFF',
				boxShadow: 'rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(112, 144, 176, 0.08) 14px 17px 40px 4px',

			},
			input: {
				borderRadius: '7px',
				backgroundColor: 'rgb(238,241,252)'
			}
		},
		MuiOutlinedInput: {
			root: {
				padding: '0.5rem 0.5rem',
				borderRadius: '9px',
				backgroundColor: '#FFFFFF',
			},
			input: {
				padding: '0.5rem 1rem',
				borderRadius: '7px',
				backgroundColor: 'rgb(238,241,252)'
			}
		},
	},
	// palette: {
	// 	primary: {
	// 		main: "#0b1437",
	// 		dark: "#0b1437",
	// 		disabled: 'rgb(0, 0, 0, 0.6)',
	// 		contrastColor: '#fff',
	// 	},
	// 	secondary: {
	// 		main: '#dc5a4b',
	// 		light: '#fff',
	// 		disabled: '#9e9e9e',
	// 		contrastText: '#fff',
	// 	},
	// 	error: {
	// 		main: 'rgba(230, 74, 25, 1)',
	// 	},
	// 	success: {
	// 		main: 'rgba(30, 188, 48, 1)',
	// 	},
	// 	text: {
	// 		primary: '#000',
	// 		secondary: '#000',
	// 	},
	// 	tertiary: {
	// 		alternateRow: '#fafafb',
	// 		stickyHeader: '#edeff2',
	// 		themeBackground: '#fafafa',
	// 		borderColor: '#aaaaaa',
	// 		weekHeaders: '#53627c',
	// 		currentWeekCell: '#385177',
	// 		linkColor: 'rgba(34, 61, 209, 1)',
	// 		navLinkActive: 'rgb(52,52,52)',
	// 		newOrange: '#F09150',
	// 	},
	// 	moduleColors: {
	// 		draft: '#f0f2f5',
	// 		submitted: '#b8bffb',
	// 		approved: '#00c19e',
	// 		negotiate: '#b8bffb',
	// 		rejected: '#dd2727',
	// 		mixed: '#4a4a4a',
	// 		tabular_approved: '#1ebc30',
	// 		tabular_negotiate: '#0027ef',
	// 		tabular_submitted: '#ffa500',
	// 		tabular_rejected: '#e64a19',
	// 		// tabular_draft: '#000',
	// 		tabular_deleted: '#e64a19',
	// 		tabular_active: '#1ebc30',
	// 		tabular_pending: '#0027ef',
	// 		'tabular_partially approved': '#ffa500',
	// 		100: '#2696F4',
	// 		90: '#51ABF6',
	// 		committed: '#51ABF6',
	// 		75: '#59D3E6',
	// 		50: '#D68CD0',
	// 		25: '#DEA3D9',
	// 		10: '#E6BAE3',
	// 		pipeline: '#E6BAE3',
	// 		gap: '#FEC52E',
	// 		target: '#656FDD',
	// 		completed: '#656FDD',
	// 		in_progress: '#59D3E6',
	// 		not_started: '#E6BAE3',
	// 		'in progress': '#59D3E6',
	// 		'not started': '#E6BAE3',
	// 		disciplineRow: '#f1f6f9',
	// 		domainRow: '#cfd8dc',
	// 		allocatedColor: '#60a0a7',
	// 		estimatedColor: '#0055c3',
	// 		estimatedBurned: 'rgba(255, 102, 27, 0.36)',
	// 		burned: 'rgb(255, 137, 0)',
	// 	},
	// },
	// fontweight: {
	// 	regular: 500,
	// 	bold: 700,
	// 	light: 300,
	// 	bolder: 900,
	// },
	// 	h5: {
	// 		fontFamily: "Anta, sans-serif",
	// 		fontWeight: 500,
	// 		fontSize: '1.5rem',
	// 	},
	// 	h6: {
	// 		fontFamily: "Anta, sans-serif",
	// 		fontWeight: 500,
	// 		fontSize: '1.125rem',
	// 	},
	// 	subtitle1: {
	// 		fontFamily: 'Roboto-Regular',
	// 		fontWeight: 400,
	// 		fontSize: '1rem',
	// 	},
	// 	subtitle2: {
	// 		fontFamily: "Anta, sans-serif",
	// 		fontWeight: 500,
	// 		fontSize: '1rem',
	// 	},
	// 	body1: {
	// 		fontFamily: "Anta, sans-serif",
	// 		fontWeight: 500,
	// 		fontSize: '0.875rem',
	// 	},
	// 	body2: {
	// 		fontFamily: "Anta, sans-serif",
	// 		fontWeight: 400,
	// 		fontSize: '0.875rem',
	// 	},
	// 	button: {
	// 		fontFamily: "Anta, sans-serif",
	// 		fontWeight: 700,
	// 		fontSize: '0.875rem',
	// 	},
	// 	caption: {
	// 		fontFamily: "Anta, sans-serif",
	// 		fontWeight: 700,
	// 		fontSize: '0.875rem',
	// 	},
	// 	fontFamily: "Anta, sans-serif",
	// },
	// shadow: {
	// 	default:
	// 		'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
	// 	left: '-2px 0 0 0 #aaaaaa',
	// 	right: '2px 0 0 0 #aaaaaa',
	// 	bottom: '-2px 0px 2px 0px #aaaaaa',
	// 	top: '2px 0px 2px 0px #aaaaaa',
	// },
	// overrides: {
	// 	MuiCssBaseline: {
	// 		'@global': {
	// 			'@font-face': ["Anta, sans-serif"],
	// 		},
	// 	},
	// 	MuiTableCell: {
	// 		root: {
	// 			borderBottom: 'none',
	// 		},
	// 		stickyHeader: {
	// 			backgroundColor: '#edeff2',
	// 		},
	// 	},
	// 	MuiTable: {
	// 		root: {
	// 			borderCollapse: 'separate',
	// 		},
	// 	},
	// 	MuiTableRow: {
	// 		footer: {
	// 			'& > td': {
	// 				backgroundColor: '#eeeeee',
	// 				color: '#000',
	// 				fontFamily: "Anta, sans-serif",
	// 				fontWeight: 700,
	// 				fontSize: '0.875rem',
	// 			},
	// 		},
	// 		root: {
	// 			'&:nth-child(2n) > td': {
	// 				backgroundColor: '#fafafb',
	// 			},
	// 			'&:nth-child(2n + 1) > td': {
	// 				backgroundColor: '#fff',
	// 			},
	// 		},
	// 		head: {
	// 			'& > th': {
	// 				backgroundColor: '#edeff2',
	// 				fontFamily: "Anta, sans-serif",
	// 				fontWeight: 700,
	// 				fontSize: '0.875rem',
	// 			},
	// 		},
	// 	},
	// 	MuiTableBody: {
	// 		root: {
	// 			backgroundColor: '#fff',
	// 		},
	// 	},
	// 	MuiInputBase: {
	// 		input: {
	// 			fontSize: '1rem',
	// 			fontFamily: "Anta, sans-serif",
	// 			fontWeight: 400,
	// 		},
	// 		root: {
	// 			'& input:disabled': {
	// 				cursor: 'not-allowed',
	// 			},
	// 		},
	// 	},
	// 	MuiOutlinedInput: {
	// 		// input: {
	// 		// 	padding: 8,
	// 		// },
	// 	},
	// 	MuiIcon: {
	// 		root: {
	// 			fontSize: 14,
	// 		},
	// 	},
	// 	MuiTab: {
	// 		root: {
	// 			fontFamily: "Anta, sans-serif",
	// 			fontWeight: 500,
	// 			fontSize: '1rem',
	// 			textTransform: 'none',
	// 		},
	// 	},
	// 	MuiMenuItem: {
	// 		root: {
	// 			fontFamily: "Anta, sans-serif",
	// 			fontWeight: 400,
	// 		},
	// 	},
	// 	MuiList: {
	// 		root: {
	// 			fontSize: '0.875rem',
	// 		},
	// 	},
	// 	MuiAutocomplete: {
	// 		option: {
	// 			fontFamily: "Anta, sans-serif",
	// 			fontWeight: 400,
	// 		},
	// 	},
	// 	MuiPopover: {
	// 		paper: {
	// 			overflowX: 'auto',
	// 		},
	// 	},
	// },
	// components: {
	// 	MuiButton: {
	// 		// styleOverrides: {
	// 			// Name of the slot
	// 			root: {
	// 				// Some CSS
	// 				fontSize: '20rem',
	// 				backgroundColor: "#422afb",
	// 				color: "ffffff",
	// 			},
	// 		// },
	// 	},
	// }
});

export default defaultTheme;


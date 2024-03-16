
// {
//     "group": 12,
//     "title": "01 Test Transaction",
//     "description": "Dinner expense",
//     "total_amount": 500.00,
//     "paid_by": 17,
//     "participants": [{ "user_id": 3, "amount_paid": 200}, {"user_id": 17, "amount_paid": 300 }]
// }

export const TITLE_ADD_EXPENSES_DK = 'title';
export const DESCRIPTION_ADD_EXPENSES_DK = 'description';
export const CATEGORY_ADD_EXPENSES_DK = 'category';
export const TOTAL_AMOUNT_ADD_EXPENSES_DK = 'total_amount';
export const PAID_BY_ADD_EXPENSES_DK = 'paid_by';
export const SPLIT_BY = 'split_by';

export const ADD_EXPENSES_FORM = {
    [TITLE_ADD_EXPENSES_DK]: {
        name: TITLE_ADD_EXPENSES_DK,
        labelText: 'Title *',
        placeholder: 'Select title',
        autocomplete: 'title',
        validations: {
            required: {
				message: 'Required',
				value: true,
			},
        }
    },
    [DESCRIPTION_ADD_EXPENSES_DK]: {
        name: DESCRIPTION_ADD_EXPENSES_DK,
        labelText: 'Description *',
        placeholder: 'Select description',
        autocomplete: 'description',
        validations: {
            required: {
				message: 'Required',
				value: true,
			},
        }
    },
    [CATEGORY_ADD_EXPENSES_DK]: {
        name: CATEGORY_ADD_EXPENSES_DK,
        labelText: 'Category *',
        placeholder: 'Select category',
        autocomplete: 'category',
        validations: {
            required: {
				message: 'Required',
				value: true,
			},
        }
    },
    [TOTAL_AMOUNT_ADD_EXPENSES_DK]: {
        name: TOTAL_AMOUNT_ADD_EXPENSES_DK,
        labelText: 'Total amount *',
        placeholder: '0',
        autocomplete: 'amount',
        validations: {
            required: {
				message: 'Required',
				value: true,
			},
            validate: value => {
				// check is value is number
				if (isNaN(value)) {
					return 'Amount should be number';
				}

				if (value <= 0) {
					return 'Amount should be greater than 0';
				}

				return undefined;
			},
        }
    },
    [PAID_BY_ADD_EXPENSES_DK]: {
        name: PAID_BY_ADD_EXPENSES_DK,
        labelText: 'Paid by *',
        placeholder: 'Select paid by',
        autocomplete: 'paid_by',
        validations: {
            required: {
				message: 'Required',
				value: true,
			},
        }
    },
    [SPLIT_BY]: {
        name: SPLIT_BY,
        labelText: 'Split by',
        placeholder: 'Split by',
        autocomplete: 'paid_by',
    },
};

export const SPLIT_EQUALLY = 'SPLIT_EQUALLY';
export const SPLIT_UNEQUALLY = 'SPLIT_UNEQUALLY';

export const SPLIT_TYPE_OPTIONS = {
    [SPLIT_EQUALLY]: {
        value: SPLIT_EQUALLY,
        text: 'Split Equally',
    },
    [SPLIT_UNEQUALLY]: {
        value: SPLIT_UNEQUALLY,
        text: 'Split Unequally',
    }
}
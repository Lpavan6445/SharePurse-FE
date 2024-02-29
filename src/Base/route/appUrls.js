const LOG_IN = '/login/';
const SIGN_UP = '/signup/';

const HOME_PAGE = '/homepage';

const STUDENT_MANAGMENT_SYSTEM_BASE = '/student-management-system';



// ----------------------------- Expenses -----------------------------------
const GROUP_BASE = '/group';
const GROUPS_LIST = `${GROUP_BASE}/list`;
const VIEW_GROUP = id => `${GROUP_BASE}/${id}`;
const ADD_EXPENSES = id => `${VIEW_GROUP(id)}/add_expenses`;
const VIEW_EXPENSE = (id, expenseId) => `${GROUP_BASE}/${id}/${expenseId}`;
const EDIT_EXPENSE = (id, expenseId) => `${GROUP_BASE}/${id}/${expenseId}/edit`;
const PERSONAL_EXPENSE = `/expenses/personal`;

const AppUrls = {
    LOG_IN,
    SIGN_UP,  
    HOME_PAGE,
    STUDENT_MANAGMENT_SYSTEM_BASE,

    GROUPS_LIST,
    GROUP_BASE,
    VIEW_GROUP,
    ADD_EXPENSES,
    VIEW_EXPENSE,
    EDIT_EXPENSE,
    PERSONAL_EXPENSE,
}

export default AppUrls;
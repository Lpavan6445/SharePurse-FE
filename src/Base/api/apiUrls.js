const AUTH_BASE = `${process.env.REACT_APP_API_PREFIX}`;

const SIGN_UP = `${AUTH_BASE}/signup/`;

const LOG_IN = `${AUTH_BASE}/login/`;

// --------------------------- Share Purse ------------------------------
const GET_USER_META_DATA = `${AUTH_BASE}/get-metadata/`;

const GROUP_BASE = groupId => `${AUTH_BASE}/group/${groupId}`;
const CREATE_GROUP = `${AUTH_BASE}/group/create/`;
const EDIT_GROUP_DATA = groupId => `${AUTH_BASE}/group/edit/${groupId}/`;
const GET_GROUP_METADATA = groupId => `${GROUP_BASE(groupId)}/metadata/`;
const DELETE_GROUPE = groupId => `${GROUP_BASE(groupId)}/delete/`;
const ADD_MEMEBERS_TO_GROUP = groupId => `${GROUP_BASE(groupId)}/add_members/`;

const TRANSACTION_BASE = `${AUTH_BASE}/transaction`;
const GROUP_EXPENSES = groupId => `${TRANSACTION_BASE}/get-list-of-expenses-of-group/${groupId}/`;
const GET_GROUP_BALANCES= (groupId) => `${TRANSACTION_BASE}/get-individual-balances/${groupId}/`;
const ADD_GROUP_EXPENSES = groupId => `${TRANSACTION_BASE}/make/${groupId}/`;
const EDIT_GROUP_EXPENSES = groupId => `${TRANSACTION_BASE}/edit/${groupId}/`;
const SETTLE_BALANCES = groupId => `${TRANSACTION_BASE}/settle_up/${groupId}/`;
const UPDATE_PROFILE = `${AUTH_BASE}/update_profile/`;

const ApiUrls = {
    AUTH_BASE,
    SIGN_UP,
    LOG_IN,

    GET_USER_META_DATA,
    GET_GROUP_METADATA,
    GROUP_EXPENSES,
    ADD_GROUP_EXPENSES,

    GET_GROUP_BALANCES,
    ADD_MEMEBERS_TO_GROUP,
    CREATE_GROUP,
    EDIT_GROUP_EXPENSES,
    SETTLE_BALANCES,
    EDIT_GROUP_DATA,
    DELETE_GROUPE,
    UPDATE_PROFILE,
};

export default ApiUrls;
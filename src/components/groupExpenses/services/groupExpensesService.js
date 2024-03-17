import { cloneDeep, isArray } from 'lodash';
import moment from 'moment';
import travelIcon from "assets/travelIcon.svg";
import shoppingIcon from "assets/shoppingIcon.svg";
import movieIconColor from "assets/movieIconColor.svg";
import medicalIcon from "assets/medical.svg";
import electronicsIcons from "assets/electronicsIcons.svg";
import invoice from "assets/invoice.svg";
import foodIcon from "assets/foodIcon.svg";
import servicesIcon from "assets/servicesIcon.svg";

function groupDataByMonth(data=[]) {
    const clonedDt = cloneDeep(data);
    const groupedData = {};

    clonedDt.sort((a, b) => moment(b.created_at).valueOf() - moment(a.created_at).valueOf());

    clonedDt.forEach(item => {
        const createdAt = moment(item.created_at);
        const monthKey = createdAt.format('MMMM YYYY');

        if (!groupedData[monthKey]) {
            groupedData[monthKey] = [];
        }

        groupedData[monthKey].push(item);
    });

    // Sort the keys (months and years)
    const sortedKeys = Object.keys(groupedData).sort((a, b) => {
        return moment(b, 'MMMM YYYY').valueOf() - moment(a, 'MMMM YYYY').valueOf()
    });

    // Create a new object with sorted keys
    const sortedGroupedData = {};
    sortedKeys.forEach(key => {
        sortedGroupedData[key] = groupedData[key];
    });

    return sortedGroupedData;
}

const getExpensCategoryIcons = (category = '') => {
    const GET_EXPENSES_IMAGES = {
        'tr': travelIcon,
        'ee': electronicsIcons,
        'md': medicalIcon,
        'sp': shoppingIcon,
        'sv': servicesIcon,
        'ot': invoice,
        'mv': movieIconColor,
        'fd': foodIcon,
    };

    return GET_EXPENSES_IMAGES[category] || GET_EXPENSES_IMAGES['ot'];
};

const GroupExpensesService = {
    groupDataByMonth,
    getExpensCategoryIcons,
}


export default GroupExpensesService;
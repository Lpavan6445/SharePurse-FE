import { cloneDeep, isArray } from 'lodash';
import moment from 'moment';

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


const GroupExpensesService = {
    groupDataByMonth,
}


export default GroupExpensesService;
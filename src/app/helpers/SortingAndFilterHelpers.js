export const sortColumnData = (sortColumn, sortType, sortableObject) => {
    let sort;
    if (sortType === 'asc') {
        sort = [...sortableObject].sort((a, b) =>
            (a[sortColumn].toLowerCase() > b[sortColumn].toLowerCase())
                ? 1 : ((b[sortColumn].toLowerCase() > a[sortColumn].toLowerCase()) ? -1 : 0));
    } else {
        sort = [...sortableObject].sort((b, a) =>
            (a[sortColumn].toLowerCase() > b[sortColumn].toLowerCase())
                ? 1 : ((b[sortColumn].toLowerCase() > a[sortColumn].toLowerCase()) ? -1 : 0));
    }
    return sort;
};

export const filterRecommendationData = (filterOn, event, recommendations) => {
    let filterParam = event.target.value ? event.target.value : '';
    let filteredData = [];
    recommendations.forEach(itr => {
        if (itr[filterOn].toLowerCase().includes(filterParam.toLowerCase())) {
            filteredData.push(itr);
        }
    });
    return filteredData;
}
export const formatQueryPage = (query, action, page) => {
    page = Number(page);
    
    if(action === "prev") {
        query = new URLSearchParams(query);
        query.set('page', page -1)
        query = decodeURIComponent(query)
        return query
    } else if(action === "next") {
        query = new URLSearchParams(query);
        query.set('page', page +1);
        query= decodeURIComponent(query);
        return query;
    } else {
        query = new URLSearchParams(query);
        query.set('page', page || 1);
        query = decodeURIComponent(query)
        return query;
    }
}

export const formatQueryFilterAndSort = (query, type, filters, param, property) => {
    // console.log('params:', param)
    if (type === 'filter') {
        
        filters.forEach(filter => {

            query = new URLSearchParams(query);
            query.set(filter[0], filter[1]);
            query.set('page', 1)
            query = decodeURIComponent(query);

        })
        return query
        
        // query = new URLSearchParams(query);
        // query.set(property, param);
        // query.set('page', 1)
        // query = decodeURIComponent(query);
        // // console.log(query)
        // return query;
    }
   if (type === 'sort') {

        query = new URLSearchParams(query);
        query.set('sort', param)
        query.set('page', 1)
        query = decodeURIComponent(query);
        // console.log(query)
        return query;
        
    } else {
        query = new URLSearchParams(query);
        query = decodeURI(query);
        return query;
    }
}
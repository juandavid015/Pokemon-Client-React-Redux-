export default function pagination (arr, page, limit, offset) {
    // console.log(arr)
    if(arr.length) {
        page = Number(page) || 1;

        if (page > 0) {
            
            limit = limit || (12 * page);
            offset = offset || (12 * (page -1));
            let paginatedArr = arr.slice(offset, limit);

             return paginatedArr

        } else return []

    } else return arr
}
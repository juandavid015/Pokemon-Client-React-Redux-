export default function filter (arr, filters) {
    // console.log('filters:', filters);

    if (arr.length) {

        let newArr = [...arr]

        if(Object.hasOwn(filters, 'types')) {
    
            let value = filters.types;
            value=  value ? value = value.split(',').sort((a, b)=> {
                if (a < b) return -1
                return 0
            }): "";
    
             newArr = newArr.filter(item => item['types'].sort((a, b)=> {
                if (a < b) return -1
                return 0
            }).join(',').includes(value))
    
            
    
            // else if(!value) return arr
            // else return []
        }
    
        if(Object.hasOwn(filters, 'abilities')) {
    
            let value = filters.abilities;
            value=  value ? value = value.split(',').sort((a, b)=> {
                if (a < b) return -1
                return 0
            }): "";
    
             newArr = newArr.filter(item => item['abilities'].sort((a, b)=> {
                if (a < b) return -1
                return 0
            }).join(',').includes(value))
    
            // if (newArr.length) return newArr
    
            // else if(!value) return arr
            
        }

        if (newArr.length) return newArr
        else return []
    } 

    return arr
    
    
   
}
export default function sort (arr, sort) {
    // console.log('arr', arr)
    if (arr.length ) {
        let newArr =[...arr]
        if (sort === 'ALPH-DESC') {

            newArr= newArr.sort((a,b)=> {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                return newArr
            });
            
        }
        if (sort === 'ALPH-ASC') {
    
            newArr= newArr.sort((a,b)=> {
                if (a.name > b.name) return -1;
                return newArr
            });
           
        }
        if (sort === 'ATK-DESC') {
    
            newArr = newArr.sort((a,b)=> {
                if (a.attack < b.attack) return -1;
                return newArr
            });
            
        }
        if (sort === 'ATK-ASC') {
            
            newArr = newArr.sort((a,b)=> {
                if (a.attack > b.attack) return -1;
                return newArr
            });
           
        }
        return newArr
    }
    
   
   return arr; 
}
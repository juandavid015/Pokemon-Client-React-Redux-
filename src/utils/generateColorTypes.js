export default function generateColorTypes (type) {

    let darkColor = "#06102d";
    let lightColor = "white";

    switch (type) {
        case 'normal': 
            return {color: darkColor ,backgroundColor: '#a6a6a6', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg'};
        case 'fighting':
            return {color: lightColor ,backgroundColor: '#b3004a', icon: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg'};
        case 'flying': 
            return {color: darkColor ,backgroundColor: '#85b6ff', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg'};
        case 'poison':
            return {color: lightColor ,backgroundColor: '#6927b9', icon: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg'};
        case 'ground':
            return {color: lightColor ,backgroundColor: '#ac5216', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg'};
        case 'rock':
            return {color: darkColor ,backgroundColor: '#b8986f', icon: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg'};
        case 'bug': 
             return {color: darkColor ,backgroundColor: '#00b324', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg'};
        case 'ghost': 
            return {color: lightColor ,backgroundColor: '#323258', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg'};
        case 'steel': 
            return {color: lightColor ,backgroundColor: '#3e5575', icon: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg'};
        case 'fire':
            return {color: lightColor ,backgroundColor: '#e05600', icon: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg'};
        case 'water':
            return {color: darkColor ,backgroundColor: '#2f83e9', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg'};
        case 'grass':
            return {color: darkColor ,backgroundColor: '#2c964a', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg'};
        case 'electric': 
            return {color: darkColor ,backgroundColor: '#e5eb37', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg'};
        case 'psychic':
            return {color: darkColor ,backgroundColor: '#d4496e', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg'}
        case 'ice':
            return {color: darkColor ,backgroundColor: '#19c2b4', icon: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg'};
        case 'dragon':
            return {color: lightColor ,backgroundColor: '#0051c2', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg'}
        case 'dark':
            return {color: lightColor ,backgroundColor: '#191516', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg'};
        case 'fairy':
            return {color: lightColor ,backgroundColor: '#b66d8a', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg'};
        case 'unknown':
            return {color: lightColor ,backgroundColor: '#19191f'};
        case 'shadow':
            return {color: lightColor ,backgroundColor: '#1b0f24'};
        default: return
    }
}
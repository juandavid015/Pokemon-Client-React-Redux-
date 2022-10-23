
export default function validate (values, setErrForm, setValidateState) {
    
    let err = {};
    let regexSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    let regexNotNumbers = /^([^0-9]*)$/

    if (!values.name.length) {
        err.name = 'Name can not be empty *';
    } else if (regexSpecialChars.test(values.name)) {
        err.name = 'Name contains invalid characters. (@#$%^&*()_+-=)';
    } else if (!regexNotNumbers.test(values.name)) {
        err.name = 'Name can not contain numbers';
    }
    if(!values.sprite.length) {
        err.sprite = 'Please provide a image link for your Pokemon';
    }
    if (values.height > 100 || values.height <= 0) {
        err.height = 'The Height value must be in a range from 1 to 100';
    };
    if (values.attack < 1 || values.attack > 500) {
        err.attack = 'The Attack must be in a range from 1 to 500'
    }
    if (values['special-attack'] < 1 || values['special-attack'] > 500) {
        err['special-attack'] = 'The Special Attack must be in a range from 1 to 500'
    }
    if (values.defense < 1 || values.defense > 500) {
        err.defense = 'The Defense must be in a range from 1 to 500'
    }
    if (values['special-defense'] < 1 || values['special-defense'] > 500) {
        err['special-defense'] = 'The Special Defense must be in a range from 1 to 500'
    }
    if (values.speed < 1 || values.speed> 500) {
        err.speed = 'The Speed must be in a range from 1 to 500'
    }
    if (values.hp < 1 || values.hp > 500) {
        err.hp = 'The hp must be in a range from 1 to 500'
    }
    if (!values.types.length || values.types.length > 2) {
        err.types = 'Pokemon must be from 1 or 2 types';
    } 
    if (!values.abilities.length) {
        err.abilities = 'Please select at least one ability for your Pokemon';
    } 
    if(values.weight <= 0) {
        err.weight = 'Weight value has to be greater than 0 kg'
    }

    if (Object.keys(err).length === 0) {
        setErrForm(err);
        setValidateState(true);

    }
    else if (Object.keys(err).length > 0) {
        setErrForm(err);
        setValidateState(false);
    }

}
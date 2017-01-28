const addLeadZero = value=> value < 10 ? '0' + value : value;

export const formatDDMMYYY = (date, join= '.')=>
    addLeadZero(date.getDate()) + join + addLeadZero(date.getMonth() + 1) + join + date.getFullYear();

export const modifyProp = (value, setter, getter)=> {
    setter(getter() + value);
    return date;
};

export const addMonths = (date, value = 0)=>
    modifyProp(value, date.setMonth, date.getMonth);
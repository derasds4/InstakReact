export const updateAddition = value=>({
    type: 'TASK_SET_ADD',
    value
});

export const updateAdditionKey = (key, value)=>updateAddition({
    [key]: value
});

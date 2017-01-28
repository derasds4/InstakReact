export const setPage = value=>({
    type: 'APP_SET_PAGE',
    value
});

export const setDialog = value=>({
    type: 'APP_SET_DIALOG',
    value
});

export const updateStepper = value=>({
    type: 'APP_UPDATE_STEPPER',
    value
});

export const updateStepperByName = (name, value)=>updateStepper({
    [name]: value
});

export const updateStepperKeyByName = (name, key, value)=>updateStepper({
    [name]: {
        [key]: value
    }
});
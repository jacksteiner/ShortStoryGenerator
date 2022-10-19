const storyList = (state = [], action) => {
    if (action.type === 'SET_STORYLIST'){
        return action.payload;
    }
    return state;
}

export default storyList
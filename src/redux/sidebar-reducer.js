let initialState = {
    dialogs: [
        {id: 1, name: 'Anna'},
        {id: 2, name: 'Dmitriy'},
        {id: 3, name: 'Leonid'},
        {id: 4, name: 'Aleksey'},
        {id: 5, name: 'Kate'},
        {id: 6, name: 'Vika'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Yo'},
        {id: 3, message: 'Wassup'}
    ],
    newMessageBody: ""
}

const sidebarReducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default sidebarReducer;
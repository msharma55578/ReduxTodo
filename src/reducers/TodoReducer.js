const initialData = {
    list: []
}

const TodoReducer = (state = initialData, action) => {

    switch (action.type) {
        case "ADD_TODO":
            const { id, data } = action.payload;
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        id: id,
                        data: data
                    }
                ]
            }
        case "DELETE_TODO":
            const tempList = state.list.filter((ele)=>ele?.id !== action.id);
            return {
                ...state,
                list : tempList
            }
        case 'EDIT_TODO':
            let index;
            state.list.forEach((ele,idx)=> {if (ele?.id === action?.payload?.id) index = idx})
            const tempNewData = {id: action?.payload?.id, data: action?.payload?.data}
            const newList = state.list.splice(index,1,tempNewData);
            return {
                ...state,
                newList
            }
        default:
            return state;
    }

}

export default TodoReducer;
import {ADD_TASK,DELETE_TASK,COMPLETE_TASK, EDIT_TASK, CHANGE_TASK} from '../Action/actionTypes';


const initialState = {
	items: [
    {id:0,content:1,status:false,editable:false},
    {id:1,content:2,status:false,editable:false},
    {id:2,content:'abc',status:true,editable:false}]
};

const Reducer = (state = initialState, action) => {
  const {items} = state
  switch (action.type) {
    case ADD_TASK :
        return { items : [...items,action.payload] };
    case DELETE_TASK :
		return  { items : items.filter((item) => item.id !== action.payload.id) };
    case COMPLETE_TASK : 
        return  { items: items.map((item) => item.id === action.payload.id ? {...item, status: !item.status} : item) };
  case EDIT_TASK : 
        return  { items: items.map((item) => item.id === action.payload.id && action.payload.content !== '' ?  {...item, editable: !item.editable, status : false} : item ) };
    case CHANGE_TASK :
        return { items: items.map((item) => item.id === action.payload.id ? {...item, content: action.input} : item) };
	default :
        return state;
  }
};


export default Reducer;
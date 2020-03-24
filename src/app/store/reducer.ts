import { INCREMENT,USER_UPDATE_THEME,LOADER } from "./action";

export interface IAppState {
    counter:string,
    secondryColor:string,
    loader : boolean
}

export const INITIAL_STATE: IAppState={
    counter:localStorage.getItem('primaryColor'),
    secondryColor:localStorage.getItem('secondryColor'),
    loader : false,
}

export function rootReducer(state:IAppState,action):any{
    switch(action.type){
        case INCREMENT:return {counter:state.counter}
        case USER_UPDATE_THEME:
        return {...state, counter: action.Color }        
        case LOADER:
        return {...state, loader : action.loader}
        default:return {
            counter:state.counter,
            loader : false
        }
    }
}
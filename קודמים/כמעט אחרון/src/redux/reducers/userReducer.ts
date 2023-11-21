import { User } from '../../types/User';

const userInitial: User = { firstName: '', lastName: '', email: '', userId: null }

const userReducer = (state: User = userInitial, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            state = action.data;
            state = { ...state }
            break;
        default:
            break;
    }
    return state;
}

export default userReducer
import axios from "axios";
import { bindActionCreators } from "redux";

const initialState = {
  userInfo: {
    userid: null,
    username: "",
    token: null,
  },
};

//* Actions
const POST_SIGNIN_SUCCESS = "POST_SIGNIN_SUCCESS";

//* Action 생성자
export const signin_Success = () => ({
  type: POST_SIGNIN_SUCCESS,
  payload: {
    //! 어떤 정보가 들어가야할까? 보내는 정보! 어디에?
    //? 상태 정보, 서버에서 받은 status code를 바탕으로 isSignin : true ?
    //. 로그인이 성공했다면 username (=> api에서는 userid를 보내준다고 되어있다.)과
    //. token을 받아와야할 것 같다.
  },
});

//* Reducer
const reducer = (state: [] = [], action: any) => {
  switch (action.type) {
    case POST_SIGNIN_SUCCESS:
      return [
        ...state,
        {
          //! 어떤 정보가 들어가야할까?
          //? 리듀서는 정보를 받아와 액션을 통해 그 결과를 변경시킨다.
          //? initial state를 생각해보자
          //? action 생성자의 payload와 연관있다.
          //* 이후 라우트 처리
        },
      ];
    default:
      return state;
  }
};

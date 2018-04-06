import {
  GET_HOMEPAGE_DATA_REQUEST_POST,
  GET_HOMEPAGE_DATA_RECEIVE_SUCCESS_POST,
  GET_HOMEPAGE_DATA_RECEIVE_ERROR_POST,
  CHANGE_HOMEPAGE_DATA,
  CHANGE_MODAL_VISIBLE,
  CHANGE_LINK_INPUT_VALUE,
  ADD_BANNER_LINK_REQUEST_POST,
  ADD_BANNER_LINK_RECEIVE_SUCCESS_POST,
  ADD_BANNER_LINK_RECEIVE_ERROR_POST,
  DELETE_BANNER_REQUEST_POST,
  DELETE_BANNER_RECEIVE_SUCCESS_POST,
  DELETE_BANNER_RECEIVE_ERROR_POST
} from '../action/homepage';

const initialHomepage = {
  data: {},
  isGettingHomepageData: false,
  modalVisible: false,
  currentUrl: '',
  linkInputValue: '',
  isAddingBannerLink: false,
  isDeletingBanner: false
}

export const homepage = (state = initialHomepage, action) => {
  switch(action.type){
    case GET_HOMEPAGE_DATA_REQUEST_POST:
      return {...state, isGettingHomepageData: true};
    case GET_HOMEPAGE_DATA_RECEIVE_SUCCESS_POST:
      return {...state, isGettingHomepageData: false, data: action.homepageData};
    case GET_HOMEPAGE_DATA_RECEIVE_ERROR_POST:
      return {...state, isGettingHomepageData: false};
    case CHANGE_HOMEPAGE_DATA:
      return {...state, data: action.homepageData};
    case CHANGE_MODAL_VISIBLE:
      return {...state, modalVisible: action.modalVisible, currentUrl: action.currentUrl, linkInputValue: action.linkInputValue};
    case CHANGE_LINK_INPUT_VALUE:
      return {...state, linkInputValue: action.linkInputValue};
    case ADD_BANNER_LINK_REQUEST_POST:
      return {...state, isAddingBannerLink: true};
    case ADD_BANNER_LINK_RECEIVE_SUCCESS_POST:
      return {...state, isAddingBannerLink: false, data: action.homepageData, modalVisible: false};
    case ADD_BANNER_LINK_RECEIVE_ERROR_POST:
      return {...state, isAddingBannerLink: false};
    case DELETE_BANNER_REQUEST_POST:
      return {...state, isDeletingBanner: true};
    case DELETE_BANNER_RECEIVE_SUCCESS_POST:
      return {...state, isDeletingBanner: false, data: action.homepageData};
    case DELETE_BANNER_RECEIVE_ERROR_POST:
      return {...state, isDeletingBanner: false};
    default:
      return state;
  }
}


export default homepage;
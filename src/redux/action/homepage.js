import fetch from 'isomorphic-fetch';
import Promise from 'promise-polyfill';
//兼容性处理
if(!window.Promise){
    window.Promise=Promise
}

export const GET_HOMEPAGE_DATA_REQUEST_POST = 'GET_HOMEPAGE_DATA_REQUEST_POST';

export const GET_HOMEPAGE_DATA_RECEIVE_SUCCESS_POST = 'GET_HOMEPAGE_DATA_RECEIVE_SUCCESS_POST';

export const GET_HOMEPAGE_DATA_RECEIVE_ERROR_POST = 'GET_HOMEPAGE_DATA_RECEIVE_ERROR_POST';

export const CHANGE_HOMEPAGE_DATA = 'CHANGE_HOMEPAGE_DATA';

export const CHANGE_MODAL_VISIBLE = 'CHANGE_MODAL_VISIBLE';

export const CHANGE_LINK_INPUT_VALUE = 'CHANGE_LINK_INPUT_VALUE';

export const ADD_BANNER_LINK_REQUEST_POST = 'ADD_BANNER_LINK_REQUEST_POST';

export const ADD_BANNER_LINK_RECEIVE_SUCCESS_POST = 'ADD_BANNER_LINK_RECEIVE_SUCCESS_POST';

export const ADD_BANNER_LINK_RECEIVE_ERROR_POST = 'ADD_BANNER_LINK_RECEIVE_ERROR_POST';

export const DELETE_BANNER_REQUEST_POST = 'DELETE_BANNER_REQUEST_POST';

export const DELETE_BANNER_RECEIVE_SUCCESS_POST = 'DELETE_BANNER_RECEIVE_SUCCESS_POST';

export const DELETE_BANNER_RECEIVE_ERROR_POST = 'DELETE_BANNER_RECEIVE_ERROR_POST';

export const doGetHomepageDataRequestPost = () => {
  return {
    type: GET_HOMEPAGE_DATA_REQUEST_POST
  }
}

export const doGetHomepageDataReceiveSuccessPost = (homepageData) => {
  return {
    type: GET_HOMEPAGE_DATA_RECEIVE_SUCCESS_POST,
    homepageData
  }
}

export const doGetHomepageDataReceiveErrorPost = () => {
  return {
    type: GET_HOMEPAGE_DATA_RECEIVE_ERROR_POST    
  }
}

export const doGetHomepageData = (successCallback) => (dispatch) => {
  dispatch(doGetHomepageDataRequestPost());
  return fetch('/server/homepage/data', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  }).then(res => {
    return res.json();
  }).then(res => {
    if(res.error){
      dispatch(doGetHomepageDataReceiveErrorPost())
    }
    else{
      dispatch(doGetHomepageDataReceiveSuccessPost(res.homepageData))
      successCallback && successCallback(res.homepageData)
    }
  })
}

export const doChangeHomepageData = (homepageData) => {
  return {
    type: CHANGE_HOMEPAGE_DATA,
    homepageData
  }
}

export const doChangeModalVisible = (modalVisible, currentUrl, linkInputValue) => {
  return {
    type: CHANGE_MODAL_VISIBLE,
    modalVisible,
    currentUrl,
    linkInputValue
  }
}

export const doChangeLinkInputValue = (linkInputValue) => {
  return {
    type: CHANGE_LINK_INPUT_VALUE,
    linkInputValue
  }
}

export const doAddBannerLinkRequestPost = () => {
  return {
    type: ADD_BANNER_LINK_REQUEST_POST
  }
}

export const doAddBannerLinkReceiveSuccessPost = (homepageData) => {
  return {
    type: ADD_BANNER_LINK_RECEIVE_SUCCESS_POST,
    homepageData
  }
}

export const doAddBannerLinkReceiveErrorPost = () => {
  return {
    type: ADD_BANNER_LINK_RECEIVE_ERROR_POST
  }
}

export const doAddBannerLink = (homepageId, url, link) => (dispatch) => {
  dispatch(doAddBannerLinkRequestPost());
  return fetch('/server/homepage/addBannerLink', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'homepageId=' + encodeURIComponent(homepageId) + '&url=' + encodeURIComponent(url) + '&link=' + encodeURIComponent(link)
  }).then(res => {
    return res.json();
  }).then(res => {
    if(!res.isSuccessful){
      dispatch(doAddBannerLinkReceiveErrorPost())
    }
    else{
      dispatch(doAddBannerLinkReceiveSuccessPost(res.homepageData))
    }
  })
}

export const doDeleteBannerRequestPost = () => {
  return {
    type: DELETE_BANNER_REQUEST_POST
  }
}

export const doDeleteBannerReceiveSuccessPost = (homepageData) => {
  return {
    type: DELETE_BANNER_RECEIVE_SUCCESS_POST,
    homepageData
  }
}

export const doDeleteBannerReceiveErrorPost = () => {
  return {
    type: DELETE_BANNER_RECEIVE_ERROR_POST
  }
}

export const doDeleteBanner = (homepageId, url) => (dispatch) => {
  dispatch(doDeleteBannerRequestPost());
  return fetch('/server/homepage/deleteHomepageBanner', {
    method: 'post',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: 'homepageId=' + decodeURIComponent(homepageId) + '&url=' + decodeURIComponent(url)
  }).then(res => {
    return res.json();
  }).then(res => {
    if(res.isSuccessful){
      dispatch(doDeleteBannerReceiveErrorPost())
    }
    else{
      dispatch(doDeleteBannerReceiveSuccessPost())
    }
  })
}
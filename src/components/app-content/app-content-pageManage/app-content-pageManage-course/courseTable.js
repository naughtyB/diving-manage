import React from 'react';
import { Table, Divider, Button, Spin, Popconfirm, message } from 'antd';
import { connect } from 'react-redux';
import { doGetCourseData, doChangeCourseFields, doDeleteCourse } from '../../../../redux/action/course.js';
import { doChangeManagerLoginState } from '../../../../redux/action/manager.js';

export class CourseTable extends React.Component{
  constructor(props){
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }
  componentWillMount(){
    this.props.onGetCourseData();
  }
  componentWillUpdate(nextProps){
    if(this.props.isDeletingCourse !== nextProps.isDeletingCourse && !nextProps.isDeletingCourse){
      this.props.onGetCourseData();
    }
  }
  handleAdd(){
    this.props.history.push({
      pathname: '/pageManage/course/modify',
      hash: 'type=add'
    });
    this.props.onChangeCourseFields({
      courseName: {
        value: ''
      }
    })
  }
  handleConfirm(courseId){
    this.props.onDeleteCourse(courseId, () => {
      message.info('删除成功')
    }, () => {
      this.props.onChangeManagerLoginState(false, {});
      message.info('请先登录');
    })
  }
  handleModify(courseId){
    this.props.history.push({
      pathname: '/pageManage/course/modify',
      hash: 'type=modify&courseId=' + courseId
    });
  }
  render(){
    let { courseData, isGettingCourseData, isDeletingCourse } = this.props;
    if(courseData){
      const columns = [{
        title: '潜水课程名称',
        dataIndex: 'courseName',
        key: 'name'
      }, {
        title: '详细内容',
        dataIndex: 'isEdited',
        key : 'isEdited'
      },{
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            <span style={{color: '#1890ff'}}>
              <span style={{cursor: 'pointer'}} onClick={()=>this.handleModify(text['key'])}>修改</span>
              <Divider type="vertical" />
              <Popconfirm title="确定要删除吗" onConfirm={()=>this.handleConfirm(text['key'])}>
                <span style={{cursor: 'pointer'}}>删除</span>
              </Popconfirm>
            </span>
          )
        },
      }];
      courseData = this.props.courseData.map((item, index) => {
        return {
          key: item['_id'],
          courseName: item.name,
          isEdited: item.detail ? '已编辑' : '未编辑'
        }
      })
      return (
        <Spin spinning={isGettingCourseData || isDeletingCourse}>
          <div>
            <Button type="primary" onClick={this.handleAdd} style={{marginBottom: '12px'}}>新建</Button>
            <Table columns={columns} dataSource={courseData} />
          </div>
        </Spin>
      )
    }
    else{
      <Spin spinning={isGettingCourseData || isDeletingCourse}>
        <div style={{height: '300px'}}></div>
      </Spin>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    courseData: state.course.courseData,
    isGettingCourseData: state.course.isGettingCourseData,
    isDeletingCourse: state.course.isDeletingCourse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetCourseData: () => dispatch(doGetCourseData()),
    onChangeCourseFields: (fieldsChanged) => dispatch(doChangeCourseFields(fieldsChanged)),
    onDeleteCourse: (courseId, successCallback, notLoggedCallback) => dispatch(doDeleteCourse(courseId, successCallback, notLoggedCallback)),
    onChangeManagerLoginState: (loginState, managerData) => dispatch(doChangeManagerLoginState(loginState, managerData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseTable);
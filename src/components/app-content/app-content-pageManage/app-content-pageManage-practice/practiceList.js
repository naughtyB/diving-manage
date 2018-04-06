import React from 'react';
import { Card, Icon, Avatar, message, Spin } from 'antd';
import { doGetPracticeData } from '../../../../redux/action/practice.js';
import { connect } from 'react-redux';
import './index.css';
const { Meta } = Card;

export class PracticeList extends React.Component{
  componentWillMount(){
    this.props.onGetPracticeData(() => {
      message.info('获取数据失败，请重新刷新')
    })
  }
  render(){
    return (
      <div className="app-content-pageManage-practice-list app-scrollbar">
        <div className="brief-introduction">
          <div className="brief-introduction-left">
            <h2 className="brief-introduction-left-title">潜水练习列表</h2>
            <p>段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态， 提供跨越设计与开发的体验解决方案。</p>
          </div>
          <div className="brief-introduction-right">
            <img className="brief-introduction-right-img" src="http://localhost:8000/public/image/practice/RzwpdLnhmvDJToTdfDPe.png" alt=""/>
          </div>
        </div>
        <Spin spinning={this.props.isGettingPracticeData}>
          <div className="list-introduction">
            <ul className="list">
              <li className="list-each">
                <div className="list-each-add">+ 新增练习</div>
              </li>
              {
                this.props.practiceData.map((item, index) => {
                  return (
                    <li className="list-each" key={index}>
                      <Card
                        style={{ width: '100%', height: '100%' }}
                        actions={[<span>编辑</span>,<span>删除</span>]}
                      >
                        <Meta
                          avatar={<Avatar src={item.imgUrl} alt=""/>}
                          title={item.name}
                          description={item.price}
                        />
                      </Card>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </Spin>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isGettingPracticeData: state.practice.isGettingPracticeData,
    practiceData: state.practice.practiceData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onGetPracticeData: (errCallback) => dispatch(doGetPracticeData(errCallback))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PracticeList);
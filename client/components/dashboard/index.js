import React, { Component } from 'react';
import Helmet from 'react-helmet';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';
import css from './styles';
import ReactSwipe from 'react-swipe';
import { Player } from 'video-react';
import "./video-react";

class Cards extends React.Component {

  render() {
    return <div className={css['swipe-item']}>
    <div className={bootstrap['card']}>
      <div className={bootstrap['card-header']}>
        {this.props.title}
      </div>
      <div className={bootstrap['card-body']}>
        {this.props.children}
      </div>
    </div>
    </div>

  }
}

class Carousel extends React.Component {
    render() {
        return (
            <ReactSwipe className={['carousel', css['swipe-wrap']].join(' ')} swipeOptions={{continuous: true, auto: 3000 }}>
                <Cards title="Test1">
                  <Player fluid={false} width={400} height={400}
                    playsInline
                    poster="/assets/poster.png"
                    src="https://s3.amazonaws.com/anychange/v1.mp4"
                  />
                   <a href="https://s3.amazonaws.com/anychange/v1.mp4">https://s3.amazonaws.com/anychange/v1.mp4</a>
                </Cards>

                <Cards title="Test2">
                  <Player  fluid={false} width={400} height={400}
                    playsInline
                    poster="/assets/poster.png"
                    src="https://s3.amazonaws.com/anychange/v1.mp4"
                  />
                  <a href="https://s3.amazonaws.com/anychange/v1.mp4">https://s3.amazonaws.com/anychange/v1.mp4</a>
                </Cards>

                <Cards title="Test3">
                  <Player  fluid={false} width={400} height={400}
                    playsInline
                    poster="/assets/poster.png"
                    src="https://s3.amazonaws.com/anychange/v1.mp4"
                  />
                   <a href="https://s3.amazonaws.com/anychange/v1.mp4">https://s3.amazonaws.com/anychange/v1.mp4</a>
                </Cards>   

                <Cards title="Test4">
                  <Player  fluid={false} width={400} height={400}
                    playsInline
                    poster="/assets/poster.png"
                    src="https://s3.amazonaws.com/anychange/v1.mp4"
                  />
                </Cards>

                <Cards title="Test5">
                  <Player  fluid={false} width={400} height={400}
                    playsInline
                    poster="/assets/poster.png"
                    src="https://s3.amazonaws.com/anychange/v1.mp4"
                  />
                </Cards>


                <Cards title="Test6">
                  <Player  fluid={false} width={400} height={400}
                    playsInline
                    poster="/assets/poster.png"
                    src="https://s3.amazonaws.com/anychange/v1.mp4"
                  />
                </Cards>


                <Cards title="Test7">
                  End
                </Cards>
       
            </ReactSwipe>
        );
    }
}

export default class Dashboard extends Component {

  constructor() {
    super();
    this.checkLogin();

  }

  checkLogin() {
    return axios.post('/api/login/check', {})
      .then((result) => {
      result = result.data;

      if( result.status == 1 ) {
        //alert( result.msg );
      }
    }).catch(function (error) {
       window.location.href = '/';
    });    
  }

  static onEnter({store, nextState, replaceState, callback}) {
    callback();
  }

  render() {
    
     return <div>
       <Helmet title='Dashboard' />
           <Carousel />
        </div>;
  }

}

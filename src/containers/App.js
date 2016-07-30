import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../Actions';
import About from '../components/About';
import Activity from '../components/Activity';
import Logo from '../components/Logo';
import styles from './app.css';

class App extends Component {

  static defaultProps = {
    actions: {},
    posts: [],
    repos: [],
    tweets: [],
  };

  static propTypes = {
    actions: PropTypes.object.isRequired,
    posts: PropTypes.array,
    repos: PropTypes.array,
    tweets: PropTypes.array,
  };

  componentDidMount() {
    this.props.actions.getGithubRepos();
    this.props.actions.getMediumPosts();
    this.props.actions.getTwitterTweets();
  }

  render() {
    return (
      <div
        className={styles.container}
      >
        <div
          className={styles.content}
        >
          <Logo />
          <About />
          <Activity
            posts={this.props.posts}
            repos={this.props.repos}
            tweets={this.props.tweets}
          />
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    ...state,
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(mapState, mapDispatch)(App);

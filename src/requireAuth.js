import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function(ComposedComponent) {
	class Authentication extends Component {
		static contextTypes = {
			router: React.PropTypes.object
		}

		componentWillMount() {
			if (!this.props.isLoggedIn && !this.props.demoMode) {
        alert("You must login or select demo to access this page")
				this.context.router.push('/')
			}
		}

		render() {
			return <ComposedComponent {...this.props} />
		}
	}

	function mapStateToProps(state) {
    console.log("mapping updated state ", state.username, state.demoMode)
		return {
			isLoggedIn : state.username,
      demoMode: state.demoMode
		}
	}

	return connect(mapStateToProps)(Authentication)
}

var React = require('react'),
	R = require('ramda'),
	cx = require('../support/utils').cx;

var PlatformStore = require('../stores/PlatformStore'),
	PlatformActions = require('../actions/PlatformActions');

var Tabs = React.createClass({
	getInitialState: function() {
		return { active: 0 };
	},
	_toggleTab: function(i) {
		return function() {
			PlatformActions.updatePlatform(i);
			this.setState({ active: i });
		}.bind(this);
	},
	render: function() {
		var self = this;

		var names = R.mapIndexed(function(val , i) {
			var classes = {
				'btn btn-default': true,
				'btn-inactive': i != self.state.active
			};
			return (<a key={ i } className={ cx(classes) } onClick={ self._toggleTab(i) }>{ val.props.name }</a>);
		}, this.props.children);

		return (
			<div className="tabs">
				<div className="row">
					{ this.props.children[this.state.active] }
				</div>
				<div className="row switcher">
					<div className="float-right">
						{ names }
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Tabs;

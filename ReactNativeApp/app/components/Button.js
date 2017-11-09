import React from 'react';
import {
  StyleSheet,
  PropTypes,
  Text,
  TouchableOpacity,
  View
} from 'react-native';


const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 9,
    paddingHorizontal: 15,
    overflow: "hidden",
    backgroundColor: "#00aeef"
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700"
  }
});

class Button extends React.Component {
  render() {
    let textStyle = [styles.buttonText, this.props.textStyle];

    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity}
        onPress={() => this.onPress()}
        style={[styles.button, this.props.style]}
      >
        <Text style={textStyle}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }

  onPress() {
    if (this.props.enabled) {
      this.props.onPress();
    }
  }
}

Button.propTypes = {
  onPress: React.PropTypes.func,
  style: View.propTypes.style,
  textStyle: Text.propTypes.style,
  activeOpacity: React.PropTypes.number,
  enabled: React.PropTypes.bool,
  children: React.PropTypes.string
};

Button.defaultProps = {
  onPress: () => {},
  style: {},
  textStyle: {},
  activeOpacity: 0.8,
  enabled: true
};

export default Button;

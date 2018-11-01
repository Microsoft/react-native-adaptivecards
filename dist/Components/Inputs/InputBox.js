import * as React from 'react';
import { TextInput, } from 'react-native';
import { StyleConfig } from '../../Styles/StyleConfig';
export class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.onValueChange = (value) => {
            if (this.props.onValueChange) {
                this.props.onValueChange(value);
            }
        };
        this.onBlur = () => {
            this.setState({ focused: false }, () => {
                this.validateInput();
                if (this.props.onBlur) {
                    this.props.onBlur();
                }
            });
        };
        this.onFocus = () => {
            this.setState({
                focused: true
            }, () => {
                if (this.props.onFocus) {
                    this.props.onFocus();
                }
            });
        };
        this.state = {
            focused: false,
        };
    }
    render() {
        return (React.createElement(TextInput, { style: [
                {
                    flex: this.props.flex,
                    color: this.color,
                    fontSize: this.fontSize,
                    lineHeight: this.lineHeight,
                    fontWeight: this.fontWeight,
                    backgroundColor: this.backgroundColor,
                    width: this.props.width,
                    height: this.props.height || this.height,
                    borderColor: this.borderColor,
                    borderWidth: 1,
                    borderRadius: 4,
                    marginTop: this.props.marginTop,
                    marginRight: this.props.marginRight,
                    marginBottom: this.props.marginBottom,
                    marginLeft: this.props.marginLeft,
                    paddingTop: this.paddingVertical,
                    paddingRight: this.paddingHorizontal,
                    paddingBottom: this.paddingVertical,
                    paddingLeft: this.paddingHorizontal,
                },
                this.props.style
            ], multiline: this.isMultiLine, numberOfLines: this.props.numberOfLines, keyboardType: this.props.keyboardType, blurOnSubmit: !this.isMultiLine, placeholder: this.props.placeholder, value: this.props.value, returnKeyType: this.props.returnKeyType, underlineColorAndroid: 'transparent', importantForAccessibility: 'no-hide-descendants', onChangeText: this.onValueChange, onFocus: this.onFocus, onBlur: this.onBlur }));
    }
    validateInput() {
        if (this.props.validateInput) {
            if (this.props.validateInput(this.props.value)) {
                console.log('Input: valid');
            }
            else {
                console.log('Input: invalid');
            }
        }
    }
    get isMultiLine() {
        return this.props.numberOfLines && this.props.numberOfLines > 1;
    }
    get lineHeight() {
        return this.fontSize * 1.2;
    }
    get fontSize() {
        return StyleConfig.getFontSize('default');
    }
    get fontWeight() {
        return StyleConfig.getFontWeight('default');
    }
    get paddingVertical() {
        return 12;
    }
    get paddingHorizontal() {
        return 12;
    }
    get numberOfLine() {
        if (this.props.numberOfLines && this.props.numberOfLines > 0) {
            return this.props.numberOfLines;
        }
        return 1;
    }
    get height() {
        return this.lineHeight * this.numberOfLine + this.paddingVertical * 2 + 2;
    }
    get color() {
        if (this.state.focused) {
            return StyleConfig.getInputFocusColor(this.props.theme);
        }
        else {
            return StyleConfig.getInputColor(this.props.theme);
        }
    }
    get backgroundColor() {
        if (this.state.focused) {
            return StyleConfig.getInputFocusBackgroundColor(this.props.theme);
        }
        else {
            return StyleConfig.getInputBackgroundColor(this.props.theme);
        }
    }
    get borderColor() {
        if (this.state.focused) {
            return StyleConfig.getInputFocusBorderColor(this.props.theme);
        }
        else {
            return StyleConfig.getInputBorderColor(this.props.theme);
        }
    }
}

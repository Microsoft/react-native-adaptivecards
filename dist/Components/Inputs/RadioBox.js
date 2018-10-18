import * as React from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleConfig } from '../../Styles/StyleConfig';
export class RadioBox extends React.Component {
    constructor() {
        super(...arguments);
        this.onClick = () => {
            console.log('RadioBox clicked');
            if (this.props.onActive) {
                this.props.onActive(this.props.value);
            }
        };
    }
    render() {
        return (React.createElement(TouchableWithoutFeedback, { onPress: this.onClick },
            React.createElement(View, { style: [
                    {
                        flexDirection: 'row',
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        paddingTop: 18,
                    }
                ] },
                React.createElement(Icon, { name: this.radioIcon, size: 24, color: this.radioColor, style: {
                        paddingTop: 4,
                    } }),
                React.createElement(Text, { style: {
                        color: this.color,
                        fontSize: StyleConfig.getFontSize('default'),
                        fontWeight: StyleConfig.getFontWeight('default'),
                        textAlign: StyleConfig.getTextAlign('left'),
                        width: 0,
                        flex: 1,
                        flexWrap: StyleConfig.getWrap(true),
                        paddingLeft: 16,
                    } }, this.props.title))));
    }
    get color() {
        return StyleConfig.getCheckboxTitleColor(this.props.theme);
    }
    get radioColor() {
        return StyleConfig.getCheckboxBoxColor(this.props.theme, this.props.activated);
    }
    get radioIcon() {
        if (this.props.activated) {
            return 'radio-button-checked';
        }
        else {
            return 'radio-button-unchecked';
        }
    }
}

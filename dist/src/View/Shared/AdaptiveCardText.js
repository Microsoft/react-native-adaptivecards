import React from 'react';
import { Text, } from 'react-native';
import { styleManager } from '../Styles/StyleManager';
export class AdaptiveCardText extends React.PureComponent {
    constructor(props) {
        super(props);
        this.fontFamily = styleManager.getFontFamily();
    }
    render() {
        const { style, children } = this.props;
        return (React.createElement(Text, Object.assign({}, this.props, { style: [
                {
                    fontFamily: this.fontFamily || undefined,
                },
                style
            ] }), children));
    }
}

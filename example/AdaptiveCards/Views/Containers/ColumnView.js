import React from 'react';
import { View, } from 'react-native';
import { ColumnWidth } from '../../Shared/Enums';
import { ContentElementView } from '../Factories/ContentElementView';
export class ColumnView extends React.PureComponent {
    render() {
        const { element } = this.props;
        if (!element || !element.isValid() || !element.hasItems()) {
            return null;
        }
        return (React.createElement(View, { style: this.getViewStyle() }, element.items.map((cardElement, index) => React.createElement(ContentElementView, { key: 'containerItems' + index, index: index, element: cardElement }))));
    }
    getViewStyle() {
        const { element, containerWidth } = this.props;
        if (element.isFixedWidth()) {
            if (element.width < 10) {
                return {
                    flex: element.width,
                };
            }
            else if (containerWidth) {
                return {
                    width: containerWidth * (element.width / 100),
                };
            }
            else {
                return;
            }
        }
        else {
            return {
                flex: element.width === ColumnWidth.Auto ? 0 : 1,
                alignSelf: element.width,
            };
        }
    }
}
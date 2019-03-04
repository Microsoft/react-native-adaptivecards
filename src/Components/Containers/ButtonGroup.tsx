import * as React from 'react';
import { View } from 'react-native';
import { StyleManager } from '../../Styles/StyleManager';

interface IProps {
    hasSpacing: boolean;
    flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
}

export class ButtonGroup extends React.Component<IProps> {
    public render() {
        return (
            <View
                style={[
                    {
                        flexDirection: this.props.flexDirection,
                        alignSelf: 'stretch',
                    },
                    this.topStyles
                ]}
            >
                {this.props.children}
            </View>
        );
    }

    private get topStyles() : any {
        if (this.props.hasSpacing) {
            return {
                marginTop: StyleManager.actionSetSpacing,
                paddingTop: 12,
                justifyContent: 'center',
                borderTopWidth: StyleManager.separatorThickness,
                borderTopColor: StyleManager.separatorColor
            };
        }
        return {};
    }
}

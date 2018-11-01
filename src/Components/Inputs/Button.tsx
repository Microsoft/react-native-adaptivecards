import * as React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { Image } from '../Basic/Image';
import { Touchable } from '../Basic/Touchable';

interface IButtonIcon {
    url: string;
    type: 'img';
    width?: number;
    height?: number;
    position?: 'left' | 'top' | 'right' | 'bottom';
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
}

interface IButtonSymbol {
    url: string;
    type: 'symbol';
    fontFamily?: string;
    color?: string;
    width?: number;
    height?: number;
    position?: 'left' | 'top' | 'right' | 'bottom';
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
}

interface IProps {
    title: string;
    icon?: IButtonIcon | IButtonSymbol;
    onPress: () => void;
    disabled?: boolean;
    color?: string;
    backgroundColor?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: 'normal' | 'bold' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    textHorizontalAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    textVerticalAlign?: 'flex-start' | 'flex-end' | 'center';
    wrap?: 'wrap' | 'nowrap';
    borderColor?: string;
    borderRadius?: number;
    borderWidth?: number;
    flex?: number;
    width?: number;
    height?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
    style?: StyleProp<ViewStyle>;
}

export class Button extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <Touchable
                testId={this.props.title}
                onPress={this.props.onPress}
                disabled={this.props.disabled}
                accessibilityLabel={'Button ' + this.props.title}
                style={[
                    {
                        flex: this.props.flex,
                        width: this.props.width,
                        height: this.props.height,
                        marginTop: this.props.marginTop,
                        marginRight: this.props.marginRight,
                        marginBottom: this.props.marginBottom,
                        marginLeft: this.props.marginLeft,
                        paddingTop: this.props.paddingTop,
                        paddingRight: this.props.paddingRight,
                        paddingBottom: this.props.paddingBottom,
                        paddingLeft: this.props.paddingLeft,
                        backgroundColor: this.props.backgroundColor,
                        borderColor: this.props.borderColor,
                        borderRadius: this.props.borderRadius,
                        borderWidth: this.props.borderWidth,
                    }, this.props.style
                ]}
            >
                <View
                    style={{
                        flexDirection: this.layoutDirection,
                        flex: 0,
                        justifyContent: this.props.textVerticalAlign,
                    }} pointerEvents='none'
                >
                    {this.renderIcon()}
                    {this.renderTitle()}
                </View>
            </Touchable>
        );
    }

    private renderIcon() {
        if (this.props.icon && this.props.icon.url) {
            if (this.props.icon.type === 'img') {
                return (
                    <Image
                        url={this.props.icon.url}
                        width={this.props.icon.width}
                        height={this.props.icon.height}
                        marginTop={this.props.icon.marginTop}
                        marginRight={this.props.icon.marginRight}
                        marginBottom={this.props.icon.marginBottom}
                        marginLeft={this.props.icon.marginLeft}
                    />
                );
            } else {
                return (
                    <Text
                        style={{
                            textAlign: 'center',
                            color: this.props.icon.color,
                            fontSize: this.props.icon.width,
                            fontFamily: this.props.icon.fontFamily,
                            lineHeight: this.props.icon.height,
                            marginTop: this.props.icon.marginTop,
                            marginRight: this.props.icon.marginRight,
                            marginBottom: this.props.icon.marginBottom,
                            marginLeft: this.props.icon.marginLeft,
                        }}
                    >
                        {this.props.icon.url}
                    </Text>
                );
            }
        }
        return undefined;
    }

    private renderTitle() {
        return (
            <Text
                accessible={false}
                adjustsFontSizeToFit={true}
                allowFontScaling={true}
                numberOfLines={1}
                style={{
                    flex: this.props.flex,
                    color: this.props.color,
                    fontFamily: this.props.fontFamily,
                    fontSize: this.props.fontSize,
                    fontWeight: this.props.fontWeight,
                    flexWrap: this.props.wrap,
                    textAlign: this.props.textHorizontalAlign,
                }}
            >
                {this.props.title}
            </Text>
        );
    }

    private get layoutDirection() {
        if (this.props.icon) {
            switch (this.props.icon.position) {
                case 'top':
                    return 'column';
                case 'bottom':
                    return 'column-reverse';
                case 'left':
                    return 'row';
                case 'right':
                    return 'row-reverse';
                default:
                    return 'row';
            }
        }
        return 'row';
    }
}

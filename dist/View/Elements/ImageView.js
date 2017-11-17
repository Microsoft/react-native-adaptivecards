import React from 'react';
import { View, Text, Image, StyleSheet, } from 'react-native';
import { HorizontalAlignment, ImageSize, ImageStyle, FlexImageAlignment, } from '../../Schema/enums';
import styleManager from '../Style/styleManager';
import CardElementWrapper from '../Shared/CardElementWrapper';
const IMAGEMINSIZE = 18;
var ImageFit;
(function (ImageFit) {
    ImageFit[ImageFit["FlexibleWidth"] = 0] = "FlexibleWidth";
    ImageFit[ImageFit["FlexibleHeight"] = 1] = "FlexibleHeight";
})(ImageFit || (ImageFit = {}));
export default class ImageView extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onLayout = (event) => {
            const { image } = this.props;
            if (image.isFixedSize()) {
                return;
            }
            let width = event.nativeEvent.layout.width;
            let height = event.nativeEvent.layout.height;
            console.log('AdaptiveCard Image onLayout', width, height);
            if (!this.fitStyle) {
                this.fitStyle = width !== 0 && height === 0 ? 1 : 0;
            }
            this.setState({
                viewWidth: width,
                viewHeight: height
            });
        };
        this.onLoad = () => {
            const { image } = this.props;
            Image.getSize(image.url, (width, height) => {
                console.log('AdaptiveCard Image getSize', width, height);
                if (!this.isComponentUnmounted && width) {
                    this.setState({
                        imageAspectRatio: height / width
                    });
                }
            }, (error) => {
                console.error('failed to get image size of commute url, error');
            });
        };
        this.onError = () => {
            if (!this.isComponentUnmounted) {
                this.setState({
                    imageLoadSuccess: false,
                });
            }
        };
        this.getDimensionsForBestFit = () => {
            if (this.state.imageAspectRatio) {
                switch (this.fitStyle) {
                    case 1:
                        if (this.state.viewWidth) {
                            return {
                                height: Math.floor(this.state.viewWidth * this.state.imageAspectRatio),
                                width: this.state.viewWidth
                            };
                        }
                        break;
                    case 0:
                        if (this.state.viewHeight) {
                            let dimensions = {
                                width: Math.floor(this.state.viewHeight / this.state.imageAspectRatio),
                                height: this.state.viewHeight
                            };
                            if (this.state.viewWidth && dimensions.width > this.state.viewWidth) {
                                dimensions.width = this.state.viewWidth;
                            }
                            return dimensions;
                        }
                        break;
                }
            }
            else if (this.fitStyle !== undefined) {
                return {
                    width: this.state.viewWidth || IMAGEMINSIZE,
                    height: this.state.viewHeight || IMAGEMINSIZE
                };
            }
            return undefined;
        };
        this.state = {
            viewWidth: 0,
            viewHeight: 0,
            imageAspectRatio: 1,
            imageLoadSuccess: true,
        };
    }
    componentWillUnmount() {
        this.isComponentUnmounted = true;
    }
    render() {
        const { image, index } = this.props;
        if (!image || !image.isValid()) {
            return null;
        }
        const dimensions = image.isFixedSize() ?
            {
                width: styleManager.getImageSize(image.size),
                height: styleManager.getImageSize(image.size),
            } :
            this.getDimensionsForBestFit();
        const borderRadius = image.style === ImageStyle.Person && dimensions ?
            dimensions.width / 2 :
            undefined;
        return React.createElement(CardElementWrapper, { cardElement: image, index: index, style: styleManager.isHorizontalImageSet() ? undefined : { flex: 1 } },
            React.createElement(View, { style: { flex: 1 }, onLayout: this.onLayout },
                this.state.imageLoadSuccess ?
                    undefined :
                    this.renderPlaceholder(),
                React.createElement(Image, { accessible: !!image.altText, accessibilityLabel: image.altText || undefined, style: {
                        overflow: 'hidden',
                        width: dimensions ? dimensions.width : undefined,
                        height: dimensions ? dimensions.height : undefined,
                        alignSelf: this.getImageAlignment(image.horizontalAlignment, image.size),
                        borderRadius: borderRadius
                    }, source: { uri: image.url }, onLoad: this.onLoad, onError: this.onError, resizeMode: 'cover', resizeMethod: 'auto' })));
    }
    renderPlaceholder() {
        return React.createElement(View, { style: [
                StyleSheet.absoluteFill,
                {
                    alignItems: 'center',
                    justifyContent: 'center'
                }
            ] },
            React.createElement(Text, { style: {
                    fontSize: 32,
                    color: 'rgba(0, 0, 0, 0.5)',
                    textAlign: 'center'
                } }, '\uE601'));
    }
    getImageAlignment(alignment, imageSize) {
        let imageAlignment;
        if (imageSize === ImageSize.Stretch) {
            imageAlignment = FlexImageAlignment.Stretch;
        }
        else {
            switch (alignment) {
                case HorizontalAlignment.Left:
                    imageAlignment = FlexImageAlignment.FlexStart;
                    break;
                case HorizontalAlignment.Right:
                    imageAlignment = FlexImageAlignment.FlexEnd;
                    break;
                case HorizontalAlignment.Center:
                default:
                    imageAlignment = FlexImageAlignment.Center;
                    break;
            }
        }
        return imageAlignment;
    }
}

import * as React from 'react';
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native';
import { ButtonGroup } from '../../Components/Containers/ButtonGroup';
import { Card } from '../../Components/Containers/Card';
import { CardModel } from '../../Models/Cards/Card';
import { StyleManager } from '../../Styles/StyleManager';
import { ActionFactory } from '../Factories/ActionFactory';
import { ContentFactory } from '../Factories/ContentFactory';
import { DebugOutputFactory } from '../Factories/DebugOutputFactory';

interface IProps {
    index: number;
    model: CardModel;
    theme: 'default' | 'emphasis';
    style?: StyleProp<ViewStyle>;
}

interface IState {
    subCard?: CardModel;
    width: number;
}

export class AdaptiveCardView extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            subCard: undefined,
            width: 0,
        };
        this.props.model.context.registerShowCardActionHandler(this.showSubCard);
    }

    public render(): JSX.Element {
        const { model, theme } = this.props;

        if (!model || !model.isSchemaCheckPassed) {
            return DebugOutputFactory.createDebugOutputBanner(model.type + '>>' + model.id + ' is not valid', theme, 'error');
        }

        return (
            <Card
                flex={1}
                fit='container'
                backgroundImageUrl={model.backgroundImage}
                onLayout={this.onLayout}
                style={[
                    {
                        minHeight: this.minHeight,
                    },
                    this.props.style
                ]}
            >
                {this.renderBody()}
                {this.renderSubCard()}
                {this.renderActionSet()}
            </Card>
        );
    }

    private renderBody(): JSX.Element {
        const { model } = this.props;

        if (!model || !model.body) {
            return undefined;
        }

        return (
            <View
                style={{
                    flexDirection: 'column',
                    alignSelf: 'stretch',
                    flex: 1
                }}
            >
                {
                    this.props.model.body.map((content, index) =>
                        ContentFactory.createView(content, index, this.props.theme)
                    )
                }
            </View>
        );
    }

    private renderActionSet(): JSX.Element {
        const { model } = this.props;

        if (!model || !model.actions || model.actions.length === 0) {
            return undefined;
        }

        return (
            <ButtonGroup
                hasSpacing={model && model.body && model.body.length > 0}
                flexDirection={this.buttonFlexDirection}
            >
                {this.renderActions()}
            </ButtonGroup>
        );
    }

    private renderActions(): JSX.Element[] {
        const { model, theme } = this.props;

        if (!model || !model.actions) {
            return undefined;
        }

        return model.actions.map((action, index) => {
            return ActionFactory.createAction(action, index, theme);
        });
    }

    private renderSubCard(): JSX.Element {
        if (this.state.subCard) {
            return (
                <AdaptiveCardView
                    index={2}
                    model={this.state.subCard}
                    style={{
                        marginTop: StyleManager.subCardSpacing
                    }}
                    theme={StyleManager.subCardTheme}
                />
            );
        }
        return undefined;
    }

    private showSubCard = (card: CardModel) => {
        console.log('Show Card');
        this.setState({
            subCard: undefined,
        }, () => {
            if (card) {
                this.setState({
                    subCard: card
                });
            }
        });
        return Promise.resolve(true);
    }

    private onLayout = (event: LayoutChangeEvent) => {
        this.setState({
            width: event.nativeEvent.layout.width,
        });
    }

    private get minHeight() {
        const { model } = this.props;

        if (model) {
            if (model.context && model.context.fit === 'background') {
                // Fix for bing answer card
                let padding = 12;
                if (model.backgroundImage) {
                    padding = 0;
                }
                return (this.state.width - padding * 2) * 150 / 285 + padding * 2;
            }
        }
        return undefined;
    }

    private get buttonFlexDirection() {
        const { model } = this.props;

        return model.actions.length > 2 ? 'column' : 'row';
    }
}

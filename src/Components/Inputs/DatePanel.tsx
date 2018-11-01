import * as React from 'react';

import { DatePickerAndroid, DatePickerIOS, Platform } from 'react-native';
import { StyleConfig } from '../../Styles/StyleConfig';
import { TimeUtils } from '../../Utils/Time';
import { ButtonGroup } from '../Containers/ButtonGroup';
import { Card } from '../Containers/Card';
import { ModalBox } from '../Containers/ModalBox';
import { Button } from './Button';

interface IProps {
    value: string;
    show: boolean;
    onValueChange: (value: string) => void;
    onSave: () => void;
    onCancel: () => void;
}

export class DatePanel extends React.Component<IProps> {
    public componentDidUpdate(prevProps: IProps) {
        if (Platform.OS === 'android' && this.props.show && !prevProps.show) {
            this.showPickerAndroid();
        }
    }

    public render() {
        if (Platform.OS === 'ios') {
            return (
                <ModalBox
                    show={this.show}
                    onBackgroundPress={this.onCancel}
                    onRequestClose={this.onSave}
                >
                    <Card
                        flex={0}
                        fit='content'
                    >
                        <DatePickerIOS
                            date={TimeUtils.extractDate(this.props.value)}
                            mode='date'
                            onDateChange={this.onDateChange}
                        />
                        <ButtonGroup
                            hasSpacing={true}
                        >
                            {this.renderCancelButton()}
                            {this.renderSaveButton()}
                        </ButtonGroup>
                    </Card>
                </ModalBox>
            );
        }
        return null;
    }

    private renderCancelButton() {
        return (
            <Button
                flex={1}
                title='Cancel'
                color={StyleConfig.getColor('accent', 'default', false)}
                fontSize={StyleConfig.getFontSize('default')}
                fontWeight={StyleConfig.getFontWeight('bolder')}
                backgroundColor={StyleConfig.getBackgroundColor('default')}
                textHorizontalAlign='center'
                textVerticalAlign='center'
                paddingTop={6}
                paddingBottom={6}
                paddingLeft={16}
                paddingRight={16}
                onPress={this.onCancel}
            />
        );
    }

    private renderSaveButton() {
        return (
            <Button
                flex={1}
                title='Save'
                color={StyleConfig.getColor('accent', 'default', false)}
                fontSize={StyleConfig.getFontSize('default')}
                fontWeight={StyleConfig.getFontWeight('bolder')}
                backgroundColor={StyleConfig.getBackgroundColor('default')}
                textHorizontalAlign='center'
                textVerticalAlign='center'
                paddingTop={6}
                paddingBottom={6}
                paddingLeft={16}
                paddingRight={16}
                onPress={this.onSave}
                style={{
                    borderLeftWidth: 1,
                    borderLeftColor: StyleConfig.separatorColor,
                }}
            />
        );
    }

    private async showPickerAndroid() {
        if (Platform.OS === 'android') {
            const today = TimeUtils.extractDate(this.props.value);
            try {
                const { action, year, month, day } = await DatePickerAndroid.open({
                    date: today,
                });
                if (action === DatePickerAndroid.dateSetAction) {
                    let newDate = new Date(year, month, day);
                    this.onDateChange(newDate);
                    this.onSave();
                }
                if (action === DatePickerAndroid.dismissedAction) {
                    this.setState({
                        showDatePicker: false
                    }, this.onCancel);
                }
            } catch ({ code, message }) {
                console.warn('Cannot open date picker', message);
            }
        }
    }

    private onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel();
        }
    }

    private onSave = () => {
        if (this.props.onSave) {
            this.props.onSave();
        }
    }

    private onDateChange = (date: Date) => {
        if (this.props.onValueChange) {
            this.props.onValueChange(TimeUtils.getDateString(date));
        }
    }

    private get show() {
        return this.props.show && Platform.OS === 'ios';
    }
}

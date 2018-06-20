import React from 'react';
import { View } from 'react-native';

import { FactElement } from '../../Schema/Containers/Fact';
import { FactSetElement } from '../../Schema/Containers/FactSet';
import { IElementViewProps } from '../Shared/BaseProps';
import { FactView } from './FactView';

interface IProps extends IElementViewProps<FactSetElement> {
    element: FactSetElement;
}
interface IState {
}

export class FactSetView extends React.PureComponent<IProps, IState> {
    public render(): JSX.Element {
        const { element } = this.props;

        if (!element || !element.isValid() || !element.hasFacts()) {
            return null;
        }

        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                {
                    element.facts.map((fact: FactElement, index: number) =>
                        <FactView
                            key={'fact' + index}
                            element={fact}
                        />
                    )
                }
            </View>
        );
    }
}

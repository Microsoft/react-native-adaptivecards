import { ElementType } from '../../../Shared/Types';
import { ViewNode } from '../Abstract/ViewNode';
import { FactSetNode } from './FactSet';

export class FactNode extends ViewNode {
    public parent: FactSetNode;
    public readonly type = ElementType.Fact;
    public readonly title: string;
    public readonly value: string;

    constructor(parent: FactSetNode, json: any) {
        super(parent, json);

        this.title = json.title;
        this.value = json.value;
    }
}

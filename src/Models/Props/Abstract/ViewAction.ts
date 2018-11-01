import { ViewActionType } from '../../../Shared/Types';
import { ViewNode } from '../../Nodes/Abstract/ViewNode';
import { AbstractAction } from './AbstractAction';

export abstract class ViewAction extends AbstractAction {
    public abstract readonly type: ViewActionType;
    public readonly visible = true;
    public readonly title: string;
    public readonly iconUrl: string;

    constructor(node: ViewNode, json: any) {
        super(node);
        
        this.title = json.title;
        this.iconUrl = json.iconUrl;
    }
}

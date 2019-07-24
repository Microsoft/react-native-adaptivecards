import { SchemaMessage, SchemaResult, SchemaValidator } from '../../Schemas/SchemaValidator';
import { TreeNode } from '../../Shared/Types';
export class AbstractModel extends TreeNode {
    constructor(json, parent, context) {
        super(parent);
        this.path = [];
        this.context = context;
        this.rawData = json;
        this.type = json.type || this.type;
        this.schemaCheckResult = this.shallowCheckSchema(json);
        if (this.context) {
            this.context.fit = 'content';
        }
        this.outputSchemaMessage();
        if (parent === undefined) {
            if (this.type === undefined) {
                this.path.push('undefined type');
            }
            else {
                this.path.push(this.type);
            }
        }
        else {
            this.path = parent.path.slice(0);
            if (this.type === undefined) {
                this.path.push('undefined type');
            }
            else {
                this.path.push(this.type);
            }
        }
    }
    outputSchemaMessage() {
        if (this.context) {
            let infoHandler = this.context.infoHandler;
            let warningHandler = this.context.warningHandler;
            let errorHandler = this.context.errorHandler;
            if (this.schemaCheckResult && this.schemaCheckResult.messages) {
                this.schemaCheckResult.messages.forEach((message) => {
                    switch (message.level) {
                        case 'Info':
                            if (infoHandler) {
                                infoHandler(`AdaptiveCard >> Schema >> ${this.type} >> ${message.message}`);
                            }
                            break;
                        case 'Warning':
                            if (warningHandler) {
                                warningHandler(`AdaptiveCard >> Schema >> ${this.type} >> ${message.message}`);
                            }
                            break;
                        case 'Error':
                            if (errorHandler) {
                                errorHandler(`AdaptiveCard >> Schema >> ${this.type} >> ${message.message}`);
                            }
                            break;
                        default:
                            break;
                    }
                });
            }
        }
    }
    shallowCheckSchema(json) {
        if (this.context && this.context.schemas) {
            if (this.type) {
                let schema = this.context.schemas.read(this.type);
                return SchemaValidator.shallowCheckElements(json, schema);
            }
            return new SchemaResult(false, new SchemaMessage('Error', 'Property type is required.'));
        }
        return new SchemaResult(true);
    }
    deepCheckSchema() {
        if (this.context && this.context.schemas) {
            if (this.type) {
                let schema = this.context.schemas.read(this.type);
                return SchemaValidator.deepCheckElement(this, schema);
            }
            return new SchemaResult(false, new SchemaMessage('Error', 'Property type is required.'));
        }
        return new SchemaResult(true);
    }
    get isSchemaCheckPassed() {
        return this.schemaCheckResult.isValid;
    }
    get children() {
        return [];
    }
}

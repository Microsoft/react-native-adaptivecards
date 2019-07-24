import { StyleSheet } from 'react-native';
import { HostContext } from '../Contexts/HostContext';

export class StyleManager {
    public static getSpacing(spacing: 'small' | 'default' | 'medium' | 'large' | 'extralarge' | 'padding' | 'none') {
        if (spacing === 'none') {
            return 0;
        }
        let config = HostContext.getInstance().getConfig();
        let spacingConfig = config.spacing[spacing];
        if (!spacingConfig) {
            return config.spacing.default;
        }
        return spacingConfig;
    }

    public static getFontSize(size: 'small' | 'default' | 'medium' | 'large' | 'extralarge') {
        let config = HostContext.getInstance().getConfig();
        let fontSize = config.fontSize[size];
        if (!fontSize) {
            return config.fontSize.default;
        }
        return fontSize;
    }

    public static getFontWeight(weight: 'lighter' | 'default' | 'bolder') {
        let config = HostContext.getInstance().getConfig();
        let fontWeight = config.fontWeight[weight];
        if (!fontWeight) {
            return config.fontWeight.default;
        }
        return fontWeight;
    }

    public static getTextAlign(align: 'left' | 'center' | 'right') {
        if (align === 'left' || align === 'center' || align === 'right') {
            return align;
        }
        return 'left';
    }

    public static getHorizontalAlign(align: 'left' | 'center' | 'right') {
        switch (align) {
            case 'left':
                return 'flex-start';
            case 'right':
                return 'flex-end';
            case 'center':
                return 'center';
            default:
                return 'center';
        }
    }

    public static getWrap(wrap: boolean) {
        if (wrap) {
            return 'wrap';
        }
        return 'nowrap';
    }

    public static getImageSize(size: 'small' | 'medium' | 'large' | 'auto' | 'stretch' | number) {
        let config = HostContext.getInstance().getConfig();
        if (size === undefined) {
            return 'auto';
        }
        if (size === 'small' || size === 'medium' || size === 'large') {
            return config.imageSize[size];
        }
        return size;
    }

    public static getColor(
        color: 'default' | 'dark' | 'light' | 'accent' | 'good' | 'warning' | 'attention',
        theme: 'default' | 'emphasis',
        isSubtle: boolean) {
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.container[theme];
        if (!themeConfig) {
            themeConfig = config.container.default;
        }
        let colorConfig = themeConfig.foreground[color];
        if (!colorConfig) {
            colorConfig = themeConfig.foreground.default;
        }
        if (isSubtle) {
            return colorConfig.subtle;
        } else {
            return colorConfig.default;
        }
    }

    public static getBackgroundColor(theme: 'default' | 'emphasis') {
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.container[theme];
        if (!themeConfig) {
            return config.container.default.background;
        }
        return themeConfig.background;
    }

    public static getFactTitleColor(theme: 'default' | 'emphasis') {
        let config = HostContext.getInstance().getConfig();
        let color = config.factSet.title.color;
        let isSubtle = config.factSet.title.isSubtle;
        return StyleManager.getColor(color, theme, isSubtle);
    }

    public static getFactValueColor(theme: 'default' | 'emphasis') {
        let config = HostContext.getInstance().getConfig();
        let color = config.factSet.value.color;
        let isSubtle = config.factSet.value.isSubtle;
        return StyleManager.getColor(color, theme, isSubtle);
    }

    public static getInputColor(theme: 'default' | 'emphasis') {
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.color;
    }

    public static getInputFocusColor(theme: 'default' | 'emphasis') {
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.focusColor;
    }

    public static getInputBackgroundColor(theme: 'default' | 'emphasis') {
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.backgroundColor;
    }

    public static getInputFocusBackgroundColor(theme: 'default' | 'emphasis') {
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.focusBackgroundColor;
    }

    public static getInputBorderColor(theme: 'default' | 'emphasis') {
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.borderColor;
    }

    public static getInputFocusBorderColor(theme: 'default' | 'emphasis') {
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.input[theme];
        if (!themeConfig) {
            themeConfig = config.input.default;
        }
        return themeConfig.focusBorderColor;
    }

    public static getCheckboxTitleColor(theme: 'default' | 'emphasis') {
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.checkbox[theme];
        if (!themeConfig) {
            themeConfig = config.checkbox.default;
        }
        return themeConfig.title.color;
    }

    public static getCheckboxBoxColor(theme: 'default' | 'emphasis', focused: boolean) {
        let config = HostContext.getInstance().getConfig();
        let themeConfig = config.checkbox[theme];
        if (!themeConfig) {
            themeConfig = config.checkbox.default;
        }
        if (focused) {
            return themeConfig.box.checked;
        } else {
            return themeConfig.box.unchecked;
        }
    }

    public static get inSetImageSize() {
        return HostContext.getInstance().getConfig().imageSet.imageSize;
    }

    public static get inSetImageMaxHeight() {
        return HostContext.getInstance().getConfig().imageSet.maxImageHeight;
    }

    public static get factSetSpacing() {
        return HostContext.getInstance().getConfig().factSet.margin;
    }

    public static get factTitleFontSize() {
        return StyleManager.getFontSize(HostContext.getInstance().getConfig().factSet.title.size);
    }

    public static get factTitleFontWeight() {
        return StyleManager.getFontWeight(HostContext.getInstance().getConfig().factSet.title.weight);
    }

    public static get factTitleWrap() {
        return StyleManager.getWrap(HostContext.getInstance().getConfig().factSet.title.wrap);
    }

    public static get factValueFontSize() {
        return StyleManager.getFontSize(HostContext.getInstance().getConfig().factSet.value.size);
    }

    public static get factValueFontWeight() {
        return StyleManager.getFontWeight(HostContext.getInstance().getConfig().factSet.value.weight);
    }

    public static get factValueWrap() {
        return StyleManager.getWrap(HostContext.getInstance().getConfig().factSet.value.wrap);
    }

    public static get fontFamily() {
        return HostContext.getInstance().getConfig().fontFamily;
    }

    public static get separatorThickness() {
        return HostContext.getInstance().getConfig().separator.thickness * StyleSheet.hairlineWidth;
    }

    public static get separatorColor() {
        return HostContext.getInstance().getConfig().separator.color;
    }

    public static get separatorSpacing() {
        return HostContext.getInstance().getConfig().separator.spacing;
    }

    public static get maxActions() {
        return HostContext.getInstance().getConfig().action.capacity;
    }

    public static get actionSetSpacing() {
        return StyleManager.getSpacing(HostContext.getInstance().getConfig().action.actionSetSpacing);
    }

    public static get actionSpacing() {
        return HostContext.getInstance().getConfig().action.actionSpacing;
    }

    public static get actionDirection() {
        return HostContext.getInstance().getConfig().action.direction;
    }

    public static get actionAlignment() {
        return HostContext.getInstance().getConfig().action.align;
    }

    public static get subCardSpacing() {
        return HostContext.getInstance().getConfig().action.showCard.margin;
    }

    public static get subCardTheme() {
        return HostContext.getInstance().getConfig().action.showCard.style;
    }
}

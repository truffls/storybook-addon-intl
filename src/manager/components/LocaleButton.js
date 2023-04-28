import { styled } from '@storybook/theming';

export const LocaleButton = styled.button(({ active, theme }) => {
    const background =
        theme.base === 'light' ? '#ffffff' : theme.boolean.background;
    const activeBackground =
        theme.base === 'light' ? '#f7f7f7' : theme.boolean.selectedBackground;

    return {
        height: '50px',
        width: '100px',
        padding: '5px',
        border: 0,
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomWidth: '1px',
        lineHeight: '30px',
        textAlign: 'center',
        textTransform: 'uppercase',
        transitionProperty: 'background',
        transitionDuration: '100ms',
        transitionTimingFunction: 'linear',
        borderColor: theme.color.border,
        color: active ? theme.color.defaultText : theme.textMutedColor,
        background: active ? activeBackground : background,
        fontWeight: active ? theme.typography.weight.bold : undefined,
        textDecoration: active ? 'underline' : undefined
    };
});

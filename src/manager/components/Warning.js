import { styled } from '@storybook/theming';

export const Warning = styled.div(({ theme }) => ({
    background: theme.background.warning,
    color: theme.color.darkest,
    padding: '10px 15px',
    lineHeight: '20px',
    boxShadow: `${theme.appBorderColor} 0 -1px 0 0 inset`
}));

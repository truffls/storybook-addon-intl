import { styled } from '@storybook/theming';

export const Loading = styled.div(({ theme }) => ({
    color: theme.color.darkest,
    padding: '10px 15px',
    lineHeight: '20px'
}));

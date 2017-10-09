export const defaultStyle = {
    height: '50px',
    width: '100px',
    padding: '5px',
    border: 0,
    borderRight: '1px solid #d3d3d3',
    borderBottom: '1px solid #d3d3d3',
    background: 'none',
    lineHeight: '30px',
    textAlign: 'center',
    textTransform: 'uppercase',
    transitionProperty: 'background',
    transitionDuration: '100ms',
    transitionTimingFunction: 'linear'
};

export const activeStyle = {
    background: '#f7f7f7',
    fontWeight: 'bold'
};

export default function (props) {
    return {
        ...defaultStyle,
        ...(props.active ? activeStyle : {})
    };
};


export function omit (obj, props) {
    return Object.keys(obj)
        .filter((p) => !~props.indexOf(p))
        .reduce((accu, p) => {
            accu[p] = obj[p];
            return accu;
        }, {});
}

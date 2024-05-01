import {PropsWithChildren, ReactElement} from 'react'

type Type1 = PropsWithChildren;
type Type2 = {then : ReactElement; else?: ReactElement };

type Props = {condition: boolean} & (Type1 | Type2);

const If = (props: Props) => {
    if ('children' in props) {
        const { condition, children } = props;
        return condition ? <>{children}</> : null;
    }
    if ('then' in props) {
        const {condition, then, else: otherwise } = props;
        return otherwise ? (condition ? then: otherwise): condition ? then : null;
    }

    return null;
}

export default If;
import React, { useEffect, useState } from "react";

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]

interface MediaQueryProps {
    orientation?: string;
    minResolution?: number | `${number}dppx`;
    maxResolution?: number | `${number}dppx`;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
}

type MediaQueryComponentProps = {
    children: React.ReactNode | ((matches: boolean) => React.ReactNode);
} & RequireAtLeastOne<MediaQueryProps>

interface MediaQueryHookProps {
    query: string;
}

function parseAndGlue(props: {}): string {
    const camelCaseToRegular = (str: string) => str.replace(/[A-Z]/g, (match, index) => (index !== 0 ? '-' : '') + match.toLowerCase())

    return Object.entries(props).map(([key, value]) => {
        switch (key) {
            case "minWidth":
            case "maxWidth":
            case "minHeight":
            case "maxHeight":
                return `(${camelCaseToRegular(key)}: ${value}px)`;
            case "minResolution":
            case "maxResolution":
                return typeof value === "number" ? `(${camelCaseToRegular(key)}: ${value}dppx)` : `(${camelCaseToRegular(key)}: ${value})`;
            case "orientation":
                return `(${key}: ${value})`;
        }
    }).join(" and ")
}

export const useMediaQuery = ({ query }: MediaQueryHookProps): boolean => {
    const [mql, setMql] = useState(window.matchMedia(query));
    function resize() {
        setMql(() => window.matchMedia(query))
    }
    useEffect(() => {
        mql.addEventListener('change', resize)
        return () => {
            mql.removeEventListener('change', resize)
        }
    }, [])
    return mql.matches
}

const MediaQuery = ({children, ...props}: MediaQueryComponentProps) => {
    const matches = useMediaQuery({ query: parseAndGlue(props) });

    return (typeof(children) === "function" ?
            <>{children(matches)}</>
            :
            matches ? <>{children}</> : null

    );
};


export default MediaQuery

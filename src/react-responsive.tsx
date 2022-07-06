import React, { FC, useEffect, useMemo, useState } from "react";


interface MediaQueryComponentProps {
    children?: React.ReactNode | ((matches: boolean) => React.ReactNode);
    orientation?: string;
    minResolution?: number | `${number}dppx`;
    maxResolution?: number | `${number}dppx`;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
}

interface MediaQueryHookProps {
    query: string;
}

function parseAndGlue(props: {}): string {
    function camelCaseToRegular(str: string): string {
        let newStr: string = "";

        for (let i = 0; i < str.length; ++i) {
            newStr +=
                str[i].toUpperCase() === str[i] ? "-" + str[i].toLowerCase() : str[i];
        }

        return newStr;
    }

    let str: string = "";

    for (let [key, value] of Object.entries(props)) {
        if (str != "") str += " and ";
        switch (key) {
            case "minWidth":
            case "maxWidth":
            case "minHeight":
            case "maxHeight":
                str += `(${camelCaseToRegular(key)}: ${value}px)`;
                break;
            case "minResolution":
            case "maxResolution":
                str +=
                    typeof value === "number"
                        ? `(${camelCaseToRegular(key)}: ${value}dppx)`
                        : `(${camelCaseToRegular(key)}: ${value})`;
                break;
            case "orientation":
                str += `(${key}: ${value})`;
                break;
        }
    }
    return str;
}

export const MediaQuery: FC<MediaQueryComponentProps> = ({
    children,
    ...props
}) => {

    const matches = useMediaQuery({ query: parseAndGlue(props) });

    return (matches
        ?
        <div>
            {typeof (children) == "function" ? children(matches) : children}
        </div>
        :
        null
    );
};

export const useMediaQuery = ({ query }: MediaQueryHookProps) => useMemo<boolean>(() => {
    return window.matchMedia(query).matches
},
    [window.innerHeight, window.innerWidth]);

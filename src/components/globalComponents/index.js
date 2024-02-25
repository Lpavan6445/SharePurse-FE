import React from "react";
import { Button } from "@material-ui/core";
import { InlineStyleFlexbox } from './InlineStyledCommonComponents';
import { CircularProgress } from '@material-ui/core';
import ConditionalRender from "./conditionalRender";

 function ButtonComponent ({
    children,
    type,
    isLoading=false,
    color = 'primary',
    ...extraButtonProps
}) {
    return (
        <Button
            type={type}
            variant="contained"
            color={color}
            {...extraButtonProps}
        >
            <InlineStyleFlexbox gap="1.5rem">
                <ConditionalRender shouldRender={isLoading}>
                    <CircularProgress color="inherit" size={'1rem'}/>
                </ConditionalRender>
                <div>{children}</div>
            </InlineStyleFlexbox>
        </Button>
    )
};

export default ButtonComponent;
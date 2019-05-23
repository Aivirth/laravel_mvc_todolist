import React from "react";
import Box from "@material-ui/core/Box";

export default function DashboardBox(props) {
    const { children } = props;
    return (
        <Box boxShadow={3} bgcolor="background.paper" m={1} p={2}>
            {children}
        </Box>
    );
}

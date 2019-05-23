import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    card: {
        minWidth: 275
    },
    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    },
    button: {
        margin: 8
    }
});

export default function ProjectCard(props) {
    const { title, description, id } = props;

    const classes = useStyles();

    const AdapterLink = React.forwardRef((props, ref) => (
        <Link innerRef={ref} {...props} />
    ));

    return (
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {title}
                    </Typography>

                    <Typography variant="body2" component="p">
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        component={AdapterLink}
                        to={`/projects/${id}`}
                        variant="outlined"
                        className={classes.button}
                    >
                        View
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}

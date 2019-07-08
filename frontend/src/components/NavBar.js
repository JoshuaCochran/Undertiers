import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
	const classes = useStyles();
	return(
		<div className={classes.root}>
			<AppBar position="sticky">
				<Toolbar>
					<Typography variant="h4" color="inherit" className={classes.title}>
						Undertiers
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	)
}
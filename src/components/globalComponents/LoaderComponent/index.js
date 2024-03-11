import React from "react";
import PropTypes from "prop-types";
import { CircularProgress, makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  outline: {
    strokeDasharray: "2.42777px, 242.77666px",
    strokeDashoffset: 0,
    // webkitAnimation: "anim 1.6s linear infinite",
    animation: "$anim 1.6s linear infinite",
  },

  "@-webkit-keyframes anim": {
    "12.5%": {
      strokeDasharray: "33.98873px, 242.77666px",
      strokeDashoffset: "-26.70543px",
    },

    "43.75%": {
      strokeDasharray: "84.97183px, 242.77666px",
      strokeDashoffset: "-84.97183px",
    },

    "100%": {
      strokeDasharray: "2.42777px, 242.77666px",
      strokeDashoffset: "-240.34889px",
    },
  },
  "@keyframes anim": {
    "12.5%": {
      strokeDasharray: "33.98873px, 242.77666px",
      strokeDashoffset: "-26.70543px",
    },

    "43.75%": {
      strokeDasharray: "84.97183px, 242.77666px",
      strokeDashoffset: "-84.97183px",
    },
    "100%": {
      strokeDasharray: "2.42777px, 242.77666px",
      strokeDashoffset: "-240.34889px",
    },
  },
}));
const LoaderComponent = ({ position="center" }) => {
	const classes = styles();
	return (
		<div
			style={{
			width: "100%",
			height: "100%",
			minHeight: 300,
			position: position,
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			}}
		>
			<svg
				style={{
					left: "50%",
					top: "50%",
					position: "absolute",
					transform: "translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0)",
				}}
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 187.3 93.7"
			height="300px"
			width="400px"
			>
			<path
				d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
				stroke-miterlimit="10"
				stroke-linejoin="round"
				stroke-linecap="round"
				stroke-width="4"
				fill="none"
				className={classes.outline}
				stroke="#4E4FEB"
			></path>
			<path
				d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
				stroke-miterlimit="10"
				stroke-linejoin="round"
				stroke-linecap="round"
				stroke-width="4"
				stroke="#4E4FEB"
				fill="none"
				opacity="0.05"
				id="outline-bg"
				
			></path>
			</svg>
		</div>
	)
};

LoaderComponent.propTypes = {
  position: PropTypes.string,
};

LoaderComponent.defaultProp = {
  position: "absolute",
};

export default LoaderComponent;

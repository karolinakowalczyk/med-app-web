const homeStyles = (theme) => ({
  section: {
    height: "93.4vh",
    position: "relative",
  },
  content: {
    height: "100%",
    zIndex: 100,
    position: "relative",
  },
  container: {
    height: "100%",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    height: "100%",
    width: "100%",
    position: "absolute",
    zIndex: 2,
  },
  heroImage: {
    height: "100%",
    width: "auto",
    zIndex: 1,
    position: "absolute",
    right: "0px",
  },
  mobileHeroImage: {
    height: "auto",
    width: "100%",
    zIndex: 1,
    position: "absolute",
  },
  filledBackground: {
    backgroundColor: theme.palette.secondary.light,
    height: "100%",
    width: "100%",
    zIndex: 0,
    position: "absolute",
  },
});

export default homeStyles;
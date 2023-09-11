import {Box} from "./FooterStyle";

const Footer = () => {
  return (
    <footer>
      <Box>  
      <p style={{ color: "white", 
                   textAlign: "center", 
                   marginTop: "-1px",
                   marginBottom:"-1px"
                    }}>
        Copyright © Red Sun Corporation 2023
      </p>
      </Box>  
    </footer>
  );
};

export default Footer;